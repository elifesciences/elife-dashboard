import pytest
from articles.models import Article, Event, Property


@pytest.mark.django_db
def test_can_create_article(article):
	assert article.article_id == 1
	assert article.article_identifier == '09003'


@pytest.mark.django_db
def test_can_delete_article(article):
	article.delete()
	assert Article.objects.count() == 0


@pytest.mark.django_db
def test_can_get_article_detail():
	# TODO complete
	pass


@pytest.mark.skip
@pytest.mark.django_db
def test_can_get_runs_data(article, events_for_09003, runs_event_data):
	runs = Article.versions.get_runs(article_id=article.article_identifier)
	assert runs == {"1": {"runs": {}}, "2": {"runs": {}}}  # runs_event_data


@pytest.mark.skip
@pytest.mark.django_db
def test_can_get_all_version_data_for_an_article(article, properties_v1,
                                                 events_for_09003):
	data = Article.versions.all(article_id=article.article_identifier)
	assert data == {}


@pytest.mark.django_db
def test_can_get_version_data_for_multi_version_article(article,
                                                        events_for_09003,
                                                        properties_v1,
                                                        properties_v2,
                                                        property_path_v1, property_path_v2,
                                                        article_mutli_version_response_data):
	data = Article.versions.all(article_id=article.article_identifier)
	assert data == article_mutli_version_response_data


@pytest.mark.django_db
def test_will_not_add_property_if_version_value_is_zero(article):
	Property.objects.create(article_id=article.article_id,
	                        name='article-type',
	                        text_value='research-article',
	                        property_type='text',
	                        version=0)
	data = Article.versions.all(article_id=article.article_identifier)
	assert data == {}


@pytest.mark.django_db
def test_can_find_the_latest_version(article, events_for_09003,
                                     properties_v1, properties_v2):
	latest_version = Article.versions.latest(article_id=article.article_identifier)
	assert latest_version == 2


@pytest.mark.django_db
def test_can_find_the_latest_version_with_events_arg(article, events_for_09003,
                                     properties_v1, properties_v2):
	events = list(Event.objects.filter(article__article_identifier=article.article_identifier))
	latest_version = Article.versions.latest(events=events)
	assert latest_version == 2


@pytest.mark.django_db
def test_can_get_article_detail(article, events_for_09003,
                                properties_v1, properties_v2,
                                property_path_v1):
	details = Article.details.get(article.article_identifier, 1)
	assert details == {
		'article-id': '09003',
		'article-type': "research-article",
		'authors': "Anthony D Fouad, Shelly Teng, Julian R Mark",
		'corresponding-authors': "Christopher Fang-Yen",
		'doi': "10.7554/eLife.09003",
		'event-status': "end",
		'event-timestamp': 1515150762.0,
		'event-type': "Expand Article",
		'id': '09003',
		'path': 'content/7/e33511v1',
		'preview-link': "https://foo.test.org/content/7/e33511v1",
		'_publication-data': '',
		'publication-date': "2018-01-16",
		'publication-status': "ready to publish",
		'run-id': "ce3068ce-b248-4172-9b1e-ebb4f73d2400",
		'run': 2,
		'status': "VOR",
		'title': "Distributed rhythm generators and Caenorhabditis",
		'version': 1,
	}


@pytest.mark.django_db
def test_can_get_publication_status_for_article(article_complete):
	status, msg = Article.versions.get_publication_status(article_id=article_complete.article_identifier,
	                                                      version=1, run=1)
	assert status == 'ready to publish'
	assert msg == ''


@pytest.mark.django_db
def test_can_get_error_pub_status_and_message(article_complete):
	Event.objects.create(version=1,
	                     run='8e9e5c86-c592-4013-ba2b-16eb9a14c666',
	                     type='Some bad things',
	                     timestamp='2019-01-08 14:14:49.619248',
	                     status='error',
	                     message='Some error with 09003',
	                     article_id=article_complete.article_id)

	status, msg = Article.versions.get_publication_status(article_id=article_complete.article_identifier,
	                                                      version=1, run=1)
	assert status == 'error'
	assert msg == 'Some error with 09003'
