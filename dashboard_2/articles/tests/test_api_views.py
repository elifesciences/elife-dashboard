import pytest

from articles.models import Article, Event, Property


@pytest.mark.django_db
def test_can_get_current_articles(article_complete, article_detail_response_data, client):
	response = client.get('/api/current')
	assert response.status_code == 200


@pytest.mark.django_db
def test_can_find_article_in_uir_status(article_complete, article_detail_response_data, client):
	response = client.get('/api/current')
	assert response.status_code == 200
	assert len(response.data['uir']) == 1


@pytest.mark.django_db
def test_can_find_article_in_error_status(article_complete, article_detail_response_data, client):
	Event.objects.create(version=2,
	                     run='ce3068ce-b248-4172-9b1e-ebb4f73d2400',
	                     type='Some bad things',
	                     timestamp='2018-01-08 14:14:49.619248',
	                     status='error',
	                     message='Some error with 09003',
	                     article_id=article_complete.article_id)

	response = client.get('/api/current')
	assert response.status_code == 200
	assert len(response.data['error']) == 1


# TODO test_can_find_article_with_in_progress_status

# TODO test_can_find_article_in_scheduled_status


@pytest.mark.skip
@pytest.mark.django_db
def test_only_get_current_articles_back(article_complete, article_detail_response_data, client):
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
def test_can_get_article_detail(article_complete, article_detail_response_data,
                                client, property_path_v1, property_path_v2):
	response = client.get('/api/article/09003')
	assert response.status_code == 200
	assert response.data == article_detail_response_data


@pytest.mark.django_db
def test_can_get_publication_status_of_target_article(article_complete, api_client):
	data = {'articles': [{'id': '09003', 'run': 1, 'version': 1}]}

	response = api_client.post('/api/article_publication_status', data=data, format='json')
	assert response.status_code == 200
	assert response.data == {'articles': [
		{
			"id": "09003",
			"message": "",
			"publication-status": "ready to publish",
			"run": 1,
			"version": 1
		}
	]}


@pytest.mark.django_db
def test_can_get_publication_status_and_error_message(article_complete, api_client):
	data = {'articles': [{'id': '09003', 'run': 1, 'version': 1}]}

	Event.objects.create(version=1,
	                     run='8e9e5c86-c592-4013-ba2b-16eb9a14c666',
	                     type='Some bad things',
	                     timestamp='2019-01-08 14:14:49.619248',
	                     status='error',
	                     message='Some error with 09003',
	                     article_id=article_complete.article_id)

	response = api_client.post('/api/article_publication_status', data=data, format='json')
	assert response.status_code == 200
	assert response.data == {'articles': [
		{
			"id": "09003",
			"message": "Some error with 09003",
			"publication-status": "error",
			"run": 1,
			"version": 1
		}
	]}


@pytest.mark.django_db
def test_publication_status_is_none_if_not_found(api_client):
	data = {'articles': [{'id': '99999', 'run': 1, 'version': 1}]}

	response = api_client.post('/api/article_publication_status', data=data, format='json')
	assert response.status_code == 200
	assert response.data == {'articles': [
		{
			"id": "99999",
			"message": "",
			"publication-status": None,
			"run": 1,
			"version": 1
		}
	]}


@pytest.mark.django_db
def test_can_get_publication_status_of_multiple_articles(article_complete, api_client):
	data = {
		'articles': [
			{'id': '09003', 'run': 1, 'version': 1},
			{'id': '99999', 'run': 1, 'version': 1}
		]
	}

	response = api_client.post('/api/article_publication_status', data=data, format='json')
	assert response.status_code == 200
	assert response.data == {'articles': [
		{
			"id": "09003",
			"message": "",
			"publication-status": "ready to publish",
			"run": 1,
			"version": 1
		},
		{
			"id": "99999",
			"message": "",
			"publication-status": None,
			"run": 1,
			"version": 1
		}
	]}
