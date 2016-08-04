import datetime
import logging
from config_decider import config as settings
from dashboard.models import articles
from articles import get_current_articles, get_article
import requests


# called by the dashboard app to get the detailed data for an article
def get_current_model():
    logging.debug('in current model')
    model = {
        "error": [],
        "in-progress": [],
        "scheduled": [],
        "uir": []
    }

    current_articles = get_current_articles()

    current_schedules = get_scheduled_publication_dates(current_articles)

    for article in current_articles:

        article_model = get_current_article_model(article, current_schedules)

        if article_model.get('event-status') == 'error':
            model['error'].append(article_model)
        elif 'scheduled-publication-date' in article_model:
            model['scheduled'].append(article_model)
        elif 'publication-status' in article_model and article_model['publication-status'] == "ready to publish":
            model['uir'].append(article_model)
        else:
            model['in-progress'].append(article_model)

    return model


def get_scheduled_publication_dates(current_articles):

    article_ids = map(lambda article: article.get('article-identifier'), current_articles)
    r = requests.post(settings.article_scheduler_url, json={"articles": article_ids})
    if r.status_code == 200:
        scheduled_articles = r.json()
        if "articles" in scheduled_articles:
            article_list = scheduled_articles["articles"]
            article_list = filter(lambda a: a.get("scheduled") is not None and a.get("published") is not True,
                                  article_list)
            return dict(map(lambda a: (a.get('article-identifier'), int(a.get('scheduled'))), article_list))
    return None


# called by the dashboard app to get the data for 'current' articles
def get_current_article_model(article, current_schedules):
    model = {}

    # assemble properties
    versions = article.get('versions')
    if isinstance(versions, dict):

        # 'global' properties
        global_version = versions.get(0)
        if isinstance(global_version, dict):
            global_version_properties = global_version.get('properties')
            for prop_key in global_version_properties.keys():
                prop = global_version_properties[prop_key]
                model[prop['name']] = prop['value']

        # add scheduled publication date if we have one for this article
        if current_schedules is not None and article['article-identifier'] in current_schedules and current_schedules[article['article-identifier']] > 0:
            model['scheduled-publication-date'] = current_schedules[article['article-identifier']]

        # version specific properties from the 'latest' version
        latest_version = max(versions.keys())
        model['version'] = latest_version
        if latest_version is not None:
            latest_version_properties = article['versions'][latest_version].get('properties')
            if isinstance(latest_version_properties, dict):
                for prop_key in latest_version_properties.keys():
                    prop = latest_version_properties[prop_key]
                    model[prop['name']] = prop['value']
                preview_base = settings.preview_base_url
                preview_path = latest_version_properties.get('path')
                if preview_path is not None and preview_base is not None:
                    model['preview-link'] = preview_base + preview_path.get('value')

            latest_run_id = 0
            latest_run_number = 0
            version_runs = article['versions'][latest_version].get('runs')
            if isinstance(version_runs, dict):
                for run in version_runs.keys():
                    run_id = run
                    run_number = version_runs[run]['run-number']
                    if run_number > latest_run_number:
                        latest_run_number = run_number
                        latest_run_id = run_id
                # details (event name, status, timestamp) for the latest event of the latest run for the latest version
                events = version_runs[latest_run_id].get('events')
                if len(events) > 0:
                    latest_event = events[len(events) - 1]
                    model['event-type'] = latest_event['type']
                    model['event-status'] = latest_event['status']
                    epoch = datetime.datetime.utcfromtimestamp(0)
                    model['event-timestamp'] = int((latest_event['timestamp'] - epoch).total_seconds())
                    model['run-id'] = latest_run_id
                    model['run'] = latest_run_number
                    # TODO : check scheduling system for future publication date

    # TODO: !!!!!! HACK !!!!!!
    model['id'] = model.get('article-id')
    return model


