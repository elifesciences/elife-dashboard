select a.article_id, a.article_identifier,
  e.event_id, e.version, e.run, e.type, e.timestamp, e.status, e.message
from article a
join event e
on a.article_id = e.article_id
where a.article_identifier in ('00001')
order by timestamp

