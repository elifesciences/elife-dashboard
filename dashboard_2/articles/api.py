import logging

from django.db.models import ObjectDoesNotExist
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Article, Event, Property


logger = logging.getLogger(__name__)


class CurrentArticlesAPIView(APIView):

	def get(self, request):
		"""

		:param request:
		:return:
		"""
		articles_by_status = {
			'error': [],
			'in-progress': [],
			'scheduled': [],
			'uir': []
		}

		# get current articles with details
		current_articles = {}

		latest_article_ids = Property.find.latest_articles()

		all_events = list(Event.objects
		                  .select_related('article')
		                  .filter(article__article_identifier__in=latest_article_ids))

		event_map = {}

		# populate event map
		for event in all_events:
			if not event_map.get(event.article.article_identifier, None):
				event_map[event.article.article_identifier] = [event]
			else:
				event_map[event.article.article_identifier].append(event)

		for article_id in latest_article_ids:
			events = event_map.get(article_id, None)
			latest_version = Article.versions.latest(article_id, events=events)
			current_articles[article_id] = Article.details.get(article_id, latest_version, events=events)

		# get scheduled publication dates (from article-scheduler)
		current_schedules = {}

		# Assign articles to status lists
		for article_id, article in current_articles.items():

			# error
			if article.get('event-status') == 'error':
				articles_by_status['error'].append(article)

			# scheduled: 'scheduled-publication-date' # TODO implement via article-scheduler
			elif 'scheduled-publication-date' in article:
				articles_by_status['scheduled'].append(article)

			# uir
			elif article.get('publication-status', None) == 'ready to publish':
				articles_by_status['uir'].append(article)

			# in-progress
			else:
				articles_by_status['in-progress'].append(article)

		return Response(articles_by_status, status=status.HTTP_200_OK)


class ArticleDetailAPIView(APIView):

	def get(self, request, article_id):
		"""
		Return article detail data.

		{
			"id": "29913
			"versions": {
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
			        "title": "Distributed rhythm generators underlie <italic>Caenorhabditis elegans</italic> forward locomotion",
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
			              "event-message": "Finished expansion of article 29913 for version 1 run 8e9e5c86-c592-4013-ba2b-16eb9a14c666 into 29913.1/8e9e5c86-c592-4013-ba2b-16eb9a14c666",
			              "event-status": "end",
			              "event-timestamp": 1515150097,
			              "event-type": "Expand Article"
			            },
			            {
			              "event-message": "Error in send of article properties to dashboard for article  29913 message:argument must be 9-item sequence, not None",
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
		}
		"""

		try:
			data = {
				'id': article_id,
				'versions': Article.versions.all(article_id=article_id)
			}
		except ObjectDoesNotExist:
			return Response({'msg': 'article {} does not exist'.format(article_id)},
			                status=status.HTTP_404_NOT_FOUND)

		return Response(data, status=status.HTTP_200_OK)
