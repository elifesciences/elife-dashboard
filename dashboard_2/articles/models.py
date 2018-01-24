import logging
import time
from typing import (
	Dict, List, Set, Tuple
)

from django.db import models
from django.conf import settings
from django.db.models import Max, Q
from django.db.models import ObjectDoesNotExist


logger = logging.getLogger(__name__)


class ArticleDetailManager(models.Manager):

	def get(self, article_id: str, version: int, events: List['Event'] = None) -> Dict:
		"""Get detail information for a given article version.

		:param article_id:
		:param version:
		:param events: List[Event]
		:return:
		"""

		details = {}

		# get properties for that version
		properties = list(Property.objects.filter(article__article_identifier=article_id, version=version))

		# dynamically add properties to data
		for prop in properties:
			details[prop.name] = prop.__dict__['{}_value'.format(prop.property_type)]

		# find latest run for target version
		latest_runs = self.model.versions.get_runs(article_id, events=events).get(str(version))
		latest_run = latest_runs[max(latest_runs.keys())]  # TODO handle latest_runs not be present

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

		:param article_id: str
		:param version: int
		:return: Tuple(str, str)
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
		except IndexError as err:
			logger.exception(err)

		return publication_status, message

	def get_runs(self, article_id: str = None, events: List['Event'] = None) -> Dict:
		"""Each article has versions, each version has its own run(s),
		each run consists of `Event`s, each run should only contain the
		most recent `Event` of its `type`.

		e.g. no run should contain x2 `Event`s of type 'Version Lookup'

		example return value:

		{}

		:param article_id: str
		:param events: List[Event]
		:return: Dict
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
			for run, events in temp_runs.items():
				for event_name, event in events.items():
					runs[version]['runs'][run].append(event)

		sorted_runs = self.sort_runs(runs)

		return sorted_runs

	def latest(self, article_id: str = None, events: List['Event'] = None) -> int:
		"""Finds the latest article version from its stored Events.

		:param article_id:
		:param events: List[Event]
		:return: int
		"""

		if events:
			latest = max(events, key=lambda e: e.version)
			return latest.version
		elif article_id:
			result = Event.objects\
				.filter(article__article_identifier=article_id)\
				.aggregate(Max('version'))
			return result.get('version__max', 0)
		else:
			raise Exception('Please provide args')  # TODO need to flesh out

	@staticmethod
	def sort_events(events: List['Event']) -> List:
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
					'b6ef5d1f-23b3-4f4e-9ba3-7de24f885171': [
						<Event: ID: 1, Article: 1>,
						<Event: ID: 2, Article: 1>
					],
					'c6ef5d1f-23b3-4f4e-9ba3-7de24f885172': [
						<Event: ID: 3, Article: 1>,
						<Event: ID: 4, Article: 1>
					]
				}
			}
		}

		example return value:

		{}

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

			for run in sorted([run for run in runs_by_first_event.values()], key=lambda x: x.get('first-event-timestamp')):
				sorted_runs[version][str(run_num)] = run
				sorted_runs[version][str(run_num)]['run-number'] = str(run_num)
				run_num += 1

		return sorted_runs

	def all(self, article_id: str) -> Dict:
		"""

		:param article_id: str
		:return: Dict
		"""

		properties = []
		versions = {}

		try:
			properties = self.model.objects.get(article_identifier=article_id).properties.all()
		except ObjectDoesNotExist as err:
			logger.exception(err)

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

	# TODO get method for a single version


class PropertyFinderManager(models.Manager):

	PREVIEW_BASE_URL = settings.PREVIEW_BASE_URL or ''
	PUBLICATION_STATUS = 'publication-status'
	HIDDEN_STATUSES = ('hidden', 'published')

	Q_FIND_PUB_STATUS = Q(name__exact=PUBLICATION_STATUS)
	Q_FIND_HIDDEN = Q(text_value__exact='hidden')
	Q_FIND_PUBLISHED = Q(text_value__exact='published')
	Q_FIND_NULL = Q(text_value__isnull=True)

	def article_has_version(self, article_id: str, version: int) -> bool:
		"""Allows checking whether an article has a certain version.

		:param article_id: str
		:param version: int
		:return: bool
		"""
		return self.model.objects\
			       .filter(article__article_identifier=article_id)\
			       .filter(version=version).count() > 0

	def latest_articles(self) -> Set[str]:
		"""Find latest `Article`s by article_identifier by using `Property` values.

		latest/current article(s) are defined by having a `Property` with the `name`
		of 'publication-status' and not having the value 'hidden' or 'published'

		:return: Set[str]
		"""

		articles = self.model.objects\
			.filter(self.Q_FIND_PUB_STATUS) \
			.exclude(self.Q_FIND_PUBLISHED | self.Q_FIND_HIDDEN | self.Q_FIND_NULL) \
			.values_list('article__article_identifier', flat=True)

		# extract unique article identifiers
		return {article for article in articles}

	def preview_link(self, article_id: str = None, properties: List['Property'] = None) -> Dict:
		"""Generate a preview_link string including a base url and a `Property` of name 'path'.

		If an article_id is provided the `Property` objects will be obtained.

		If properties are provided then they will be used, negating the need for a query.
		(this helps reduce queries if you already have access to the `Property` objects)

		:param article_id: str
		:param properties: List[Property]
		:return: Dict: {'preview_link': '', 'path': ''}
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

		:param article_id: str
		:param properties: List[Property]
		:return: str
		"""

		pub_data = ''

		if article_id:
			properties = self.model.objects.filter(article__article_identifier=article_id)

		for prop in properties:
			if prop.name == '_publication-data':
				pub_data = prop.text_value

		return pub_data


class EventUtilityManager(models.Manager):

	def to_article_map(self, article_ids: List[str]) -> Dict:
		"""Return a dict of article_id keys with a list of `Event` objects as a value.

		example return value:

		{
			'09003': [
				<Event: ID: 94342, Article: 09003>,
				<Event: ID: 94343, Article: 09003>,
				<Event: ID: 94344, Article: 09003>
			]
		}

		:param article_ids: List[str]
		:return: Dict
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
		return 'ID: {0}, Article: {1}'.format(self.event_id, self.article_id)


class Message(models.Model):
	message_id = models.CharField(primary_key=True, max_length=512)
	timestamp = models.DateTimeField(null=False)

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

	"""
	some possible property names from messages:
	- _publication-data
	- article-id
	- article-type
	- authors
	- corresponding-authors
	- doi
	- path
	- publication-date
	- publication-status
	- status
	- title

	"""

	def __str__(self) -> str:
		return 'ID: {0}, Article: {1}'.format(self.property_id, self.article_id)
