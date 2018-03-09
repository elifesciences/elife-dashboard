import logging
import time
from typing import (
    Dict, List, Set, Tuple
)

from django.db import models
from django.conf import settings
from django.db.models import Max, Q
from django.db.models import ObjectDoesNotExist


LOGGER = logging.getLogger(__name__)


class ArticleDetailManager(models.Manager):

    def get_details_for_articles(self, article_ids: List[str]) -> Dict:
        """Get detail data for each target article."""

        current_articles = {}
        event_map = Event.utils.to_article_map(article_ids=article_ids)

        for article_id in article_ids:
            events = event_map.get(article_id, None)
            latest_version = Article.versions.latest(article_id, events=events)
            current_articles[article_id] = self.get(article_id, latest_version, events=events)

        return current_articles

    def get(self, article_id: str, version: int, events: List['Event'] = None) -> Dict:
        """Get detail information for a given article version.

        example return value:

        {
            'article-id': '09003',
            'title': 'Distributed rhythm generators and Caenorhabditis',
            'status': 'VOR',
            '_publication-data': '',
            'event-type': 'Expand Article',
            'id': '09003',
            'article-type': 'research-article',
            'authors': 'Anthony D Fouad, Shelly Teng, Julian R Mark',
            'corresponding-authors': 'Christopher Fang-Yen',
            'version': 2,
            'preview-link': 'https://foo.test.org/',
            'event-timestamp': 1515150762.0,
            'run': 1,
            'path': '',
            'run-id': 'ce3068ce-b248-4172-9b1e-ebb4f73d2400',
            'doi': '10.7554/eLife.09003',
            'publication-date': '2018-01-16',
            'publication-status': 'ready to publish',
            'event-status': 'end'
        }
        """

        details = {}

        # get properties for that version
        properties = list(Property.objects.filter(article__article_identifier=article_id, version=version))

        # dynamically add properties to data
        for prop in properties:
            details[prop.name] = prop.__dict__['{}_value'.format(prop.property_type)]

        # find latest run for target version
        latest_runs = self.model.versions.get_runs(article_id, events=events).get(str(version))
        latest_run = latest_runs[max(latest_runs.keys())]

        # then find the latest event and add data from latest run
        latest_event = latest_run.get('events')[-1]
        preview_link_data = Property.find.preview_link(properties=properties)

        # add latest run properties
        details['run-id'] = latest_run.get('run-id')
        details['run'] = int(latest_run.get('run-number'))
        details['_publication-data'] = Property.find.publication_data(properties=properties)

        # add latest event properties
        details['event-status'] = latest_event.get('event-status')
        details['event-timestamp'] = latest_event.get('event-timestamp')
        details['event-type'] = latest_event.get('event-type')

        # add last few local base properties
        details['path'] = preview_link_data.get('path', '')
        details['preview-link'] = preview_link_data.get('preview_link', '')
        details['article-id'] = article_id
        details['id'] = article_id
        details['version'] = version

        return details


