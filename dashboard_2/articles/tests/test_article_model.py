import pytest
from articles.models import Article, Property


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
def test_can_check_if_article_has_certain_version(article, property_authors_v1):
	assert Article.versions.has_version(article.article_identifier, 1)


@pytest.mark.django_db
def test_can_find_the_latest_version(article, events_for_09003,
                                     properties_v1, properties_v2):
	latest_version = Article.versions.latest(article_id=article.article_identifier)
	assert latest_version == 2


@pytest.mark.django_db
def test_can_get_article_detail(article, events_for_09003,
                                properties_v1, properties_v2,):
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
		'preview-link': "",
		'publication-date': "2018-01-16",
		'publication-status': "ready to publish",
		'run-id': "ce3068ce-b248-4172-9b1e-ebb4f73d2400",
		'run': 2,
		'status': "VOR",
		'title': "Distributed rhythm generators and Caenorhabditis",
		'version': 1,
	}


"""
Current Article fields:

{
  "_publication-data": "eyJ3b3JrZmxvd19uYW1lIj",
  "path": "content/7/e31149v1",
  ** "preview-link": "https://preview--journal.elifesciences.org/content/7/e31149v1",
  "publication-status": "publication issues",
}

"""