import datetime
import json
import os
import time
from typing import Dict, List

import pytest
import pytz
from rest_framework.test import APIClient

from articles.models import (
    Article,
    Event,
    Message,
    Property,
)


@pytest.fixture
def json_data_path() -> str:
    return os.path.join(os.path.dirname(os.path.abspath(__file__)), 'json')


@pytest.fixture
def api_client() -> APIClient:
    return APIClient()


@pytest.fixture
@pytest.mark.django_db
def article() -> Article:
    return Article.objects.create(article_identifier='09003')


@pytest.fixture
@pytest.mark.django_db
def article_complete(article: Article, events_for_09003: List[Event],
                     properties_v1: List[Property],
                     properties_v2: List[Property]) -> Article:
    return article


@pytest.fixture
def article_detail_response_data(json_data_path: str) -> Dict:
    file_name = 'article_detail_response.json'

    with open(os.path.join(json_data_path, file_name), 'r') as json_file:
        json_data = json.load(json_file)

    return json_data


@pytest.fixture
def article_mutli_version_response_data(json_data_path: str) -> Dict:
    file_name = 'article_multi_version_response.json'

    with open(os.path.join(json_data_path, file_name), 'r') as json_file:
        json_data = json.load(json_file)

    return json_data


@pytest.fixture
@pytest.mark.django_db
def event_convert_jats_v1(article: Article, future_timestamp: datetime.datetime) -> Event:
    return Event.objects.create(version=1,
                                run='b6ef5d1f-23b3-4f4e-9ba3-7de24f885171',
                                type='Convert JATS',
                                # timestamp='2016-02-08 14:14:49.619248',
                                timestamp=future_timestamp,
                                status='start',
                                message='Starting conversion of article xml to EIF for 09003',
                                article_id=article.article_id)


@pytest.fixture
@pytest.mark.django_db
def event_with_error_status(article: Article, future_timestamp: datetime.datetime) -> Event:
    return Event.objects.create(version=1,
                                run='8e9e5c86-c592-4013-ba2b-16eb9a14c666',
                                type='Some bad things',
                                timestamp=future_timestamp,
                                status='error',
                                message='Some error with 09003',
                                article_id=article.article_id)


@pytest.fixture
def future_timestamp() -> datetime.datetime:
    return datetime.datetime.fromtimestamp(1517829752.0, tz=pytz.UTC)


@pytest.fixture
@pytest.mark.django_db
def message() -> Message:
    epoch_value = time.mktime(time.strptime('2016-03-23 12:15:22', '%Y-%m-%d %H:%M:%S'))
    timestamp = datetime.datetime.fromtimestamp(epoch_value, tz=pytz.UTC)
    return Message.objects.create(message_id='2a4ee336-288a-47e2-9d74-1b337642df57', timestamp=timestamp)


@pytest.fixture
@pytest.mark.django_db
def property_article_type_v1(article: Article) -> Property:
    return Property.objects.create(article_id=article.article_id,
                                   name='article-type',
                                   text_value='research-article',
                                   property_type='text',
                                   version=1)


@pytest.fixture
@pytest.mark.django_db
def property_authors_v1(article: Article) -> Property:
    return Property.objects.create(article_id=article.article_id,
                                   name='authors',
                                   text_value='Anthony D Fouad, Shelly Teng, Julian R Mark',
                                   property_type='text',
                                   version=1)


@pytest.fixture
@pytest.mark.django_db
def property_corresponding_authors_v1(article: Article) -> Property:
    return Property.objects.create(article_id=article.article_id,
                                   name='corresponding-authors',
                                   text_value='Christopher Fang-Yen',
                                   property_type='text',
                                   version=1)


@pytest.fixture
@pytest.mark.django_db
def property_doi_v1(article: Article) -> Property:
    return Property.objects.create(article_id=article.article_id,
                                   name='doi',
                                   text_value='10.7554/eLife.09003',
                                   property_type='text',
                                   version=1)


@pytest.fixture
@pytest.mark.django_db
def property_path_v1(article: Article) -> Property:
    return Property.objects.create(article_id=article.article_id,
                                   name='path',
                                   text_value='content/7/e33511v1',
                                   property_type='text',
                                   version=1)


@pytest.fixture
@pytest.mark.django_db
def property_path_v2(article: Article) -> Property:
    return Property.objects.create(article_id=article.article_id,
                                   name='path',
                                   text_value='content/7/e33511v1',
                                   property_type='text',
                                   version=2)


