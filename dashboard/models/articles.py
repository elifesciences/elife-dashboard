import datetime
import logging
from config_decider import config as settings
import psycopg2
from psycopg2.extensions import SQL_IN, register_adapter
from dashboard.exceptions import ShortRetryException

register_adapter(list, SQL_IN)

insert_article_sql = 'insert into article (article_identifier) values (%s) returning article_id'

#store_message_sql = 'insert into message(message_id,timestamp) values (%s, %s)'

store_message_sql = 'insert into message(message_id,timestamp) ' \
    'select %s, %s where not EXISTS ' \
    '(select message_id from message where message_id = %s)'

store_event_sql = 'insert into event (version, run, type, status, timestamp, message, article_id) ' \
                  'select %s, %s, %s, %s, %s, %s, %s where not exists ' \
                  '(select message_id from message where message_id = %s)'


store_property_sql = 'insert into property (property_type, name, int_value, date_value, text_value, article_id, ' \
                     ' version) select %s, %s, %s, %s, %s, %s, %s where not exists ' \
                     '(select message_id from message where message_id = %s)'

update_property_sql = 'update property set property_type=%s, int_value=%s, date_value=%s, text_value = %s, ' \
                      ' version=%s where property_id = %s'

property_id_sql = 'select property_id  from property where name=%s and article_id=%s and version=%s '

get_article_sql = 'select article_id, article_identifier from article where article_identifier = %s'


get_articles_sql = "select  m.article_id, m.article_identifier, m.version, p.text_value as status \
from ( \
      select a.article_id, a.article_identifier, max(e.version) as version \
      from article a \
      join event e \
      on a.article_id = e.article_id \
      group by a.article_id, a.article_identifier \
     ) \
as m \
left join property p on m.article_id = p.article_id \
and m.version = p.version "

get_latest_articles_sql = get_articles_sql + " and p.name = 'publication-status' \
    where (p.text_value <> 'published' and p.text_value <> 'hidden') or p.text_value is null "

# restricted to doi to get one result, if a version doesn't have doi we don't return
get_articles_list_sql = get_articles_sql + " where m.article_identifier in %s and p.name = 'doi'"


get_article_properties_sql = " \
select article_id, property_id, name, int_value, text_value, date_value, property_type, \
                             version from property where article_id in %s "

get_article_events_sql = "\
select a.article_id, a.article_identifier, \
  e.event_id, e.version, e.run, e.type, e.timestamp, e.status, e.message \
from article a \
join event e \
on a.article_id = e.article_id \
where a.article_id in %s \
order by timestamp \
"

get_article_status_sql = " \
select  a.article_id, p.version, p.text_value as status \
from article a \
left join property p on a.article_id = p.article_id \
where a.article_identifier = %s \
and p.name = 'publication-status' \
and p.version = %s \
"

clean_article_sql = "truncate article cascade"
clean_message_sql = "truncate message cascade"


def get_current_articles():
    return _get_articles_for_query(get_latest_articles_sql)


def get_article(article_identifier):

    articles = _get_articles_for_query(get_article_sql, (article_identifier,))
    return articles[0] if len(articles) > 0 else None


def get_article_version(article_id, version):

    if version:
        return version
    article = get_article(article_id)
    article_versions = article.get('versions')
    if len(article_versions) < 1:
        return None
    version = max(article_versions, key=int)
    return str(version)


def get_latest_version_of_articles(article_ids):

    articles = _get_articles_for_query(get_articles_list_sql, (article_ids,))
    return articles if len(articles) > 0 else None


def get_latest_version_run(article_id, version_num, run):

    article = get_article(article_id)
    if article is None:
        return None, None
    if not version_num:
        article_versions = article.get('versions')
        if len(article_versions) < 1:
            return None, None
        version_num = max(article_versions, key=int)
    if run:
        return version_num, run
    version_obj = article_versions.get(version_num)
    run = get_latest_run(version_obj)
    return version_num, run


def get_latest_run(version):

    runs = version.get('runs')
    if len(runs):
        run_values = list(runs.values())
        events = [x.get('events') for x in run_values]
        first_events = [sorted(subevents, key=lambda x: x.get('timestamp'))[0] for subevents in events]
        run = sorted(first_events, key=lambda x: x.get('timestamp'), reverse=True)[0].get('run')
        return run
    return None