class ArticleVersionManager(models.Manager):

    ERROR_STATUS = 'error'
    PUBLISHED_STATUS = 'published'

    def get_publication_status(self, article_id: str, version: int, run: int) -> Tuple[str, str]:
        """Return publication status string target version. Run value is used if
        publication status has a value of ERROR_STATUS.
        """
        publication_status = ''
        message = ''  # will always be empty unless publication_status == ERROR_STATUS

        article_versions = self.model.versions.all(article_id=article_id)

        # grab data for only the required version
        target_version = article_versions.get(str(version)) or {}
        publication_status = target_version.get('details', {}).get('publication-status')

        try:
            if publication_status != self.PUBLISHED_STATUS:
                # if not published, check the status of the last event in the run
                last_event = target_version.get('runs', {}).get(str(version), {}).get('events', [])[-1] or {}

                if last_event['event-status'] == self.ERROR_STATUS:
                    publication_status = last_event['event-status']
                    message = last_event['event-message']
        except IndexError:
            LOGGER.exception('Unable to process runs whilst obtaining publication status')

        return publication_status, message

    def get_runs(self, article_id: str = None, events: List['Event'] = None) -> Dict:
        """Each article has versions, each version has its own run(s),
        each run consists of `Event`s, each run should only contain the
        most recent `Event` of its `type`.

        e.g. no run should contain x2 `Event`s of type 'Version Lookup'

        example return value:

        example return value:

        {
            '1': {
                '1': {
                    'version-number': '1',
                    'run-id': '8e9e5c86-c592-4013-ba2b-16eb9a14c666',
                    'first-event-timestamp': 1515150089.0,
                    'events': [
                        {
                            'event-timestamp': 1515150089.0,
                            'event-message': 'Finished Version Lookup for article 09003 version: 1',
                            'event-type': 'Version Lookup',
                            'event-status': 'end'
                        },
                        {
                            'event-timestamp': 1515150097.0,
                            'event-message': 'Finished expansion of article 09003 for version 1 run 8e9e5...',
                            'event-type': 'Expand Article',
                            'event-status': 'end'
                        }
                    ],
                    'run-number': '1'
                },
                '2': {
                    'version-number': '1',
                    'run-id': 'ce3068ce-b248-4172-9b1e-ebb4f73d2400',
                    'first-event-timestamp': 1515150754.0,
                    'events': [
                        {
                            'event-timestamp': 1515150754.0,
                            'event-message': 'Finished Version Lookup for article 09003 version: 1',
                            'event-type': 'Version Lookup',
                            'event-status': 'end'
                        },
                        {
                            'event-timestamp': 1515150762.0,
                            'event-message': 'Finished expansion of article 09003 for version 1 run ce3068...',
                            'event-type': 'Expand Article',
                            'event-status': 'end'
                        }
                    ],
                    'run-number': '2'
                }
            },
            '2': {
                '1': {
                    'version-number': '2',
                    'run-id': 'ce3068ce-b248-4172-9b1e-ebb4f73d2400',
                    'first-event-timestamp': 1515150754.0,
                    'events': [
                        {
                            'event-timestamp': 1515150754.0,
                            'event-message': 'Finished Version Lookup for article 09003 version: 1',
                            'event-type': 'Version Lookup',
                            'event-status': 'end'
                        },
                        {
                            'event-timestamp': 1515150762.0,
                            'event-message': 'Finished expansion of article 09003 for version 1 run ce3068ce-b24...',
                            'event-type': 'Expand Article',
                            'event-status': 'end'
                        }
                    ],
                    'run-number': '1'
                }
            }
        }
        """
        events_by_type = {}
        runs = {}

        if not events:
            events = Event.objects.filter(article__article_identifier=article_id)

        for event in events:
            event_version = str(event.version)

            # Setup runs dict --------------------------------
            if event_version not in runs:
                runs[event_version] = {'runs': {}}

            if event.run not in runs[event_version]['runs']:
                runs[event_version]['runs'][event.run] = []
            # -----------------------------------------------

            # Setup event_by_type dict ----------------------
            # set default dict if not present
            if event_version not in events_by_type:
                events_by_type[event_version] = {}

            # set default dict if not present
            if event.run not in events_by_type[event_version]:
                events_by_type[event_version][event.run] = {}
            # -----------------------------------------------

            # make sure only the latest event is processed here
            if events_by_type[event_version][event.run].get(event.type, None):
                if event.timestamp > events_by_type[event_version][event.run][event.type].timestamp:
                    # if newer, replace the existing event for that type e.g. 'Version Lookup'
                    events_by_type[event_version][event.run][event.type] = event
            else:
                events_by_type[event_version][event.run][event.type] = event

        # add latest events to runs
        for version, temp_runs in events_by_type.items():
            for run, temp_events in temp_runs.items():
                for event_name, event in temp_events.items():
                    runs[version]['runs'][run].append(event)

        sorted_runs = self.sort_runs(runs)

        return sorted_runs

    @staticmethod
    def latest(article_id: str = None, events: List['Event'] = None) -> int:
        """Finds the latest article version from its stored Events."""

        if events:
            latest = max(events, key=lambda e: e.version)
            return latest.version
        elif article_id:
            result = Event.objects.filter(article__article_identifier=article_id).aggregate(Max('version'))
            return result.get('version__max', 0)

        return 0

    @staticmethod
    def sort_events(events: List['Event']) -> List[Dict]:
        """Returns a sorted representation of `Event` objects"""

        event_data = []

        for event in events:
            event_data.append({
                "event-message": event.message,
                "event-status": event.status,
                "event-timestamp": time.mktime(event.timestamp.timetuple()),
                "event-type": event.type
            })

        sorted_events = sorted(event_data, key=lambda x: x.get('event-timestamp'))

        return sorted_events

    def sort_runs(self, runs: Dict) -> Dict:
        """
        example input: {
            '1': {
                'runs': {
                    'ce3068ce-b248-4172-9b1e-ebb4f73d2400': [
                        <Event: ID: 3, Article: ID: 1, 09003>,
                        <Event: ID: 4, Article: ID: 1, 09003>
                    ],
                    '8e9e5c86-c592-4013-ba2b-16eb9a14c666': [
                        <Event: ID: 1, Article: ID: 1, 09003>,
                        <Event: ID: 2, Article: ID: 1, 09003>
                    ]
                }
            },
            '2': {
                'runs': {
                    'ce3068ce-b248-4172-9b1e-ebb4f73d2400': [
                        <Event: ID: 5, Article: ID: 1, 09003>,
                        <Event: ID: 6, Article: ID: 1, 09003>
                    ]
                }
            }
        }

        example return value:

        {
            '1': {
                '1': {
                    'version-number': '1',
                    'run-id': '8e9e5c86-c592-4013-ba2b-16eb9a14c666',
                    'first-event-timestamp': 1515150089.0,
                    'events': [
                        {
                            'event-timestamp': 1515150089.0,
                            'event-message': 'Finished Version Lookup for article 09003 version: 1',
                            'event-type': 'Version Lookup',
                            'event-status': 'end'
                        },
                        {
                            'event-timestamp': 1515150097.0,
                            'event-message': 'Finished expansion of article 09003 for version 1 run 8e9e5...',
                            'event-type': 'Expand Article',
                            'event-status': 'end'
                        }
                    ],
                    'run-number': '1'
                },
                '2': {
                    'version-number': '1',
                    'run-id': 'ce3068ce-b248-4172-9b1e-ebb4f73d2400',
                    'first-event-timestamp': 1515150754.0,
                    'events': [
                        {
                            'event-timestamp': 1515150754.0,
                            'event-message': 'Finished Version Lookup for article 09003 version: 1',
                            'event-type': 'Version Lookup',
                            'event-status': 'end'
                        },
                        {
                            'event-timestamp': 1515150762.0,
                            'event-message': 'Finished expansion of article 09003 for version 1 run ce3068...',
                            'event-type': 'Expand Article',
                            'event-status': 'end'
                        }
                    ],
                    'run-number': '2'
                }
            },
            '2': {
                '1': {
                    'version-number': '2',
                    'run-id': 'ce3068ce-b248-4172-9b1e-ebb4f73d2400',
                    'first-event-timestamp': 1515150754.0,
                    'events': [
                        {
                            'event-timestamp': 1515150754.0,
                            'event-message': 'Finished Version Lookup for article 09003 version: 1',
                            'event-type': 'Version Lookup',
                            'event-status': 'end'
                        },
                        {
                            'event-timestamp': 1515150762.0,
                            'event-message': 'Finished expansion of article 09003 for version 1 run ce3068ce-b24...',
                            'event-type': 'Expand Article',
                            'event-status': 'end'
                        }
                    ],
                    'run-number': '1'
                }
            }
        }
        """
        sorted_runs = {}

        for version in runs:
            runs_by_first_event = {}
            sorted_runs[version] = {}

            for run_id, events in runs[version]['runs'].items():
                timetamps = [time.mktime(event.timestamp.timetuple()) for event in events]
                runs_by_first_event[run_id] = {
                    "events": self.sort_events(events),
                    "first-event-timestamp": sorted(timetamps)[0],
                    "run-id": run_id,
                    "run-number": '',
                    "version-number": version
                }

            run_num = 1
            run_values = [run for run in runs_by_first_event.values()]

            for run in sorted(run_values, key=lambda x: x.get('first-event-timestamp')):
                sorted_runs[version][str(run_num)] = run
                sorted_runs[version][str(run_num)]['run-number'] = str(run_num)
                run_num += 1

        return sorted_runs

    def all(self, article_id: str) -> Dict:
        """Return detailed article data by versions and runs.

        example return value:

        {
          "1": {
            "details": {
              "article-type": "research-article",
              "authors": "Anthony D Fouad, Shelly Teng, Julian R Mark",
              "corresponding-authors": "Christopher Fang-Yen",
              "doi": "10.7554/eLife.29913",
              "preview-link": "https://preview--journal.elifesciences.org/content/7/e29913v1",
              "publication-date": "2018-01-16",
              "publication-status": "ready to publish",
              "status": "VOR",
              "title": "Distributed rhythm generators underlie <italic>Caenorhabditis ...",
              "version-number": "1"
            },
            "runs": {
              "1": {
                "events": [
                  {
                    "event-message": "Finished Version Lookup for article 29913 version: 1",
                    "event-status": "end",
                    "event-timestamp": 1515150089,
                    "event-type": "Version Lookup"
                  },
                  {
                    "event-message": "Finished expansion of article 29913 for version 1 run 8e9e5c86-c5ba2b-1...",
                    "event-status": "end",
                    "event-timestamp": 1515150097,
                    "event-type": "Expand Article"
                  },
                  {
                    "event-message": "Error in send of article properties to dashboard for article ...",
                    "event-status": "error",
                    "event-timestamp": 1515168085,
                    "event-type": "Send dashboard properties"
                  }
                ],
                "first-event-timestamp": 1515150089,
                "run-id": "8e9e5c86-c592-4013-ba2b-16eb9a14c666",
                "run-number": "1",
                "version-number": "1"
              }
            }
          }
        }
        """

        properties = []
        versions = {}

        try:
            properties = self.model.objects.get(article_identifier=article_id).properties.all()
        except ObjectDoesNotExist as err:
            LOGGER.exception(err)

        for prop in properties:
            # check for prop.version == 0 (can possibily be of `name` 'article-id')
            if prop.version > 0:
                version = str(prop.version)
                if version not in versions:
                    versions[version] = {
                        'details': {
                            'preview-link': Property.find.preview_link(properties=properties)['preview_link'],
                            'version-number': version
                        },
                        'runs': {}
                    }

                # process details
                versions[version]['details'][prop.name] = prop.__dict__['{}_value'.format(prop.property_type)]

        # process runs for each version
        sorted_runs = Article.versions.get_runs(article_id=article_id)

        for version in versions:
            try:
                versions[version]['runs'] = sorted_runs[version]
            except KeyError:
                pass

        return versions