@pytest.fixture
@pytest.mark.django_db
def property_publication_date_v1(article: Article) -> Property:
    return Property.objects.create(article_id=article.article_id,
                                   name='publication-date',
                                   text_value='2018-01-16',
                                   property_type='text',
                                   version=1)


@pytest.fixture
@pytest.mark.django_db
def property_publication_status_v1(article: Article) -> Property:
    return Property.objects.create(article_id=article.article_id,
                                   name='publication-status',
                                   text_value='ready to publish',
                                   property_type='text',
                                   version=1)


@pytest.fixture
@pytest.mark.django_db
def property_status_v1(article: Article) -> Property:
    return Property.objects.create(article_id=article.article_id,
                                   name='status',
                                   text_value='VOR',
                                   property_type='text',
                                   version=1)


@pytest.fixture
@pytest.mark.django_db
def property_title_v1(article: Article) -> Property:
    return Property.objects.create(article_id=article.article_id,
                                   name='title',
                                   text_value='Distributed rhythm generators and Caenorhabditis',
                                   property_type='text',
                                   version=1)


@pytest.fixture
@pytest.mark.django_db
def properties_v1(property_article_type_v1: Property, property_authors_v1: Property,
                  property_corresponding_authors_v1: Property, property_doi_v1: Property,
                  property_publication_date_v1: Property, property_publication_status_v1: Property,
                  property_status_v1: Property, property_title_v1: Property) -> List[Property]:

    return [property_article_type_v1, property_authors_v1,
            property_corresponding_authors_v1, property_doi_v1,
            property_publication_date_v1, property_publication_status_v1,
            property_status_v1, property_title_v1]


@pytest.fixture
@pytest.mark.django_db
def property_article_type_v2(article: Article) -> Property:
    return Property.objects.create(article_id=article.article_id,
                                   name='article-type',
                                   text_value='research-article',
                                   property_type='text',
                                   version=2)


@pytest.fixture
@pytest.mark.django_db
def property_authors_v2(article: Article) -> Property:
    return Property.objects.create(article_id=article.article_id,
                                   name='authors',
                                   text_value='Anthony D Fouad, Shelly Teng, Julian R Mark',
                                   property_type='text',
                                   version=2)


@pytest.fixture
@pytest.mark.django_db
def property_corresponding_authors_v2(article: Article) -> Property:
    return Property.objects.create(article_id=article.article_id,
                                   name='corresponding-authors',
                                   text_value='Christopher Fang-Yen',
                                   property_type='text',
                                   version=2)


@pytest.fixture
@pytest.mark.django_db
def property_doi_v2(article: Article) -> Property:
    return Property.objects.create(article_id=article.article_id,
                                   name='doi',
                                   text_value='10.7554/eLife.09003',
                                   property_type='text',
                                   version=2)


@pytest.fixture
@pytest.mark.django_db
def property_publication_date_v2(article: Article) -> Property:
    return Property.objects.create(article_id=article.article_id,
                                   name='publication-date',
                                   text_value='2018-01-16',
                                   property_type='text',
                                   version=2)


@pytest.fixture
@pytest.mark.django_db
def property_publication_status_v2(article: Article) -> Property:
    return Property.objects.create(article_id=article.article_id,
                                   name='publication-status',
                                   text_value='ready to publish',
                                   property_type='text',
                                   version=2)


@pytest.fixture
@pytest.mark.django_db
def property_status_v2(article: Article) -> Property:
    return Property.objects.create(article_id=article.article_id,
                                   name='status',
                                   text_value='VOR',
                                   property_type='text',
                                   version=2)


@pytest.fixture
@pytest.mark.django_db
def property_title_v2(article: Article) -> Property:
    return Property.objects.create(article_id=article.article_id,
                                   name='title',
                                   text_value='Distributed rhythm generators and Caenorhabditis',
                                   property_type='text',
                                   version=2)


@pytest.fixture
@pytest.mark.django_db
def properties_v2(property_article_type_v2: Property, property_authors_v2: Property,
                  property_corresponding_authors_v2: Property, property_doi_v2: Property,
                  property_publication_date_v2: Property, property_publication_status_v2: Property,
                  property_status_v2: Property, property_title_v2: Property) -> List[Property]:

    return [property_article_type_v2, property_authors_v2,
            property_corresponding_authors_v2, property_doi_v2,
            property_publication_date_v2, property_publication_status_v2,
            property_status_v2, property_title_v2]


