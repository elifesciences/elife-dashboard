message_id_example = u'f1392251-db64-4f6c-acb3-73b64aa79d9d'
timestamp_example = u'2016-03-23 12:15:22.62027'

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

request_post_schedule = FakeResponse(200,{u'articles': [
                                                            {u'scheduled': None, u'article_identifier': u'11407', u'published': False},
                                                            {u'scheduled': None, u'article_identifier': u'09003', u'published': False},
                                                            {u'scheduled': None, u'article_identifier': u'09672', u'published': False}
                                                        ]
                                    })
request_get_schedule_for_range = FakeResponse(200, {u'articles':
                                                        [
                                                            {
                                                                u'article-identifier': u'09003',
                                                                u'scheduled': 1464382800,
                                                                u'published': False
                                                            },
                                                            {
                                                                u'article-identifier': u'00000099999999',
                                                                u'scheduled': 1464451200,
                                                                u'published': False
                                                            }
                                                        ]
                                                    })

request_scheduled_status_200 = FakeResponse(200, {u'articles':
                                                        [
                                                            {
                                                                u'article-identifier': u'11407',
                                                                u'scheduled': 1464782520,
                                                                u'published': False
                                                            }
                                                        ]
                                                    })
request_scheduled_article_publication = FakeResponse(200, {'result': 'success'})
request_scheduled_status_500 = FakeResponse(500, None)

response_scheduler_for_range = {u'articles': [{u'article-identifier': u'09003', u'scheduled': 1464382800, u'published': False}, {u'article-identifier': u'00000099999999', u'scheduled': 1464451200, u'published': False}]}

scheduled_articles_to_return = open("dashboard/tests/json/scheduled_articles_to_return.json", "r").read()

class FakeQueueProvider:
    def get_queue(self, name):
        return FakeQueue()

class FakeQueue:
    def write(self, message):
        pass