class PropertyFinderManager(models.Manager):

    PREVIEW_BASE_URL = settings.PREVIEW_BASE_URL or ''
    PUBLICATION_STATUS = 'publication-status'
    HIDDEN_STATUSES = ('hidden', 'published')

    Q_FIND_PUB_STATUS = Q(name__exact=PUBLICATION_STATUS)
    Q_FIND_HIDDEN = Q(text_value__exact='hidden')
    Q_FIND_PUBLISHED = Q(text_value__exact='published')
    Q_FIND_NULL = Q(text_value__isnull=True)

    def article_has_version(self, article_id: str, version: int) -> bool:
        """Allows checking whether an article has a certain version."""
        return self.model.objects\
                   .filter(article__article_identifier=article_id)\
                   .filter(version=version).count() > 0

    def latest_articles(self) -> Set[str]:
        """Find latest `Article`s by article_identifier by using `Property` values.

        latest/current article(s) are defined by having a `Property` with the `name`
        of 'publication-status' and not having the value 'hidden' or 'published'
        """

        pub_states = self.model.objects \
            .filter(self.Q_FIND_PUB_STATUS) \
            .exclude(self.Q_FIND_PUBLISHED | self.Q_FIND_HIDDEN | self.Q_FIND_NULL)

        # check that property.article latest version matches current property version
        # else could be an old property duplicate e.g. an article could have x3 `publication-status` entries

        # extract unique article identifiers
        return {prop.article.article_identifier for prop in pub_states
                if prop.version == Article.versions.latest(prop.article.article_identifier)}

    def preview_link(self, article_id: str = None, properties: List['Property'] = None) -> Dict[str, str]:
        """Generate a preview_link string including a base url and a `Property` of name 'path'.

        If an article_id is provided the `Property` objects will be obtained.

        If properties are provided then they will be used, negating the need for a query.
        (this helps reduce queries if you already have access to the `Property` objects)
        """

        path = ''

        if article_id:
            properties = self.model.objects.filter(article__article_identifier=article_id)

        for prop in properties:
            if prop.name == 'path':
                path = prop.text_value

        return {'preview_link': self.PREVIEW_BASE_URL + path, 'path': path}

    def publication_data(self, article_id: str = None, properties: List['Property'] = None) -> str:
        """Get publication data string from a `Property` of name '_publication-data'

        If an article_id is provided the `Property` objects will be obtained.

        If properties are provided then they will be used, negating the need for a query.
        (this helps reduce queries if you already have access to the `Property` objects)
        """

        pub_data = ''

        if article_id:
            properties = self.model.objects.filter(article__article_identifier=article_id)

        for prop in properties:
            if prop.name == '_publication-data':
                pub_data = prop.text_value

        return pub_data


