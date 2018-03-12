from datetime import datetime
from typing import Dict, List
from unittest.mock import MagicMock, patch

from django.test import Client
import pytest
from rest_framework.test import APIClient

from articles.models import Article, Event, Property


@pytest.mark.django_db
@patch('articles.api.get_scheduled_statuses')
def test_can_get_current_articles(mock_scheduler: MagicMock,
                                  article_complete: Article, client: Client):
    response = client.get('/api/current')
    assert response.status_code == 200


@pytest.mark.django_db
@patch('articles.api.get_scheduled_statuses')
def test_can_find_article_in_uir_status(mock_scheduler: MagicMock,
                                        article_complete: Article, client: Client):
    response = client.get('/api/current')
    assert response.status_code == 200
    assert len(response.data['uir']) == 1


@pytest.mark.django_db
@patch('articles.api.get_scheduled_statuses')
def test_can_find_article_in_error_status(mock_scheduler: MagicMock,
                                          article_complete: Article, client: Client,
                                          future_timestamp: datetime):
    Event.objects.create(version=2,
                         run='ce3068ce-b248-4172-9b1e-ebb4f73d2400',
                         type='Some bad things',
                         timestamp=future_timestamp,
                         status='error',
                         message='Some error with 09003',
                         article_id=article_complete.article_id)

    response = client.get('/api/current')
    assert response.status_code == 200
    assert len(response.data['error']) == 1


@pytest.mark.django_db
@patch('articles.api.get_scheduled_statuses')
def test_can_find_article_with_in_progress_status(mock_scheduler: MagicMock,
                                                  article: Article,
                                                  client: Client,
                                                  events_for_09003: List[Event],
                                                  properties_v1: List[Property],
                                                  property_publication_status_v2: Property):
    property_publication_status_v2.text_value = 'publication in progress'
    property_publication_status_v2.save()

    response = client.get('/api/current')
    assert response.status_code == 200
    assert len(response.data['in-progress']) == 1


@pytest.mark.django_db
@patch('articles.api.get_scheduled_statuses')
def test_can_find_article_in_scheduled_status(mock_scheduler: MagicMock,
                                              article_complete: Article, client: Client):
    # create mock scheduled response with scheduled date for article
    mock_scheduler.return_value = {
        "articles": [
            {
                "scheduled": 1463151540,
                "article-identifier": "09003",
                "published": False
            }
        ]
    }

    response = client.get('/api/current')
    assert response.status_code == 200
    assert len(response.data['scheduled']) == 1
    assert response.data['scheduled'][0]['article-id'] == "09003"
    assert response.data['scheduled'][0]['scheduled-publication-date'] == 1463151540


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
def test_can_get_publication_status_and_error_message(article_complete: Article,
                                                      api_client: APIClient,
                                                      event_with_error_status: Event,
                                                      future_timestamp: datetime):
    data = {'articles': [{'id': '09003', 'run': 1, 'version': 1}]}
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
        {
            "article-identifier": "09003",
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


@pytest.mark.django_db
@patch('articles.api.scheduled_statuses_for_range')
def test_can_get_schedules_for_range(mock_scheduler: MagicMock,
                                     article_complete: Article, api_client: APIClient):
    mock_data = {
        "articles": [
            {
                "scheduled": 1463151556,
                "article-identifier": "09003",
                "published": False
            }
        ]
    }
    mock_scheduler.return_value = mock_data

    response = api_client.get('/api/article_schedule_for_range/from/1463151555/to/1463151559/')
    assert response.status_code == 200
    assert response.data == {
        'articles': [
            {
                'article-type': 'research-article',
                '_publication-data': '',
                'publication-date': '2018-01-16',
                'publication-status': 'ready to publish',
                'title': 'Distributed rhythm generators and Caenorhabditis',
                'run-id': 'ce3068ce-b248-4172-9b1e-ebb4f73d2400',
                'event-status': 'end',
                'event-type': 'Expand Article',
                'path': '',
                'article-id': '09003',
                'corresponding-authors': 'Christopher Fang-Yen',
                'event-timestamp': 1515150762.0,
                'doi': '10.7554/eLife.09003',
                'version': 2,
                'run': 1,
                'authors': 'Anthony D Fouad, Shelly Teng, Julian R Mark',
                'id': '09003',
                'status': 'VOR',
                'scheduled-publication-date': 1463151556,
                'preview-link': 'https://foo.test.org/'
            }
        ]
    }
