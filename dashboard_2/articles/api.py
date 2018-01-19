import logging

from django.db.models import ObjectDoesNotExist
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Article, Event, Property


logger = logging.getLogger(__name__)


class CurrentArticlesAPIView(APIView):

	# /api/current

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

"""
def get_current_model():
	logging.debug('in current model')
	model = {
	    "error": [],
	    "in-progress": [],
	    "scheduled": [],
	    "uir": []
	}

	# ----------------------------------------------------------------
	current_articles = get_current_articles()

	# def get_current_articles():
    #     return _get_articles_for_query(get_latest_articles_sql)

    # def _get_articles_for_query(sql, params=None):
	#    articles = []
	#    conn, cur = _get_connection()
	#    cur.execute(sql, params)
	#    rows = cur.fetchall()
	#    if rows is not None:
	#        for row in rows:
	#            articles.append(_get_article_from_row(row))
	#    _add_properties(articles)
	#    _add_events(articles)
	#    return articles
	
	# def _add_properties(articles):
	#     # build mapping of article id to article
	#     article_map = dict((a['article-id'], a) for a in articles)
	#     if not article_map:
	#         return []
	# 
	#     # get all property data for articles in the mapping
	#     conn, cur = _get_connection()
	#     cur.execute(get_article_properties_sql, (article_map.keys(),))
	#     properties = cur.fetchall()
	# 
	#     for prop in properties:
	# 
	#         # build the property
	#         article_property = {
	#             'article-id': prop[0],
	#             'property-type': prop[6],
	#             'name': prop[2],
	#             'version': prop[7]
	#         }
	#         if article_property['property-type'] == 'int':
	#             article_property['value'] = prop[3]
	#         elif article_property['property-type'] == 'text':
	#             article_property['value'] = prop[4]
	#         elif article_property['property-type'] == 'date':
	#             article_property['value'] = prop[5]
	# 
	#         # check the property has enough information to match to an article version
	#         if article_property['name'] is not None and article_property['value'] is not None:
	#             # we'll assume properties without versions are for version 0 - i.e. all versions
	#             if article_property['version'] is None:
	#                 article_property['version'] = 0
	# 
	#             # get the article from the article mapping
	#             article = article_map[article_property['article-id']]
	# 
	#             if article is not None:
	#                 # ensure we have a versions dictionary
	#                 if 'versions' not in article:
	#                     article['versions'] = {}
	# 
	#                 # ensure we have a dictionary for the current properties version
	#                 if article_property['version'] not in article['versions']:
	#                     article['versions'][article_property['version']] = {}
	#                 article_version = article['versions'][article_property['version']]
	# 
	#                 if 'properties' not in article_version:
	#                     article['versions'][article_property['version']]['properties'] = {}
	# 
	#                 # add the property to the article
	#                 article_version['properties'][article_property['name']] = article_property
	# 
	#     # return the decorated articles
	#     return articles
	
	# def _add_events(articles):
	#     # build mapping of article id to article
	#     article_map = dict((a['article-id'], a) for a in articles)
	#     if not article_map:
	#         return []
	# 
	#     # get all property data for articles in the mapping
	#     conn, cur = _get_connection()
	#     cur.execute(get_article_events_sql, (article_map.keys(),))
	#     events = cur.fetchall()
	# 
	#     run_numbers = {}
	# 
	#     for event in events:
	# 
	#         # build the property
	#         article_event = _get_event_from_row(event)
	# 
	#         # check the event has enough information to match to an article version
	# 
	#         if article_event['run'] is not None and article_event['version'] is not None:
	# 
	#             # get the article from the article mapping
	#             article = article_map[article_event['article-id']]
	# 
	#             if article is not None:
	# 
	#                 # ensure we have a versions dictionary
	#                 if 'versions' not in article:
	#                     article['versions'] = {}
	# 
	#                 # ensure we have a dictionary for the current events version
	#                 if article_event['version'] not in article['versions']:
	#                     article['versions'][article_event['version']] = {}
	# 
	#                 article_version = article['versions'][article_event['version']]
	# 
	#                 if 'runs' not in article_version:
	#                     article_version['runs'] = {}
	# 
	#                 # ensure we have a list in runs for the current events version for its run
	#                 if article_event['run'] not in article_version['runs']:
	#                     article_version['runs'][article_event['run']] = {}
	#                     # the events are returned in timestamp order so the first occurance of an event for a run
	#                     # gives the ordering (and logical numbering) for the run - the 'run number'
	#                     if not article_event['article-id'] in run_numbers:
	#                         run_numbers[article_event['article-id']] = {}
	#                     if not article_event['version'] in run_numbers[article_event['article-id']]:
	#                         run_numbers[article_event['article-id']][article_event['version']] = 0
	# 
	#                     current_run = run_numbers[article_event['article-id']][article_event['version']]
	#                     current_run += 1
	#                     article_version['runs'][article_event['run']]['run-number'] = current_run
	#                     run_numbers[article_event['article-id']][article_event['version']] = current_run
	# 
	#                     article_version['runs'][article_event['run']]['events'] = []
	#                 article_events = article_version['runs'][article_event['run']]['events']
	# 
	#                 # add the event to the run
	#                 article_events.append(article_event)
	# 
	#     # return the decorated articles
	#     return articles

	# def _get_article_from_row(row):
	#
	#     article = {'article-id': row[0], 'article-identifier': row[1]}
	#     return article

    # get_latest_articles_sql = get_articles_sql + " and p.name = 'publication-status' \
    # where (p.text_value <> 'published' and p.text_value <> 'hidden') or p.text_value is null "

	# get_articles_sql = "select  m.article_id, m.article_identifier, m.version, p.text_value as status \
	# from ( \
	#       select a.article_id, a.article_identifier, max(e.version) as version \
	#       from article a \
	#       join event e \
	#       on a.article_id = e.article_id \
	#       group by a.article_id, a.article_identifier \
	#      ) \
	# as m \
	# left join property p on m.article_id = p.article_id \
	# and m.version = p.version "
	# ----------------------------------------------------------------

	# ----------------------------------------------------------------
	current_schedules = get_scheduled_publication_dates(current_articles)

	# def get_scheduled_publication_dates(current_articles):
	#     article_ids = map(lambda article: article.get('article-identifier'), current_articles)
	#     r = requests.post(settings.article_scheduler_url, json={"articles": article_ids})
	#     if r.status_code == 200:
	#         scheduled_articles = r.json()
	#         if "articles" in scheduled_articles:
	#             article_list = scheduled_articles["articles"]
	#             article_list = filter(lambda a: a.get("scheduled") is not None and a.get("published") is not True,
	#                                   article_list)
	#             return dict(map(lambda a: (a.get('article-identifier'), int(a.get('scheduled'))), article_list))
	#     return None

	# ----------------------------------------------------------------

	for article in current_articles:

		# ------------------------------------------------------------
	    article_model = get_current_article_model(article, current_schedules)

	    # called by the dashboard app to get the data for 'current' articlesdef get_current_article_model(article, current_schedules):
		 #    model = {}
	    # 
		 #    # assemble properties
		 #    versions = article.get('versions')
		 #    if isinstance(versions, dict):
	    # 
		 #        # 'global' properties
		 #        global_version = versions.get(0)
		 #        if isinstance(global_version, dict):
		 #            global_version_properties = global_version.get('properties')
		 #            for prop_key in global_version_properties.keys():
		 #                prop = global_version_properties[prop_key]
		 #                model[prop['name']] = prop['value']
	    # 
		 #        # add scheduled publication date if we have one for this article
		 #        if current_schedules is not None and article['article-identifier'] in current_schedules and current_schedules[article['article-identifier']] > 0:
		 #            model['scheduled-publication-date'] = current_schedules[article['article-identifier']]
	    # 
		 #        # version specific properties from the 'latest' version
		 #        latest_version = max(versions.keys())
		 #        model['version'] = latest_version
		 #        if latest_version is not None:
		 #            latest_version_properties = article['versions'][latest_version].get('properties')
		 #            if isinstance(latest_version_properties, dict):
		 #                for prop_key in latest_version_properties.keys():
		 #                    prop = latest_version_properties[prop_key]
		 #                    model[prop['name']] = prop['value']
		 #                preview_base = settings.preview_base_url
		 #                preview_path = latest_version_properties.get('path')
		 #                if preview_path is not None and preview_base is not None:
		 #                    model['preview-link'] = preview_base + preview_path.get('value')
	    # 
		 #            latest_run_id = 0
		 #            latest_run_number = 0
		 #            version_runs = article['versions'][latest_version].get('runs')
		 #            if isinstance(version_runs, dict):
		 #                for run in version_runs.keys():
		 #                    run_id = run
		 #                    run_number = version_runs[run]['run-number']
		 #                    if run_number > latest_run_number:
		 #                        latest_run_number = run_number
		 #                        latest_run_id = run_id
		 #                # details (event name, status, timestamp) for the latest event of the latest run for the latest version
		 #                events = version_runs[latest_run_id].get('events')
		 #                if len(events) > 0:
		 #                    latest_event = events[len(events) - 1]
		 #                    model['event-type'] = latest_event['type']
		 #                    model['event-status'] = latest_event['status']
		 #                    epoch = datetime.datetime.utcfromtimestamp(0)
		 #                    model['event-timestamp'] = int((latest_event['timestamp'] - epoch).total_seconds())
		 #                    model['run-id'] = latest_run_id
		 #                    model['run'] = latest_run_number
		 #                    # TODO : check scheduling system for future publication date
	    # 
		 #    # TODO: !!!!!! HACK !!!!!!
		 #    model['id'] = model.get('article-id')
		 #    return model
		# ------------------------------------------------------------

	    if article_model.get('event-status') == 'error':
	        model['error'].append(article_model)
	    elif 'scheduled-publication-date' in article_model:
	        model['scheduled'].append(article_model)
	    elif 'publication-status' in article_model and article_model['publication-status'] == "ready to publish":
	        model['uir'].append(article_model)
	    else:
	        model['in-progress'].append(article_model)

	return model

"""