def get_detail_article_model(article_id):
    epoch = datetime.datetime.utcfromtimestamp(0)

    article = get_article(article_id)

    model = {'id': article['article-identifier']}
    versions = article.get('versions')

    version_zero = versions.get(0)
    version_zero_properties = version_zero.get('properties')
    model['versions'] = {}
    for version in versions:
        if version != 0:
            version_data = versions.get(version)
            version_properties = version_data.get('properties')
            merged_properties = version_zero_properties.copy()
            merged_properties.update(version_properties)

            details = {'version-number': str(version)}

            corresponding_authors = merged_properties.get('corresponding-authors', None)
            if corresponding_authors is not None:
                details['corresponding-authors'] = corresponding_authors.get('value')
            doi = merged_properties.get('doi', None)
            if doi is not None:
                details['doi'] = doi.get('value')

            preview_base = settings.preview_base_url
            preview_path = merged_properties.get('path')
            if preview_path is not None and preview_base is not None:
                details['preview-link'] = preview_base + preview_path.get('value')
            publication_date = merged_properties.get('publication-date')
            if publication_date is not None:
                details['publication-date'] = publication_date.get('value')
            publication_status = merged_properties.get('publication-status')
            if publication_status is not None:
                details['publication-status'] = publication_status.get('value')
            status = merged_properties.get('status')
            if status is not None:
                details['status'] = status.get('value')
            title = merged_properties.get('title')
            if title is not None:
                details['title'] = title.get('value')
            authors = merged_properties.get('authors')
            if authors is not None:
                details['authors'] = authors.get('value')
            article_type = merged_properties.get('article-type')
            if article_type is not None:
                details['article-type'] = article_type.get('value')

            runs = {}
            version_runs = version_data.get('runs')
            for version_run in version_runs:
                run = {}

                run_data = version_runs.get(version_run)
                run_number = str(run_data.get('run-number'))
                run['run-number'] = run_number
                run['run-id'] = version_run
                run['version-number'] = str(version)
                run_events = run_data.get('events')
                events = []
                last_type = ""
                first = True
                for run_event in run_events:
                    if first:
                        run['first-event-timestamp'] = int((run_event.get('timestamp') - epoch).total_seconds())
                        first = False
                    event = {
                        "event-message": run_event.get('message'),
                        "event-status": run_event.get('status'),
                        "event-timestamp": int((run_event.get('timestamp') - epoch).total_seconds()),
                        "event-type": run_event.get('type')
                    }
                    if event['event-type'] == last_type:
                        events[-1] = event
                    else:
                        events.append(event)
                    last_type = event['event-type']
                run['events'] = events
                runs[run_number] = run


            model['versions'][str(version)] = {}
            model['versions'][str(version)]['details'] = details
            model['versions'][str(version)]['runs'] = runs

    return model


def get_scheduled_articles(data):
    # list of raw scheduling records for the articles schduled to be published in the datte rance
    scheduled_articles = data['articles']
    # map this to a dictionary, keyed by the article-identifier
    # this is expected by get_current_article_model
    publication_dates = dict(map(lambda a: (a.get('article-identifier'), int(a.get('scheduled'))),
                                 scheduled_articles))
    # get a list of just the ids and use to obtain the 'full' article mode (with versions etc) for those
    #  scheduled articles that already have records in the dashboard
    scheduled_article_ids = publication_dates.keys()

    existing_article_map = {}
    if len(scheduled_article_ids) > 0:
        existing_articles = articles.get_latest_version_of_articles(scheduled_article_ids)
        # for each of those articles obtain the 'current article model' which is transformed for the client
        # this also adds in scheduled publication dates where known
        if existing_articles is not None and len(existing_articles) > 0:
            existing_article_details = map(lambda f: get_current_article_model(f, publication_dates),
                                           existing_articles)
            # turns the existing article details into a map for easy access
            existing_article_map = dict(map(lambda a: (a['article-id'], a), existing_article_details))
    # now we go through each of the articles scheduled for the date range and add a record in to
    # our return structure with either outline or 'current model' information, for each one
    articles_to_return = []
    for article in scheduled_articles:
        if article['article-identifier'] in existing_article_map:
            art = existing_article_map[article['article-identifier']]
            art['is-temp'] = False
            articles_to_return.append(art)
        else:
            art = {
                "id": article['article-identifier'],
                "is-temp": True,
                "scheduled-publication-date": article['scheduled']
            }
            articles_to_return.append(art)
    return articles_to_return
