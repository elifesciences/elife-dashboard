import boto3
from config_decider import config as settings
from botocore.exceptions import ClientError
import logging

LOG = logging.getLogger(__name__)

class QueueProvider:

    def get_queue(self, queue_name):
        sqs_conn = boto3.resource('sqs', region_name=settings.sqs_region)
        try:
            queue = sqs_conn.get_queue_by_name(QueueName=queue_name)
            return queue
        except ClientError as error:
            LOG.error("failed to fetch queue %r in region %r", queue_name, settings.sqs_region)
            return None
