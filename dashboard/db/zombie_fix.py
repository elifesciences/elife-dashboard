from config_decider import config as settings
import psycopg2


_sql_problematic_articles = "select article_identifier \
    from article \
    group by article_identifier \
    having count(article_identifier) > 1;"

_sql_create_functions = " \
    CREATE OR REPLACE FUNCTION select_article_ids_by_identifier(text) RETURNS table (article_id int) \
	as $$ SELECT article_id from article where article_identifier = $1 $$ \
	LANGUAGE SQL; \
 \
CREATE OR REPLACE FUNCTION select_events_by_identifier(text) RETURNS table (event_id int, article_id int) \
	as $$ SELECT event_id, article_id from event where article_id in (select * from select_article_ids_by_identifier($1)) $$ \
	LANGUAGE SQL; \
 \
CREATE OR REPLACE FUNCTION select_properties_by_identifier(text) RETURNS table (property_id int, article_id int) \
	as $$ SELECT property_id, article_id from property where article_id in (select * from select_article_ids_by_identifier($1)) $$ \
	LANGUAGE SQL;"

def _sql_update_article_ids(article_identifier):
    return " \
        update property \
        set article_id = (select min(article_id) from select_article_ids_by_identifier('" + article_identifier + "')) \
        where property_id in \
        (select property_id from select_properties_by_identifier('" + article_identifier + "')); \
     \
        update event \
        set article_id = (select min(article_id) from select_article_ids_by_identifier('" + article_identifier + "')) \
        where event_id in \
        (select event_id from select_events_by_identifier('" + article_identifier + "'));"

def _sql_delete_article_ids(article_identifier):
    return "delete from article where article_id = (select max(article_id) from select_article_ids_by_identifier('" + article_identifier + "'));"

_sql_drop_functions = "DROP FUNCTION IF EXISTS select_article_ids_by_identifier(text); \
                    DROP FUNCTION IF EXISTS select_events_by_identifier(text); \
                    DROP FUNCTION IF EXISTS select_properties_by_identifier(text);"



def _get_connection():

    conn = psycopg2.connect(database=settings.database,
                            host=settings.host,
                            port=settings.port,
                            user=settings.user,
                            password=settings.password)
    cur = conn.cursor()
    return conn, cur

def problematic_articles():
    conn, cur = _get_connection()
    cur.execute(_sql_problematic_articles)
    rows = cur.fetchall()
    article_identifiers = []
    if rows is not None:
        for row in rows:
            article_identifiers.append(row[0])
    return article_identifiers
def zombie_articles_fix():
    conn, cur = _get_connection()
    cur.execute(_sql_create_functions)
    conn.commit()
    conn.close()
    conn, cur = _get_connection()
    for article_identifier in problematic_articles():
        cur.execute(_sql_update_article_ids(article_identifier))
        cur.execute(_sql_delete_article_ids(article_identifier))
        conn.commit()
    cur.execute(_sql_drop_functions)
    conn.commit()
    conn.close()


if __name__ == "__main__":
    zombie_articles_fix()