class ArticleDetailAPIView(APIView):

	# /api/article/<article_id>

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

"""
example data:

{
  "id": "09003",
  "versions": {
    "3": {
      "details": {
        "doi": "10.7554/eLife.09003",
        "version-number": "3"
      },
      "runs": {
        "1": {
          "events": [
            {
              "event-message": "Starting conversion of article xml to EIF for 09003",
              "event-status": "start",
              "event-timestamp": 1454940889,
              "event-type": "Convert JATS"
            }
          ],
          "first-event-timestamp": 1454940889,
          "run-id": "b6ef5d1f-23b3-4f4e-9ba3-7de24f885171",
          "run-number": "1",
          "version-number": "3"
        }
      }
    }
  }
}


def detail(article_id):
	
	# -------------------------------------------------------------------
    return jsonify(article_adapters.get_detail_article_model(article_id))
    
    # def get_detail_article_model(article_id):
	 #    epoch = datetime.datetime.utcfromtimestamp(0)
    # 
	 
	 # ------------------------------------------------------------------
	 #    article = get_article(article_id)
	 
	 # def get_article(article_identifier):
	 #    articles = _get_articles_for_query(get_article_sql, (article_identifier,))
	 #    return articles[0] if len(articles) > 0 else None
	 
	 # def _get_articles_for_query(sql, params=None):
	 #    articles = []
	 #    conn, cur = _get_connection()
	 #    cur.execute(sql, params)
	 #    rows = cur.fetchall()
	 #    if rows is not None:
	 #        for row in rows:
	 #            articles.append(_get_article_from_row(row))
	 #    _add_properties(articles)
	 #    _add_events(articles)
	 #    return articles
	 # ------------------------------------------------------------------
	 
	 #    logging.debug("article data %s", str(article))
    # 
	 #    model = {'id': article['article-identifier']}
	 #    versions = article.get('versions')
    # 
	 #    version_zero = versions.get(0)
	 #    version_zero_properties = version_zero.get('properties')
	 #    model['versions'] = {}
	 #    for version in versions:
	 #        if version > 0:
	 #            logging.debug("version %s", str(version))
    # 
	 #            version_data = versions.get(version)
	 #            logging.debug("version_data %s", str(version_data))
    # 
	 #            version_properties = version_data.get('properties')
	 #            logging.debug("version_properties data %s", str(version_properties))
    # 
	 #            merged_properties = version_zero_properties.copy()
	 #            logging.debug("merged_properties data %s", str(merged_properties))
    # 
	 #            merged_properties.update(version_properties)
    # 
	 #            details = {'version-number': str(version)}
    # 
	 #            corresponding_authors = merged_properties.get('corresponding-authors', None)
	 #            if corresponding_authors is not None:
	 #                details['corresponding-authors'] = corresponding_authors.get('value')
	 #            doi = merged_properties.get('doi', None)
	 #            if doi is not None:
	 #                details['doi'] = doi.get('value')
    # 
	 #            preview_base = settings.preview_base_url
	 #            preview_path = merged_properties.get('path')
	 #            if preview_path is not None and preview_base is not None:
	 #                details['preview-link'] = preview_base + preview_path.get('value')
	 #            publication_date = merged_properties.get('publication-date')
	 #            if publication_date is not None:
	 #                details['publication-date'] = publication_date.get('value')
	 #            publication_status = merged_properties.get('publication-status')
	 #            if publication_status is not None:
	 #                details['publication-status'] = publication_status.get('value')
	 #            status = merged_properties.get('status')
	 #            if status is not None:
	 #                details['status'] = status.get('value')
	 #            title = merged_properties.get('title')
	 #            if title is not None:
	 #                details['title'] = title.get('value')
	 #            authors = merged_properties.get('authors')
	 #            if authors is not None:
	 #                details['authors'] = authors.get('value')
	 #            article_type = merged_properties.get('article-type')
	 #            if article_type is not None:
	 #                details['article-type'] = article_type.get('value')
    # 
	 #            runs = {}
	 #            version_runs = version_data.get('runs')
	 #            for version_run in version_runs:
	 #                run = {}
    # 
	 #                run_data = version_runs.get(version_run)
	 #                run_number = str(run_data.get('run-number'))
	 #                run['run-number'] = run_number
	 #                run['run-id'] = version_run
	 #                run['version-number'] = str(version)
	 #                run_events = run_data.get('events')
	 #                events = []
	 #                last_type = ""
	 #                first = True
	 #                for run_event in run_events:
	 #                    if first:
	 #                        run['first-event-timestamp'] = int((run_event.get('timestamp') - epoch).total_seconds())
	 #                        first = False
	 #                    event = {
	 #                        "event-message": run_event.get('message'),
	 #                        "event-status": run_event.get('status'),
	 #                        "event-timestamp": int((run_event.get('timestamp') - epoch).total_seconds()),
	 #                        "event-type": run_event.get('type')
	 #                    }
	 #                    if event['event-type'] == last_type:
	 #                        events[-1] = event
	 #                    else:
	 #                        events.append(event)
	 #                    last_type = event['event-type']
	 #                run['events'] = events
	 #                runs[run_number] = run
    # 
    # 
	 #            model['versions'][str(version)] = {}
	 #            model['versions'][str(version)]['details'] = details
	 #            model['versions'][str(version)]['runs'] = runs
    # 
	 #    return model
    
	# -------------------------------------------------------------------
    
"""