class EventUtilityManager(models.Manager):

    def to_article_map(self, article_ids: List[str]) -> Dict[str, List['Event']]:
        """Return a dict of article_id keys with a list of `Event` objects as a value.

        example return value:

        {
            '09003': [
                <Event: ID: 94342, Article: 09003>,
                <Event: ID: 94343, Article: 09003>,
                <Event: ID: 94344, Article: 09003>
            ]
        }
        """

        all_events = list(self.model.objects
                          .select_related('article')
                          .filter(article__article_identifier__in=article_ids))

        event_map = {}

        # populate event map
        for event in all_events:
            if not event_map.get(event.article.article_identifier, None):
                event_map[event.article.article_identifier] = [event]
            else:
                event_map[event.article.article_identifier].append(event)

        return event_map


class Article(models.Model):
    # adding 'article_' to the property name is required by legacy db model
    article_id = models.AutoField(primary_key=True, db_index=True)
    article_identifier = models.CharField(max_length=512, null=False, unique=True, db_index=True)

    objects = models.Manager()
    details = ArticleDetailManager()
    versions = ArticleVersionManager()

    class Meta:
        db_table = 'article'
        ordering = ['article_id']

    def __str__(self) -> str:
        return 'ID: {0}, {1}'.format(self.article_id, self.article_identifier)


