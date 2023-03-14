"""
Process SQS message from event and property queue and populate monitoring database.

"""
import settings
from dashboard import app_logging
app_logging.init_logging(__name__, settings.process_queue_log_file, settings.log_level)

import boto3
import json
import dashboard
import dashboard.models.articles as articles
from dashboard.exceptions import ShortRetryException
import logging

LOG = logging.getLogger(__name__)

def get_queue():
    conn = boto3.resource('sqs',
                          settings.sqs_region,
                          aws_access_key_id=settings.aws_access_key_id,
                          aws_secret_access_key=settings.aws_secret_access_key)
    queue = conn.get_queue_by_name(QueueName=settings.event_monitor_queue)
    assert queue is not None, "failed to find %r in region %r" % (settings.event_monitor_queue, settings.sqs_region)
    return queue

def process_message(message):
    "`message` is a boto3.sqs.Message instance."
    try:
        message_payload = json.loads(message.body)
        if "TopicArn" in message_payload:
            message_payload = json.loads(message_payload.get("Message"))
        message_type = message_payload.get('message_type')

        if message_type == 'event':
            process_event_message(message_payload)
        elif message_type == 'property':
            process_property_message(message_payload)
        elif message_type is None:
            LOG.error('Missing message type: %s', message_payload)
        else:
            LOG.error('Unknown message type: %s', message_type)
        message.delete()
    except ShortRetryException as e:
        LOG.info('short retry: %s because of %s', message.message_id, e)
        message.change_visibility(VisibilityTimeout=10)
    except Exception:
        LOG.exception("Error processing message")


def process_event_message(message):
    "`message` is a dictionary, the deserialised JSON payload of an SQS `Message` resource instance."
    try:
        articles._store_event(message.get('version'), message.get('run'), message.get('event_type'),
                              message.get('timestamp'), message.get('status'), message.get('message'),
                              message.get('item_identifier'), message.get('message_id'))
    except Exception:
        LOG.exception("Error processing event message: %s", message)


def process_property_message(message):
    "`message` is a dictionary, the deserialised JSON payload of an SQS `Message` resource instance."
    try:
        articles._store_property(message.get('property_type'), message.get('name'), message.get('value'),
                                 message.get('item_identifier'), message.get('version'),
                                 message.get('message_id'))
    except ShortRetryException as e:
        LOG.info("Error processing property message: %s", message)
        raise ShortRetryException("Short retry: %s", e)
    except Exception:
        LOG.exception("Error processing property message: %s", message)

# ---

def main():
    LOG.info("Started")
    queue = get_queue()

    while True:
        message_list = queue.receive_messages(VisibilityTimeout=60, WaitTimeSeconds=20)
        if message_list is not None:
            for message in message_list:
                LOG.debug("Message received details: %s", message)
                process_message(message)
        else:
            LOG.debug("No message received")


if __name__ == "__main__":
    main()
