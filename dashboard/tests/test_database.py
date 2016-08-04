import psycopg2
from config_decider import config as settings


def test_database_setup():
    conn = psycopg2.connect(dbname='postgres',
                           user=settings.user,
                           host=settings.host,
                           password=settings.password)
    conn.set_isolation_level(0)
    cur = conn.cursor()
    cur.execute("SELECT pg_terminate_backend(pg_stat_activity.pid) FROM pg_stat_activity WHERE pg_stat_activity.datname = '" + settings.database + "' AND pid <> pg_backend_pid();")
    conn.commit()
    cur.execute("DROP DATABASE IF EXISTS " + settings.database + ";")
    conn.commit()
    cur.execute("CREATE DATABASE " + settings.database + ";")
    conn.commit()
    cur.close()
    conn.close()


def test_database_destroy():
    conn = psycopg2.connect(dbname='postgres',
                           user=settings.user,
                           host=settings.host,
                           password=settings.password)
    conn.set_isolation_level(0)
    cur = conn.cursor()
    cur.execute("DROP DATABASE IF EXISTS " + settings.database + ";")
    conn.commit()


def create_tables_schema(cursor):
    cursor.execute(open("dashboard/db/create_monitor_dashboard.sql", "r").read())


def create_random_message(cursor):
    cursor.execute("insert into message(message_id,timestamp) values ('2a4ee336-288a-47e2-9d74-1b337642df57', '2016-03-23 12:15:22.225078');")


def create_messages_including_example(cursor):
    cursor.execute("insert into message(message_id,timestamp) values ('2a4ee336-288a-47e2-9d74-1b337642df57', '2016-03-23 12:15:22.225078');")
    cursor.execute("insert into message(message_id,timestamp) values ('f1392251-db64-4f6c-acb3-73b64aa79d9d', '2016-03-24 12:15:22.225078');")


def create_articles_properties_events(cursor):
    cursor.execute(open("dashboard/db/create_articles_properties_events.sql", "r").read())

def create_complete_article_properties_events(cursor):
    cursor.execute(open("dashboard/db/create_articles_properties_events_complete.sql", "r").read())

def create_version_zero_articles(cursor):
    cursor.execute("INSERT INTO property (property_id, version, name, int_value, text_value, date_value, property_type, article_id) VALUES (79, 0, 'article-id', NULL, '09003', NULL, 'text', 1);")
    cursor.execute("INSERT INTO property (property_id, version, name, int_value, text_value, date_value, property_type, article_id) VALUES (28, 0, 'article-id', NULL, '11407', NULL, 'text', 7);")
    cursor.execute("INSERT INTO property (property_id, version, name, int_value, text_value, date_value, property_type, article_id) VALUES (13, 0, 'article-id', NULL, '09672', NULL, 'text', 2);")


def run(fun):
    conn, cur = get_connection()
    fun(cur)
    conn.commit()
    cur.close()
    conn.close()


def run_query(query):
    conn, cur = get_connection()
    cur.execute(query)
    conn.commit()
    cur.close()
    conn.close()


def retrieve_first(query):
    conn, cur = get_connection()
    cur.execute(query)
    row = cur.fetchone()
    if row is not None:
        return row[0]
    else:
        raise ValueError("Result from query is None")


def get_connection():
    conn = psycopg2.connect(dbname=settings.database,
                           user=settings.user,
                           host=settings.host,
                           password=settings.password)
    cur = conn.cursor()
    return conn, cur


def commit_close_connection(conn,cur):
    conn.commit()
    cur.close()
    conn.close()