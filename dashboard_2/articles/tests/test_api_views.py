import pytest

from articles.models import Article, Event, Property


@pytest.mark.django_db
def test_can_get_current_articles(article, article_detail_response_data, client,
                                  events_for_09003, properties_v1, properties_v2):

	response = client.get('/api/current')
	assert response.status_code == 200


@pytest.mark.django_db
def test_can_find_article_in_uir_status(article, article_detail_response_data, client,
                                  events_for_09003, properties_v1, properties_v2):
	response = client.get('/api/current')
	assert response.status_code == 200
	assert len(response.data['uir']) == 1


@pytest.mark.django_db
def test_can_find_article_in_error_status(article, article_detail_response_data, client,
                                          events_for_09003, properties_v1, properties_v2):
	# create an 'error' based event
	Event.objects.create(version=2,
	                     run='ce3068ce-b248-4172-9b1e-ebb4f73d2400',
	                     type='Some bad things',
	                     timestamp='2018-01-08 14:14:49.619248',
	                     status='error',
	                     message='Some error with 09003',
	                     article_id=article.article_id)

	response = client.get('/api/current')
	assert response.status_code == 200
	assert len(response.data['error']) == 1


# TODO test_can_find_article_with_in_progress_status

# TODO test_can_find_article_in_scheduled_status


@pytest.mark.django_db
def test_only_get_current_articles_back(article, article_detail_response_data, client,
                                        events_for_09003, properties_v1, properties_v2):
	# init exsiting articles
	# create an already published article
	article_2 = Article.objects.create(article_identifier='01234')

	Property.objects.create(article_id=article_2.article_id,
	                        name='publication-status',
	                        text_value='hidden',
	                        property_type='text',
	                        version=2)

	# create a hidden article

	# make sure only the non published/hidden article details are returned
	pass


@pytest.mark.django_db
def test_can_get_article_detail(article,
                                article_detail_response_data,
                                client,
                                events_for_09003,
                                properties_v1,
                                properties_v2):
	response = client.get('/api/article/09003')
	assert response.status_code == 200
	assert response.data == article_detail_response_data

"""
Current Article fields:

{
  "_publication-data": "eyJ3b3JrZmxvd19uYW1lIj",
  "article-id": "31149",
  "article-type": "research-article",
  "authors": "Franziska Decker, David Oriola, Benjamin Dalton, Jan Brugues, Andrea Musacchio",
  "corresponding-authors": "Jan Brugues",
  "doi": "10.7554/eLife.31149",
  "event-status": "error",
  "event-timestamp": 1515719110,
  "event-type": "Verify Publish Response: journal",
  "id": "31149",
  "path": "content/7/e31149v1",
  "preview-link": "https://preview--journal.elifesciences.org/content/7/e31149v1",
  "publication-date": "2018-01-11",
  "publication-status": "publication issues",
  "run": 1,
  "run-id": "f7b47576-2ed7-41be-b931-a6c1a3f824a9",
  "status": "POA",
  "title": "Autocatalytic microtubule nucleation determines the size and mass of <italic>Xenopus laevis</italic> egg extract spindles",
  "version": 1
}

"""


"""
Article detail:

** "article-type": "research-article",

** "authors": "Anthony D Fouad, Shelly Teng, Julian R Mark",

** "corresponding-authors": "Christopher Fang-Yen",

** "doi": "10.7554/eLife.29913",

"preview-link": "https://preview--journal.elifesciences.org/content/7/e29913v1",

** "publication-date": "2018-01-16",

** "publication-status": "ready to publish",

** "status": "VOR",

** "title": "Distributed rhythm generators underlie <italic>Caenorhabditis elegans</italic> forward locomotion",

** "version-number": "1"
"""