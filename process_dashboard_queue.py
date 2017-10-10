"""
Process SQS message from event and property queue and populate monitoring database
"""
from config_decider import config as settings
import boto.sqs
import json
import dashboard
import dashboard.models.articles as articles
import logging
from dashboard.exceptions import ShortRetryException

logger = logging.getLogger(__name__)
fh = logging.FileHandler(settings.process_queue_log_file)
formatter = logging.Formatter(dashboard.LOG_FORMAT)
fh.setFormatter(formatter)
logger.addHandler(fh)


def main():
    logger.info("Started")
    queue = get_queue()

    while True:
        message = queue.read(visibility_timeout=60,
                             wait_time_seconds=20)
        if message is not None:
            logger.info("Message received")
            logger.debug("Message received details: %s", message)
            process_message(message)
        else:
            logger.debug("No message received")


def get_queue():
    conn = boto.sqs.connect_to_region(settings.sqs_region,
                                      aws_access_key_id=settings.aws_access_key_id,
                                      aws_secret_access_key=settings.aws_secret_access_key)
    queue = conn.get_queue(settings.event_monitor_queue)
    assert queue is not None, "failed to find %r in region %r" % (settings.event_monitor_queue, settings.sqs_region)
    return queue


def process_message(message):
    try:
        message_payload = json.loads(message.get_body())
        if "TopicArn" in message_payload:
            message_payload = json.loads(message_payload.get("Message"))
        message_type = message_payload.get('message_type')

        if message_type is not None:
            if message_type in dispatch:
                dispatch[message_type](message_payload)
            else:
                logger.error('Unknown message type %s', message_type)
        message.delete()
    except ShortRetryException as e:
        logging.info('short retry: %s because of %s', message.id, e)
        message.change_visibility(visibility_timeout=10)
    except Exception:
        logger.exception("Error processing message")


def process_event_message(message):
    try:
        articles._store_event(message.get('version'), message.get('run'), message.get('event_type'),
                              message.get('timestamp'), message.get('status'), message.get('message'),
                              message.get('item_identifier'), message.get('message_id'))
    except Exception:
        logger.exception("Error processing event message: %s", message)


def process_property_message(message):
    try:
        articles._store_property(message.get('property_type'), message.get('name'), message.get('value'),
                                 message.get('item_identifier'), message.get('version'),
                                 message.get('message_id'))
    except ShortRetryException as e:
        logging.info("Error processing property message: %s", message)
        raise ShortRetryException("Short retry: %s", e)
    except Exception:
        logger.exception("Error processing property message: %s", message)


dispatch = {'event': process_event_message, 'property': process_property_message}


if __name__ == "__main__":
    main()
