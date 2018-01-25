import logging
from typing import Dict, List

from django.conf import settings
import requests
from requests import Response


logger = logging.getLogger(__name__)


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


def get_scheduled_publication_dates() -> Dict:
	return {}


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


