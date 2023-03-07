import boto3
from config_decider import config as settings

class QueueProvider:

    def get_queue(self, queue_name):
        sqs_conn = boto3.resource('sqs', region_name=settings.sqs_region)
        queue = sqs_conn.get_queue_by_name(queue_name)
        return queue

