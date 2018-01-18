import time
from typing import Dict, List, Set

from django.db import models
from django.db.models import Max, Q


class ArticleDetailManager(models.Manager):

	def get(self, article_id: str, version: int):
		"""Get detail information for a given article version.

		:param article_id:
		:param version:
		:return:
		"""

		details = {}

		# get properties for that version
		properties = Property.objects.filter(article__article_identifier=article_id, version=version)

		# dynamically add properties to data
		for prop in properties:
			details[prop.name] = prop.__dict__['{}_value'.format(prop.property_type)]

		# find latest run for target version
		latest_runs = Article.versions.get_runs(article_id).get(str(version))
		latest_run = latest_runs[max(latest_runs.keys())]  # TODO handle latest_runs not be present

		# then find the latest event and add data from latest run
		latest_event = latest_run.get('events')[-1]

		# add latest run properties
		details['run-id'] = latest_run.get('run-id')
		details['run'] = int(latest_run.get('run-number'))

		# add latest event properties
		details['event-status'] = latest_event.get('event-status')
		details['event-timestamp'] = latest_event.get('event-timestamp')
		details['event-type'] = latest_event.get('event-type')

		# add publication properties
		# details['_publication-data'] = ''
		# details['path'] = ''  # optional
		# details['publication-status'] = ''

		# add last few local base properties
		details['preview-link'] = ''
		details['article-id'] = article_id
		details['id'] = article_id
		details['version'] = version

		return details


class ArticleVersionManager(models.Manager):
	# TODO break up and move logic

	def get_runs(self, article_id: str) -> Dict:
		"""

		:param article_id: str
		:return:
		"""

		runs = {}
		events = Event.objects.filter(article__article_identifier=article_id)

		for event in events:
			event_version = str(event.version)
			if event_version not in runs:
				runs[event_version] = {'runs': {}}

			if event.run not in runs[event_version]['runs']:
				runs[event_version]['runs'][event.run] = []

			runs[event_version]['runs'][event.run].append(event)

		sorted_runs = self.sort_runs(runs)

		return sorted_runs

	def has_version(self, article_id: str, version: int) -> bool:
		# TODO Needs to be moved from here!
		"""Allows checking whether an article has a certain version.

		:param article_id: str
		:param version: int
		:return: bool
		"""
		return Property.objects.filter(article__article_identifier=article_id).filter(version=version).count() > 0

	def latest(self, article_id: str) -> int:
		"""Finds the latest article version from its stored Events.

		:param article_id: str
		:return: int
		"""
		result = Event.objects.filter(article__article_identifier=article_id).aggregate(Max('version'))
		return result.get('version__max', 0)

	@staticmethod
	def sort_events(events: List['Event']) -> List:
		event_data = []

		for event in events:
			# TODO check if event by type already exists in list


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

	def all(self, article_id: str):
		"""

		:param article_id: str
		:return:
		"""
		versions = {}

		properties = Property.objects.filter(article__article_identifier=article_id)

		for prop in properties:
			# check for prop.version == 0 (can possibily be of `name` 'article-id')
			if prop.version > 0:
				version = str(prop.version)
				if version not in versions:
					versions[version] = {
						'details': {
							'preview-link': '', # "https://preview--journal.elifesciences.org/content/7/e29913v1"
							'version-number': version
						},
						'runs': {}
					}

				# process details
				versions[version]['details'][prop.name] = prop.__dict__['{}_value'.format(prop.property_type)]

		# process runs for each version
		sorted_runs = Article.versions.get_runs(article_id=article_id)
		for version in versions:
			# TODO sort out the typing mess!
			try:
				# versions[str(int(version) + 1)]['runs'] = sorted_runs[version]
				versions[version]['runs'] = sorted_runs[version]
			except KeyError:
				pass

		return versions

	def get(self, article_id, version_number):
		pass


class PropertyFinderManager(models.Manager):

	PUBLICATION_STATUS = 'publication-status'
	HIDDEN_STATUSES = ('hidden', 'published')

	Q_FIND_PUB_STATUS = Q(name__exact=PUBLICATION_STATUS)
	Q_FIND_HIDDEN = Q(text_value__exact='hidden')
	Q_FIND_PUBLISHED = Q(text_value__exact='published')
	Q_FIND_NULL = Q(text_value__isnull=True)

	def latest_articles(self) -> Set[str]:
		"""Find latest `Article`s by identifier by using `Property` values.

		latest/current article(s) are defined by having a `Property` with the `name`
		of 'publication-status' and not having the value 'hidden' or 'published'

		:return: Set[str]
		"""

		articles = Property.objects\
			.filter(self.Q_FIND_PUB_STATUS)\
			.exclude(self.Q_FIND_PUBLISHED | self.Q_FIND_HIDDEN | self.Q_FIND_NULL)\
			.values_list('article__article_identifier', flat=True)

		# extract unique article identifiers
		latest_article_ids = {article for article in articles}

		return latest_article_ids


class Article(models.Model):
	# adding 'article_' to the property name is required by legacy db model
	article_id = models.AutoField(primary_key=True, db_index=True)
	article_identifier = models.CharField(max_length=512, null=False, unique=True)

	objects = models.Manager()
	details = ArticleDetailManager()
	versions = ArticleVersionManager()

	class Meta:
		db_table = 'article'
		ordering = ['article_id']

	def __str__(self):
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

	class Meta:
		db_table = 'event'
		ordering = ['version', 'article__article_id', 'event_id']

	def __str__(self):
		return 'ID: {0}, Article: {1}'.format(self.id, self.article_id)


class Message(models.Model):
	message_id = models.CharField(primary_key=True, max_length=512)
	timestamp = models.DateTimeField(null=False)

	class Meta:
		db_table = 'message'

	def __str__(self):
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

	def __str__(self):
		return 'ID: {0}, Article: {1}'.format(self.property_id, self.article_id)