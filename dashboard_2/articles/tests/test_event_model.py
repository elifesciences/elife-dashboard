import pytest
from articles.models import Article, Event


@pytest.mark.django_db
def test_can_create_event(event_convert_jats_v1: Event):
	event = event_convert_jats_v1
	assert event.message == 'Starting conversion of article xml to EIF for 09003'
	assert event.run == 'b6ef5d1f-23b3-4f4e-9ba3-7de24f885171'
	assert event.status == 'start'
	assert event.timestamp == '2016-02-08 14:14:49.619248'
	assert event.type == 'Convert JATS'
	assert event.version == 1
	assert event.article_id == 1


@pytest.mark.django_db
def test_can_delete_event(event_convert_jats_v1: Event):
	event_convert_jats_v1.delete()
	assert Event.objects.count() == 0


@pytest.mark.django_db
def test_can_create_event_to_article_id_map(article: Article, events_for_09003: Event):
	# get articles ids you want to include in the event_map
	article_ids = [article.article_identifier]

	event_map = Event.utils.to_article_map(article_ids=article_ids)

	assert len(event_map[article.article_identifier]) == 6
	assert type(event_map[article.article_identifier][0]) == Event

