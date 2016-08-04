#elife-dashboard Zombie articles

view Jira issue http://jira.elifesciences.org:8080/browse/ELPP-770

This is a one off script that verifies if there are any duplicate "article_identifier" on the "article" table.
If there is any, it will update the dependent tables to just refer to the lowest article_id and then delete the highest
article_id created for the given article_identifier.

****** You should run this function until there is no duplicates ******

You can verify it by debugging or running:

select article_identifier
    from article
    group by article_identifier
    having count(article_identifier) > 1;

After running this we will add a UNIQUE constraint to the article_identifier field. By running:

“ALTER TABLE article ADD UNIQUE (article_identifier);” (table permission required)

Which means when the constraint is added this script will no longer be necessary since it won't allow duplicates after
it's successfully run.