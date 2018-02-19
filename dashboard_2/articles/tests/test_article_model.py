from datetime import datetime
from typing import Dict, List

import pytest
from articles.models import Article, Event, Property


@pytest.mark.django_db
def test_can_create_article(article: Article):
    assert article.article_id == 1
    assert article.article_identifier == '09003'


@pytest.mark.django_db
def test_can_delete_article(article: Article):
    article.delete()
    assert Article.objects.count() == 0


@pytest.mark.skip
@pytest.mark.django_db
def test_can_get_runs_data(article: Article, events_for_09003: List[Event], runs_event_data: Dict):
    runs = Article.versions.get_runs(article_id=article.article_identifier)
    assert runs == {"1": {"runs": {}}, "2": {"runs": {}}}  # runs_event_data


@pytest.mark.skip
@pytest.mark.django_db
def test_can_get_all_version_data_for_an_article(article: Article, properties_v1: Property,
                                                 events_for_09003: List[Event]):
    data = Article.versions.all(article_id=article.article_identifier)
    assert data == {}


@pytest.mark.django_db
def test_can_get_version_data_for_multi_version_article(article: Article, events_for_09003: List[Event],
                                                        properties_v1: Property, properties_v2: Property,
                                                        property_path_v1: Property, property_path_v2: Property,
                                                        article_mutli_version_response_data: Dict):
    data = Article.versions.all(article_id=article.article_identifier)
    assert data == article_mutli_version_response_data


@pytest.mark.django_db
def test_will_not_add_property_to_data_if_version_value_is_0(article: Article):
    Property.objects.create(article_id=article.article_id,
                            name='article-type',
                            text_value='research-article',
                            property_type='text',
                            version=0)
    data = Article.versions.all(article_id=article.article_identifier)
    assert data == {}


@pytest.mark.django_db
def test_can_find_the_latest_version(article: Article, events_for_09003: List[Event],
                                     properties_v1: Property, properties_v2: Property):
    latest_version = Article.versions.latest(article_id=article.article_identifier)
    assert latest_version == 2


@pytest.mark.django_db
def test_can_find_the_latest_version_with_events_arg(article: Article, events_for_09003: List[Event],
                                                     properties_v1: Property, properties_v2: Property):
    events = list(Event.objects.filter(article__article_identifier=article.article_identifier))
    latest_version = Article.versions.latest(events=events)
    assert latest_version == 2


@pytest.mark.django_db
def test_can_get_article_detail(article: Article, events_for_09003: List[Event], properties_v1: Property,
                                properties_v2: Property, property_path_v1: Property):
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
def test_can_get_publication_status_for_article(article_complete: Article):
    status, msg = Article.versions.get_publication_status(article_id=article_complete.article_identifier,
                                                          version=1, run=1)
    assert status == 'ready to publish'
    assert msg == ''


@pytest.mark.django_db
def test_can_get_error_pub_status_and_message(article_complete: Article, event_with_error_status: Event,
                                              future_timestamp: datetime):
    status, msg = Article.versions.get_publication_status(article_id=article_complete.article_identifier,
                                                          version=1, run=1)
    assert status == 'error'
    assert msg == 'Some error with 09003'
