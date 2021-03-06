import logging

from django.db.models import ObjectDoesNotExist
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Article, Property
from .scheduler_adapter import (
    apply_scheduled_dates,
    get_scheduled_statuses,
    schedule_publication,
    scheduled_statuses_for_range,
)
from .serializers import ArticlePublicationStatusSerializer


LOGGER = logging.getLogger(__name__)


class CurrentArticlesAPIView(APIView):

    @staticmethod
    def get(request: Request) -> Response:
        """ TODO **complete**

        """
        articles_by_status = {
            'error': [],
            'in-progress': [],
            'scheduled': [],
            'uir': []
        }

        latest_article_map = Property.find.latest_articles()

        current_articles = Article.details.get_details_for_articles(article_map=latest_article_map)

        current_schedules = get_scheduled_statuses(list(latest_article_map)).get('articles', [])

        # filter for actual scheduled articles that are not yet published
        current_schedules = [a for a in current_schedules if a.get('scheduled') and not a.get('published')]

        # for all scheduled articles assign a `scheduled-publication-date` value
        current_articles = apply_scheduled_dates(current_articles, current_schedules)

        # Assign articles to status lists
        for article_id, article in current_articles.items():

            # error
            if article.get('event-status') == 'error':
                articles_by_status['error'].append(article)

            # scheduled: 'scheduled-publication-date'
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

    @staticmethod
    def get(request: Request, article_id: str) -> Response:
        """
        Return article detail data for target article_id.

        example return data:
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
                    "title": "Distributed rhythm generators underlie <italic>Caenorhabditis"
                            "elegans</italic> forward locomotion",
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
                          "event-message": "Finished expansion of article 29913 for version 1 run "
                                           "8e9e5c86-c592-4013-ba2b-16eb9a14c666 into 29913.1/"
                                           "8e9e5c86-c592-4013-ba2b-16eb9a14c666",
                          "event-status": "end",
                          "event-timestamp": 1515150097,
                          "event-type": "Expand Article"
                        },
                        {
                          "event-message": "Error in send of article properties to dashboard for "
                                           "article  29913 message:argument must be 9-item sequence, not None",
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

        data = {
            'id': article_id,
            'versions': Article.versions.all(article_id=article_id)
        }

        return Response(data, status=status.HTTP_200_OK)


class ArticlePublicationStatusAPIView(APIView):

    @staticmethod
    def post(request: Request) -> Response:
        """Return publication status data for target article version.

        expected input data:
        {
            "articles": [
                {
                    "id": "31149",
                    "version": 1,
                    "run": 1
                }
            ]
        }

        example return value:
        {
            "articles": [
                {
                    "id": "31149",
                    "message": " Lax has not published article 31149 result from lax:error;
                    message from lax: lax failed attempting to handle our request: failed to parse
                    response from lax, expecting json, got error 'Expecting value: line 1 column 1
                    (char 0)' from stdout ''",
                    "publication-status": "error",
                    "run": 1,
                    "version": 1
                }
            ]
        }
        """
        publication_statuses = []

        serializer = ArticlePublicationStatusSerializer(data=request.data.get('articles'), many=True)

        try:
            if serializer.is_valid(raise_exception=True):
                target_articles = serializer.data

                for article in target_articles:
                    _id = article.get('id')
                    run = article.get('run')
                    version = article.get('version')

                    pub_status, msg = Article.versions.get_publication_status(article_id=_id, version=version, run=run)

                    publication_statuses.append({
                        'id': _id,
                        'message': msg,
                        'publication-status': pub_status,
                        'run': run,
                        'version': version
                    })

        except (AttributeError, ObjectDoesNotExist, ValidationError) as err:
            msg = 'Unable to return publication statuses'
            LOGGER.exception(msg)
            return Response({'msg': msg}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'articles': publication_statuses}, status=status.HTTP_200_OK)


class ArticleScheduledStatusAPIView(APIView):

    @staticmethod
    def post(request: Request) -> Response:
        """Return scheduled article statuses for the target article ids.

        example input:
        {
            "articles": ["32417"]
        }


        example return value:
        {
            "articles": [
                {
                    "scheduled": 1463151540,
                    "article-identifier": "09003",
                    "published": false
                }
            ]
        }
        """
        article_ids = request.data.get('articles', [])
        if article_ids:
            scheduled_statuses = get_scheduled_statuses(article_ids=article_ids)
            return Response(scheduled_statuses, status=status.HTTP_200_OK)

        msg = 'Invalid article id data provided'
        LOGGER.error(msg)
        return Response({'msg': msg}, status=status.HTTP_400_BAD_REQUEST)


class ScheduleArticlePublicationAPIView(APIView):

    @staticmethod
    def post(request: Request) -> Response:
        """Schedule an article for publication.

        example input:
        {
            "article": {
                "article-identifier": "09003",
                "scheduled": 1463151556
            }
        }

        example return value:
        {
            "result": "success"
        }
        """
        schedule_response = schedule_publication(data=request.data)
        return Response(schedule_response, status=status.HTTP_200_OK)


class ScheduleForRangeAPIView(APIView):

    @staticmethod
    def get(request: Request, from_date, to_date):
        """Return scheduled article statuses between a given date time range.

        example return value:

        {
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
        """
        scheduled_articles_map = scheduled_statuses_for_range(from_date=from_date, to_date=to_date)

        # get scheduled articles dict list
        scheduled_articles = scheduled_articles_map.get('articles', [])

        # pull out ids
        article_ids = [article['article-identifier'] for article in scheduled_articles]

        current_articles = Article.details.get_details_for_articles(article_ids)

        # for all scheduled articles assign a `scheduled-publication-date` value
        current_articles = apply_scheduled_dates(current_articles, scheduled_articles)

        response_data = {'articles': [article for article in current_articles.values()]}

        return Response(response_data, status=status.HTTP_200_OK)