def clean():
    conn, cur = _get_connection()
    cur.execute(clean_article_sql)
    cur.execute(clean_message_sql)
    _commit_and_close_connection(conn, cur)

def _get_articles_for_query(sql, params=None):

    articles = []
    conn, cur = _get_connection()
    cur.execute(sql, params)
    rows = cur.fetchall()
    if rows is not None:
        for row in rows:
            articles.append(_get_article_from_row(row))
    _add_properties(articles)
    _add_events(articles)
    return articles


def _get_article_from_row(row):

    article = {'article-id': row[0], 'article-identifier': row[1]}
    return article


def _get_event_from_row(event):

    article_event = {
        'article-id': event[0],
        'event-id': event[2],
        'version': event[3],
        'run': event[4],
        'type': event[5],
        'timestamp': event[6],
        'status': event[7],
        'message': event[8]
    }
    return article_event


def _add_events(articles):

    # build mapping of article id to article
    article_map = dict((a['article-id'], a) for a in articles)
    if not article_map:
        return []

    # get all property data for articles in the mapping
    conn, cur = _get_connection()
    cur.execute(get_article_events_sql, (list(article_map.keys()),))
    events = cur.fetchall()

    run_numbers = {}

    for event in events:

        # build the property
        article_event = _get_event_from_row(event)

        # check the event has enough information to match to an article version

        if article_event['run'] is not None and article_event['version'] is not None:

            # get the article from the article mapping
            article = article_map[article_event['article-id']]

            if article is not None:

                # ensure we have a versions dictionary
                if 'versions' not in article:
                    article['versions'] = {}

                # ensure we have a dictionary for the current events version
                if article_event['version'] not in article['versions']:
                    article['versions'][article_event['version']] = {}

                article_version = article['versions'][article_event['version']]

                if 'runs' not in article_version:
                    article_version['runs'] = {}

                # ensure we have a list in runs for the current events version for its run
                if article_event['run'] not in article_version['runs']:
                    article_version['runs'][article_event['run']] = {}
                    # the events are returned in timestamp order so the first occurance of an event for a run
                    # gives the ordering (and logical numbering) for the run - the 'run number'
                    if not article_event['article-id'] in run_numbers:
                        run_numbers[article_event['article-id']] = {}
                    if not article_event['version'] in run_numbers[article_event['article-id']]:
                        run_numbers[article_event['article-id']][article_event['version']] = 0

                    current_run = run_numbers[article_event['article-id']][article_event['version']]
                    current_run += 1
                    article_version['runs'][article_event['run']]['run-number'] = current_run
                    run_numbers[article_event['article-id']][article_event['version']] = current_run

                    article_version['runs'][article_event['run']]['events'] = []
                article_events = article_version['runs'][article_event['run']]['events']

                # add the event to the run
                article_events.append(article_event)

    # return the decorated articles
    return articles


def _add_properties(articles):

    # build mapping of article id to article
    article_map = dict((a['article-id'], a) for a in articles)
    if not article_map:
        return []

    # get all property data for articles in the mapping
    conn, cur = _get_connection()
    cur.execute(get_article_properties_sql, (list(article_map.keys()),))
    properties = cur.fetchall()

    for prop in properties:

        # build the property
        article_property = {
            'article-id': prop[0],
            'property-type': prop[6],
            'name': prop[2],
            'version': prop[7]
        }
        if article_property['property-type'] == 'int':
            article_property['value'] = prop[3]
        elif article_property['property-type'] == 'text':
            article_property['value'] = prop[4]
        elif article_property['property-type'] == 'date':
            article_property['value'] = prop[5]

        # check the property has enough information to match to an article version
        if article_property['name'] is not None and article_property['value'] is not None:
            # we'll assume properties without versions are for version 0 - i.e. all versions
            if article_property['version'] is None:
                article_property['version'] = 0

            # get the article from the article mapping
            article = article_map[article_property['article-id']]

            if article is not None:
                # ensure we have a versions dictionary
                if 'versions' not in article:
                    article['versions'] = {}

                # ensure we have a dictionary for the current properties version
                if article_property['version'] not in article['versions']:
                    article['versions'][article_property['version']] = {}
                article_version = article['versions'][article_property['version']]

                if 'properties' not in article_version:
                    article['versions'][article_property['version']]['properties'] = {}

                # add the property to the article
                article_version['properties'][article_property['name']] = article_property

    # return the decorated articles
    return articles


