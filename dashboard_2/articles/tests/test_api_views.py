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
                                client, events_for_09003,
                                properties_v1, properties_v2,
                                property_path_v1, property_path_v2):
	response = client.get('/api/article/09003')
	assert response.status_code == 200
	assert response.data == article_detail_response_data


@pytest.mark.django_db
def test_will_return_404_if_article_does_not_exist(client):
	response = client.get('/api/article/9999')
	assert response.status_code == 404
	assert response.data == {'msg': 'article 9999 does not exist'}
