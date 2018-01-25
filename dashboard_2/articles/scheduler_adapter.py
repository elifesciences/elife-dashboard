import logging
from typing import Dict, List

from django.conf import settings
import requests


logger = logging.getLogger(__name__)


def get_scheduled_statuses(article_ids: List[str]) -> Dict:
	"""Retrieve scheduled article statuses from remote service"""

	data = {'articles': article_ids}
	response = requests.post(settings.ARTICLE_SCHEDULER_URL, json=data)
	if response.status_code == 200:
		return response.json()
	else:
		logging.error("Scheduler error status code: {}".format(response.status_code))
		return {}
