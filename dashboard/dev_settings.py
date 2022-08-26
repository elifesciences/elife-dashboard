# Dashboard setting
application_port = 5000
preview_base_url = 'https://elifesciences.org/' # URL for drupal site to preview content

# Article scheduler settings
article_scheduler_url = 'http://localhost:8000/schedule/v1/article_scheduled_status/'
article_schedule_publication_url = 'http://localhost:8000/schedule/v1/schedule_article_publication/'
article_schedule_range_url = 'http://localhost:8000/schedule/v1/article_schedule_for_range/from/<from>/to/<to>/'

# SQS settings
sqs_region = 'eu-west-1'
event_monitor_queue = 'CHANGEME-event-property-incoming-queue'
workflow_starter_queue = 'CHANGEME-workflow-starter-queue'
event_queue_pool_size = 5
event_queue_message_count = 5

# Logging
log_level = "DEBUG"
log_file = "dashboard.log"
process_queue_log_file = "process_queue.log"

# Database
database = ''
host = ''
port = 5432
user = ''
password = ''