class Event(models.Model):
    event_id = models.AutoField(primary_key=True, db_index=True)
    article = models.ForeignKey(Article, related_name='events', on_delete=models.DO_NOTHING)
    message = models.TextField(null=False)
    run = models.CharField(max_length=255, null=False)
    status = models.CharField(max_length=255, null=False)
    timestamp = models.DateTimeField(null=False)
    type = models.CharField(max_length=255, null=False)
    version = models.IntegerField(default=0)

    objects = models.Manager()
    utils = EventUtilityManager()

    class Meta:
        db_table = 'event'
        ordering = ['version', 'article__article_id', 'event_id']

    def __str__(self) -> str:
        return 'ID: {0}, Article: {1}'.format(self.event_id, self.article)


class Message(models.Model):
    message_id = models.CharField(primary_key=True, max_length=512)
    timestamp = models.DateTimeField(null=False)

    objects = models.Manager()

    class Meta:
        db_table = 'message'

    def __str__(self) -> str:
        return 'ID: {0}, {1}'.format(self.message_id, self.timestamp)


class Property(models.Model):
    property_id = models.AutoField(primary_key=True, db_index=True)
    article = models.ForeignKey(Article, related_name='properties', on_delete=models.DO_NOTHING)
    date_value = models.IntegerField(null=True)
    int_value = models.IntegerField(null=True)
    name = models.CharField(max_length=255, null=True)
    text_value = models.TextField(null=True)
    property_type = models.CharField(max_length=255, null=False)
    version = models.IntegerField(null=False)

    objects = models.Manager()
    find = PropertyFinderManager()

    class Meta:
        db_table = 'property'
        verbose_name_plural = 'Properties'

    def __str__(self) -> str:
        return 'ID: {0}, Article: {1}'.format(self.property_id, self.article)
