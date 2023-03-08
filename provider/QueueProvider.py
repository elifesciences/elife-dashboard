import boto
import settings

class QueueProvider:

    def get_queue(self, queue_name):
        sqs_conn = boto.sqs.connect_to_region(settings.sqs_region)
        queue = sqs_conn.get_queue(queue_name)
        return queue

