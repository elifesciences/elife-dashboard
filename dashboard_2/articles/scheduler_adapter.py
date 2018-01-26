import logging
from typing import Dict, List

from django.conf import settings
import requests
from requests import Response


logger = logging.getLogger(__name__)


def apply_scheduled_dates(current_articles: Dict, current_schedules: List[Dict]):
	"""Utility: for all scheduled articles assign a `scheduled-publication-date` value."""
	for scheduled_article in current_schedules:
		_id = scheduled_article['article-identifier']
		scheduled_date = scheduled_article['scheduled']
		current_articles[_id]['scheduled-publication-date'] = scheduled_date

	return current_articles


def log_scheduler_error(response: Response) -> None:
	logging.error("Scheduler error status code: {}".format(response.status_code))


def scheduler_post_request(url: str, data: Dict) -> Dict:
	response = requests.post(url=url, json=data)
	if response.status_code == 200:
		return response.json()
	else:
		log_scheduler_error(response)
		return {}


def get_scheduled_statuses(article_ids: List[str]) -> Dict:
	"""Retrieve scheduled article statuses from remote service"""
	return scheduler_post_request(settings.ARTICLE_SCHEDULER_URL, {'articles': article_ids})


def schedule_publication(data: Dict) -> Dict:
	"""Schedule an article publication via remote service

	example format for `data`:
	{
		"article": {
			"article-identifier": "09003",
			"scheduled": 1463151556
		}
	}
	"""
	return scheduler_post_request(settings.ARTICLE_SCHEDULE_PUBLICATION_URL, data)


def scheduled_statuses_for_range(from_date: int, to_date: int) -> Dict:
	"""Retrieve scheduled article statuses from remote service between
	a given date time range.

	example return value:
	{
	    "articles": [
	        {
	            "article-identifier": "09003",
	            "scheduled": 1463151556,
	            "published": false
	        }
	    ]
	}
	"""
	url = settings.ARTICLE_SCHEDULE_RANGE_URL
	url = url.replace("<from>", from_date)
	url = url.replace("<to>", to_date)

	response = requests.get(url)
	if response.status_code == 200:
		return response.json()
	else:
		log_scheduler_error(response)
		return {}





