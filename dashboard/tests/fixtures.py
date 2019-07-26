message_id_example = 'f1392251-db64-4f6c-acb3-73b64aa79d9d'
timestamp_example = '2016-03-23 12:15:22.62027'

current_articles_example = open("dashboard/tests/json/current_articles_example.json", "r").read()
article_detail_example = open("dashboard/tests/json/article_detail_example.json", "r").read()

article_ids_example = ['11407', '09003', '09672']

current_schedule_empty = {}

class FakeResponse:
    def __init__(self, status_code, response_json):
        self.status_code = status_code
        self.response_json = response_json

    def json(self):
        return self.response_json

request_post_schedule = FakeResponse(200,{'articles': [
                                                            {'scheduled': None, 'article_identifier': '11407', 'published': False},
                                                            {'scheduled': None, 'article_identifier': '09003', 'published': False},
                                                            {'scheduled': None, 'article_identifier': '09672', 'published': False}
                                                        ]
                                    })
request_get_schedule_for_range = FakeResponse(200, {'articles':
                                                        [
                                                            {
                                                                'article-identifier': '09003',
                                                                'scheduled': 1464382800,
                                                                'published': False
                                                            },
                                                            {
                                                                'article-identifier': '00000099999999',
                                                                'scheduled': 1464451200,
                                                                'published': False
                                                            }
                                                        ]
                                                    })

request_scheduled_status_200 = FakeResponse(200, {'articles':
                                                        [
                                                            {
                                                                'article-identifier': '11407',
                                                                'scheduled': 1464782520,
                                                                'published': False
                                                            }
                                                        ]
                                                    })
request_scheduled_article_publication = FakeResponse(200, {'result': 'success'})
request_scheduled_status_500 = FakeResponse(500, None)

response_scheduler_for_range = {'articles': [{'article-identifier': '09003', 'scheduled': 1464382800, 'published': False}, {'article-identifier': '00000099999999', 'scheduled': 1464451200, 'published': False}]}

scheduled_articles_to_return = open("dashboard/tests/json/scheduled_articles_to_return.json", "r").read()

class FakeQueueProvider:
    def get_queue(self, name):
        return FakeQueue()

class FakeQueue:
    def write(self, message):
        pass