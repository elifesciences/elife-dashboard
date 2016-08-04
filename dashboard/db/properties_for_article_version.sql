select a.article_id, a.article_identifier, p.name, p.version,  p.text_value, p.int_value, p.date_value
from article a join property p
on a.article_id  = p.article_id
where  a.article_identifier in ('00001') -- param 00001
order by version