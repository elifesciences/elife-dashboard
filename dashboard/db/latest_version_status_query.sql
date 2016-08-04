select  m.article_id, m.article_identifier, m.version, p.text_value as status
from (
      select a.article_id, a.article_identifier, max(e.version) as version
      from article a
      join event e
      on a.article_id = e.article_id
      group by a.article_id, a.article_identifier
     )
as m
left join property p on m.article_id = p.article_id
and m.version = p.version
and p.name = 'publication_status'
where p.text_value <> 'published' or p.text_value is null
