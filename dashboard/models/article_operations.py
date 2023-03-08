import settings
from boto.sqs.message import Message
import json
from provider.QueueProvider import QueueProvider
from .articles import get_article

def queue_article_publication(article_id, version, run):
    if version is None or run is None:
        return {
            'publication-status': 'error',
            'id': article_id,
            'version': str(version),
            'run': run
        }
    queue_provider = QueueProvider()
    out_queue = queue_provider.get_queue(settings.workflow_starter_queue)
    article = get_article(article_id)
    article_versions = article.get('versions')
    result = {}

    if isinstance(article_versions, dict):
        version_data = article_versions.get(int(version))
        if isinstance(version_data, dict):
            version_properties = version_data.get('properties')
            if isinstance(version_properties, dict):
                # TODO : get publication status and check still valid
                # also see http://jira.elifesciences.org:8080/browse/ELPP-613
                status = 'queued'
                status_message = 'article queued'

                publication_data = version_properties.get('_publication-data')

                # This string is a base64 encoded message which allows initiation of the PostPerfectPublciation
                # workflow.

                # This class now needs constructs a workflow starter message which initiates the ApprovePerfectArticle
                # workflow. That workflow needs data to give drupal to publish the version <version> of article
                # <article_id> and also requires the data in this encoded string to initiate PostPerfectPublication upon
                #  successful publication so pass it article_id, version and the base 64 encoded string via the starter
                # mechanism

                follow_on_data = {
                    'article_id': article_id,
                    'version': version,
                    'run': run,
                    'publication_data': publication_data.get('value')
                }

                message = {
                    'workflow_name': 'ApproveArticlePublication',
                    'workflow_data': follow_on_data
                }

                m = Message()
                m.set_body(json.dumps(message))
                out_queue.write(m)

                result = {
                    'publication-status': status,
                    'id': article_id,
                    'version': str(version),
                    'run': run

                }

    return result