@pytest.fixture
def events_for_09003(article: Article) -> List[Event]:
    event_data = [
        {
            "event-message": "Finished Version Lookup for article 09003 version: 1",
            "event-status": "end",
            "event-timestamp": 1515150089.0,
            "event-type": "Version Lookup",
            "run-id": "8e9e5c86-c592-4013-ba2b-16eb9a14c666",
            "version": 1
        },
        {
            "event-message": "Finished expansion of article 09003 for version 1 "
                             "run 8e9e5c86-c592-4013-ba2b-16eb9a14c666 into foo",
            "event-status": "end",
            "event-timestamp": 1515150097.0,
            "event-type": "Expand Article",
            "run-id": "8e9e5c86-c592-4013-ba2b-16eb9a14c666",
            "version": 1
        },
        {
            "event-message": "Finished Version Lookup for article 09003 version: 1",
            "event-status": "end",
            "event-timestamp": 1515150754.0,
            "event-type": "Version Lookup",
            "run-id": "ce3068ce-b248-4172-9b1e-ebb4f73d2400",
            "version": 1
        },
        {
            "event-message": "Finished expansion of article 09003 for version 1 run "
                             "ce3068ce-b248-4172-9b1e-ebb4f73d2400 into 29913.1/ce3068ce-b248-4172-9b1e-ebb4f73d2400",
            "event-status": "end",
            "event-timestamp": 1515150762.0,
            "event-type": "Expand Article",
            "run-id": "ce3068ce-b248-4172-9b1e-ebb4f73d2400",
            "version": 1
        },
        {
            "event-message": "Finished Version Lookup for article 09003 version: 1",
            "event-status": "end",
            "event-timestamp": 1515150754.0,
            "event-type": "Version Lookup",
            "run-id": "ce3068ce-b248-4172-9b1e-ebb4f73d2400",
            "version": 2
        },
        {
            "event-message": "Finished expansion of article 09003 for version 1 run "
                             "ce3068ce-b248-4172-9b1e-ebb4f73d2400 into 29913.1/ce3068ce-b248-4172-9b1e-ebb4f73d2400",
            "event-status": "end",
            "event-timestamp": 1515150762.0,
            "event-type": "Expand Article",
            "run-id": "ce3068ce-b248-4172-9b1e-ebb4f73d2400",
            "version": 2
        }
    ]

    events = []
    for event in event_data:
        timestamp = datetime.datetime.fromtimestamp(event['event-timestamp'], tz=pytz.UTC)
        obj = Event.objects.create(version=event['version'],
                                   run=event['run-id'],
                                   type=event['event-type'],
                                   timestamp=timestamp,
                                   status=event['event-status'],
                                   message=event['event-message'],
                                   article_id=article.article_id)
        events.append(obj)
    return events


@pytest.fixture
def runs_event_data() -> Dict:
    return {
        "1": {
            "runs": {
                "1": {
                    "events": [
                        {
                            "event-message": "Finished Version Lookup for article 09003 version: 1",
                            "event-status": "end",
                            "event-timestamp": 1515150089,
                            "event-type": "Version Lookup"
                        },
                        {
                            "event-message": "Finished expansion of article 09003 for version 1 run "
                                             "8e9e5c86-c592-4013-ba2b-16eb9a14c666 into foo",
                            "event-status": "end",
                            "event-timestamp": 1515150097,
                            "event-type": "Expand Article"
                        }
                    ],
                    "first-event-timestamp": 1515150089,
                    "run-id": "8e9e5c86-c592-4013-ba2b-16eb9a14c666",
                    "run-number": "1",
                    "version-number": "1"
                },
                "2": {
                    "events": [
                        {
                            "event-message": "Finished Version Lookup for article 09003 version: 1",
                            "event-status": "end",
                            "event-timestamp": 1515150754,
                            "event-type": "Version Lookup"
                        },
                        {
                            "event-message": "Finished expansion of article 09003 for version 1 run "
                                             "ce3068ce-b248-4172-9b1e-ebb4f73d2400 into 29913.1/"
                                             "ce3068ce-b248-4172-9b1e-ebb4f73d2400",
                            "event-status": "end",
                            "event-timestamp": 1515150762,
                            "event-type": "Expand Article"
                        },
                    ],
                    "first-event-timestamp": 1515150754,
                    "run-id": "ce3068ce-b248-4172-9b1e-ebb4f73d2400",
                    "run-number": "2",
                    "version-number": "1"
                }
            }
        }
    }