def _get_article_id(article_identifier, add=False):

    conn, cur = _get_connection()
    cur.execute(get_article_sql, (article_identifier,))
    result = cur.fetchone()
    if result is None:
        if add:
            try:
                cur.execute(insert_article_sql, (article_identifier,))
                article_id = cur.fetchone()[0]
            except Exception:  # unique_violation
                logging.exception('Possible unique violation. App will try to retrieve article again')
                try:
                    _commit_and_close_connection(conn, cur)
                except BaseException:
                    logging.exception('Error on trying to close connection')
                try:
                    conn, cur = _get_connection()
                    cur.execute(get_article_sql, (article_identifier,))
                    result = cur.fetchone()
                    article_id = None
                    if result is not None:
                        article_id = result[0]
                except Exception as e:
                    logging.exception('Error retrieving article_id')
                    raise ShortRetryException("Error when retrieving article_id was %s" % e)
        else:
            article_id = None
    else:
        article_id = result[0]
    _commit_and_close_connection(conn, cur)
    return article_id


def get_article_status(article_identifier, article_version):

    conn, cur = _get_connection()
    cur.execute(get_article_status_sql, (article_identifier, article_version))
    result = cur.fetchone()
    status = result[2] if result is not None else None
    conn.commit()
    cur.close()
    conn.close()

    message = ""
    if status != "published":
        article = get_article(article_identifier)
        if article is not None:
            versions = article.get('versions')
            if article_version in versions:
                article_version = versions.get(article_version)
                runs = article_version.get('runs')
                run_keys = sorted(list(runs.keys()), key=lambda e: runs[e].get('run-number'), reverse=True)
                if len(run_keys) > 0:
                    latest_run = runs[run_keys[0]]
                    latest_event = latest_run['events'][-1]
                    if latest_event is not None:
                        if latest_event['status'] == "error":
                            status = "error"
                            message = latest_event['message']
    return status, message


def _store_message(cursor, message_id, timestamp):
    cursor.execute(store_message_sql, (message_id, timestamp, message_id))


def _store_event(version, run, event_type, timestamp, status, message, article_identifier, message_id):
    conn, cur = _get_connection()

    article_id = _get_article_id(article_identifier, add=True)
    cur.execute(store_event_sql,
                (version, run, event_type, status, timestamp, message, article_id, message_id))
    _store_message(cur, message_id, timestamp)
    conn.commit()
    cur.close()
    conn.close()
    logging.debug("The event " + event_type + " for article " + str(article_id) + " has been stored.")


def _store_property(property_type, name, value, article_identifier, version, message_id):
    conn, cur = _get_connection()
    if version is None:
        version = 0

    try:
        article_id = _get_article_id(article_identifier, add=True)
    except psycopg2.Error:
        logging.exception("error storing property")
        raise
    int_value = None
    date_value = None
    text_value = None
    if property_type == 'text':
        text_value = value
    elif property_type == 'date':
        text_value = datetime.datetime(value)
    elif property_type == 'int':
        int_value = int(value)
    else:
        logging.exception("Property type not given in message. Article: %s", article_identifier)
        return

    # TODO (AMO delivery) store_message(message_id, timestamp)

    try:

        cur.execute(property_id_sql, (name, article_id, version))
        conn.commit()
        row = cur.fetchone()
        if row is None:
            cur.execute(store_property_sql,
                        (property_type, name, int_value, date_value, text_value, article_id,
                         version, message_id))
        else:
            property_id = row[0]
            cur.execute(update_property_sql, (property_type, int_value, date_value, text_value, version,
                                              property_id))
        conn.commit()
        cur.close()
        conn.close()

    except psycopg2.Error:
        logging.exception("Error storing property")

    logging.debug("The property " + property_type + " for article " + str(article_id) + " has been stored.")

def _commit_and_close_connection(conn, cur):
    conn.commit()
    cur.close()
    conn.close()


def _get_connection():

    conn = psycopg2.connect(database=settings.database,
                            host=settings.host,
                            port=settings.port,
                            user=settings.user,
                            password=settings.password)
    cur = conn.cursor()
    return conn, cur
