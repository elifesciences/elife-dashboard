import pytest

from articles.models import Article, Event


@pytest.mark.django_db
def test_will_only_use_latest_instance_of_event_type_per_version(article):
	# create two events with the same type and version, but different status
	Event.objects.create(version=1,
	                     run='b6ef5d1f-23b3-4f4e-9ba3-7de24f885171',
	                     type='Version Lookup',
	                     timestamp='2016-02-07 14:14:49.619248',
	                     status='start',
	                     message='Started expansion of article',
	                     article_id=article.article_id)

	Event.objects.create(version=1,
	                     run='b6ef5d1f-23b3-4f4e-9ba3-7de24f885171',
	                     type='Version Lookup',
	                     timestamp='2016-02-07 14:16:49.619248',
	                     status='end',
	                     message='Finished expansion of article',
	                     article_id=article.article_id)

	# add version 2
	Event.objects.create(version=2,
	                     run='zzzf5d1f-23b3-4f4e-9ba3-7de24f885171',
	                     type='Version Lookup',
	                     timestamp='2016-02-07 14:14:49.619248',
	                     status='start',
	                     message='Started expansion of article',
	                     article_id=article.article_id)

	Event.objects.create(version=2,
	                     run='zzzf5d1f-23b3-4f4e-9ba3-7de24f885171',
	                     type='Version Lookup',
	                     timestamp='2016-02-07 14:16:49.619248',
	                     status='end',
	                     message='Finished expansion of article',
	                     article_id=article.article_id)

	runs = Article.versions.get_runs(article_id=article.article_identifier)
	assert runs == {
		"1": {
			"1": {
				"events": [
					{
						'event-message': 'Finished expansion of article',
						'event-status': 'end',
						'event-timestamp': 1454854609.0,
						'event-type': 'Version Lookup',
					}
				],
				"first-event-timestamp": 1454854609.0,  # should be 1454854489.0,
				"run-id": "b6ef5d1f-23b3-4f4e-9ba3-7de24f885171",
				"run-number": "1",
				"version-number": "1",
			},
		},
		"2": {
			"1": {
				"events": [
					{
						'event-message': 'Finished expansion of article',
						'event-status': 'end',
						'event-timestamp': 1454854609.0,
						'event-type': 'Version Lookup',
					}
				],
				"first-event-timestamp": 1454854609.0,  # should be 1454854489.0,
				"run-id": "zzzf5d1f-23b3-4f4e-9ba3-7de24f885171",
				"run-number": "1",
				"version-number": "2",
			},
		}
	}


@pytest.mark.django_db
def test_can_sort_events_into_runs(article):
	Event.objects.create(version=1,
	                     run='b6ef5d1f-23b3-4f4e-9ba3-7de24f885171',
	                     type='Convert JATS',
	                     timestamp='2016-02-08 14:14:49.619248',
	                     status='start',
	                     message='Starting conversion of article xml to EIF for 09003',
	                     article_id=article.article_id)

	Event.objects.create(version=1,
	                     run='b6ef5d1f-23b3-4f4e-9ba3-7de24f885171',
	                     type='Version Lookup',
	                     timestamp='2016-02-07 14:14:49.619248',
	                     status='start',
	                     message='Finished expansion of article',
	                     article_id=article.article_id)

	Event.objects.create(version=1,
	                     run='c6ef5d1f-23b3-4f4e-9ba3-7de24f885172',
	                     type='Convert JATS',
	                     timestamp='2016-02-13 14:14:49.619248',
	                     status='start',
	                     message='Starting conversion of article xml to EIF for 09003',
	                     article_id=article.article_id)

	Event.objects.create(version=1,
	                     run='c6ef5d1f-23b3-4f4e-9ba3-7de24f885172',
	                     type='Version Lookup',
	                     timestamp='2016-02-12 14:14:49.619248',
	                     status='start',
	                     message='Finished expansion of article',
	                     article_id=article.article_id)

	runs = Article.versions.get_runs(article_id=article.article_identifier)

	assert Event.objects.count() == 4
	assert runs == {
		"1": {
			"1": {
				"events": [
					{
						'event-message': 'Finished expansion of article',
						'event-status': 'start',
						'event-timestamp': 1454854489.0,
						'event-type': 'Version Lookup'
					 },
					{
						'event-message': 'Starting conversion of article xml to EIF for 09003',
						'event-status': 'start',
						'event-timestamp': 1454940889.0,
						'event-type': 'Convert JATS'
					}
				],
				"first-event-timestamp": 1454854489.0,
				"run-id": "b6ef5d1f-23b3-4f4e-9ba3-7de24f885171",
				"run-number": "1",
				"version-number": "1",
			},
			"2": {
				"events": [
					{
						'event-message': 'Finished expansion of article',
						'event-timestamp': 1455286489.0,
						'event-status': 'start',
						'event-type': 'Version Lookup'
					},
					{
						'event-message': 'Starting conversion of article xml to EIF for 09003',
						'event-timestamp': 1455372889.0,
						'event-status': 'start',						'event-type': 'Convert JATS'
					}
				],
				"first-event-timestamp": 1455286489.0,
				"run-id": "c6ef5d1f-23b3-4f4e-9ba3-7de24f885172",
				"run-number": "2",
				"version-number": "1",
			}
		}
	}


