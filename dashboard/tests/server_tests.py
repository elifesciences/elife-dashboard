import dashboard
import unittest
import test_database as db
import fixtures
import json
#from mock import Mock
from mock import patch
from fixtures import FakeQueueProvider

class ServerTestCase(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        db.test_database_setup()

    @classmethod
    def tearDownClass(cls):
        db.test_database_destroy()

    def setUp(self):
        dashboard.app.config['TESTING'] = True
        self.client = dashboard.app.test_client()
        db.run(db.create_tables_schema)
        pass

    def tearDown(self):
        pass

    def test_path_exists(self):
        expected_paths = [
            '/current',
            '/scheduled'
        ]
        for path in expected_paths:
            resp = self.client.get(path)
            self.assertEqual(resp.status_code, 200, 'failed testing path %s' % path)

    @patch('requests.post')
    def test_current_model(self, mock_requests_post):
        db.run(db.create_articles_properties_events)
        mock_requests_post.return_value = fixtures.request_post_schedule
        resp = self.client.get('/api/current')
        self.assertDictEqual(json.loads(resp.data), json.loads(fixtures.current_articles_example))

    @patch('requests.post')
    def test_article_detail(self, mock_requests_post):
        mock_requests_post.return_value = fixtures.request_post_schedule
        db.run(db.create_articles_properties_events)
        db.run(db.create_version_zero_articles)
        resp = self.client.get('/api/article/09003')
        self.assertEqual(json.loads(resp.data), json.loads(fixtures.article_detail_example))

    @patch('dashboard.models.article_operations.QueueProvider')
    def test_queue_article_publication(self, fake_queue_provider):
        fake_queue_provider.return_value = fixtures.FakeQueueProvider()
        db.run(db.create_complete_article_properties_events)
        input = {"articles": [{"id": "09003"}]}
        data_expected = {"articles": [{"id": "09003", "publication-status": "queued", "run": "b6ef5d1f-23b3-4f4e-9ba3-7de24f885171", "version": "3"}]}
        resp = self.client.post('/api/queue_article_publication', data=json.dumps(input), content_type='application/json')
        self.assertDictEqual(json.loads(resp.data), data_expected)

    def test_queue_article_publication_error(self):
        db.run(db.create_articles_properties_events)
        input = {"articles": [{"id": "09888888"}]}
        data_expected = {'articles': [{'publication-status': 'error', 'id': '09888888', 'run': None, 'version': 'None'}]}
        resp = self.client.post('/api/queue_article_publication', data=json.dumps(input), content_type='application/json')
        self.assertDictEqual(json.loads(resp.data), data_expected)

    #@app.route('/api/article_publication_status', methods=['POST'])

    @patch('requests.post')
    def test_scheduled_status_200(self, mock_requests_post):
        mock_requests_post.return_value = fixtures.request_scheduled_status_200
        example = {"articles":["11407"]} # most things happen on the scheduler side
        data_expected = {"articles": [{"article-identifier": "11407", "published": False, "scheduled": 1464782520}]}
        resp =  self.client.post('/api/article_scheduled_status', data=example)
        self.assertDictEqual(json.loads(resp.data), data_expected)

    # @patch('requests.post')
    # def test_scheduled_status_500(self, mock_requests_post):
    #     mock_requests_post.return_value = fixtures.request_scheduled_status_500
    #     example = {"articles":["11407"]} # most things happen on the scheduler side
    #     data_expected = {"articles": [{"article-identifier": "11407", "published": False, "scheduled": 1464782520}]}
    #     resp =  self.client.post('/api/article_scheduled_status', data=example)
    #     self.assertDictEqual(json.loads(resp.data), data_expected)

    @patch('requests.post')
    def test_schedule_article_publication(self, mock_requests_post):
        mock_requests_post.return_value = fixtures.request_scheduled_article_publication
        input = '{"articles":{"article-identifier":"03430","scheduled":"1463151540"}}'
        resp = self.client.post('/api/schedule_article_publication', data=input)
        self.assertDictEqual(json.loads(resp.data), {'result': 'success'})

    @patch('requests.post')
    def test_schedule_article_publication_error(self, mock_requests_post):
        mock_requests_post.return_value = fixtures.request_scheduled_status_500
        input = '{"articles":{"article-identifier":"03430","scheduled":"1463151540"}}'
        resp = self.client.post('/api/schedule_article_publication', data=input)
        self.assertDictEqual(json.loads(resp.data), {'message': 'Error in scheduling service', 'detail': 'Status code from scheduler was 500'})

    @patch('requests.get')
    def test_article_scheduler_for_range(self, mock_requests_get):
        mock_requests_get.return_value = fixtures.request_get_schedule_for_range
        db.run(db.create_complete_article_properties_events)
        path = "/api/article_schedule_for_range/from/1464217200/to/1495753200/"
        resp = self.client.get(path)
        self.assertEqual(resp.status_code, 200, 'failed testing path %s' % path)
        articles_response = json.loads(resp.data).get("articles")
        expected_articles = json.loads(fixtures.scheduled_articles_to_return).get("articles")
        articles_response.sort()
        expected_articles.sort()

        advance_article = articles_response[0]
        normal_article = articles_response[1]

        advance_article_expected = expected_articles[0]
        normal_article_expected = expected_articles[1]

        for key in advance_article:
            self.assertEqual(advance_article[key], advance_article_expected[key])

        for key in normal_article:
            self.assertEqual(normal_article[key], normal_article_expected[key])
