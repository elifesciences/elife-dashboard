from typing import Dict
from unittest.mock import MagicMock, patch

from django.test import Client
import pytest
from rest_framework.test import APIClient

from articles.models import Article, Event, Property


@pytest.mark.django_db
def test_can_get_current_articles(article_complete: Article,    client: Client):
	response = client.get('/api/current')
	assert response.status_code == 200


@pytest.mark.django_db
def test_can_find_article_in_uir_status(article_complete: Article, client: Client):
	response = client.get('/api/current')
	assert response.status_code == 200
	assert len(response.data['uir']) == 1


@pytest.mark.django_db
def test_can_find_article_in_error_status(article_complete: Article, client: Client):
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
def test_only_get_current_articles_back(article_complete: Article, client: Client):
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
def test_can_get_article_detail(article_complete: Article, article_detail_response_data: Dict,
                                client: Client, property_path_v1: Property,
                                property_path_v2: Property):
	response = client.get('/api/article/09003')
	assert response.status_code == 200
	assert response.data == article_detail_response_data


@pytest.mark.django_db
def test_can_get_publication_status_of_target_article(article_complete: Article, api_client: APIClient):
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
def test_can_get_publication_status_and_error_message(article_complete: Article, api_client: APIClient):
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
def test_publication_status_is_none_if_not_found(api_client: APIClient):
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
def test_can_get_publication_status_of_multiple_articles(article_complete: Article, api_client: APIClient):
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


@pytest.mark.django_db
@patch('articles.api.get_scheduled_statuses')
def test_can_get_scheduled_status(mock_scheduler: MagicMock, api_client: APIClient):
	mock_data = {"articles": [
		{"article-identifier": "09003",
		 "published": False,
		 "scheduled": None
		 }
	]}
	mock_scheduler.return_value = mock_data

	data = {'articles': [{'id': '09003'}]}

	response = api_client.post('/api/article_scheduled_status', data=data, format='json')
	assert response.status_code == 200
	assert response.data == mock_data


@pytest.mark.django_db
@patch('articles.api.schedule_publication')
def test_can_schedule_an_article(mock_scheduler: MagicMock, api_client: APIClient):
	mock_data = {"result": "success"}
	mock_scheduler.return_value = mock_data

	data = {
		"article": {
			"article-identifier": "09003",
			"scheduled": 1463151556
		}
	}

	response = api_client.post('/api/schedule_article_publication', data=data, format='json')
	assert response.status_code == 200
	assert response.data == mock_data
