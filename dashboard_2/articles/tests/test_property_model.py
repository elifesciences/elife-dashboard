import pytest
from articles.models import Article, Property


@pytest.mark.django_db
def test_can_create_property(property_doi_v1):
	assert property_doi_v1.article_id == 1
	assert property_doi_v1.name == 'doi'
	assert property_doi_v1.text_value == '10.7554/eLife.09003'
	assert property_doi_v1.property_type == 'text'
	assert property_doi_v1.version == 1


@pytest.mark.django_db
def test_can_delete_property(property_doi_v1):
	property_doi_v1.delete()
	assert Property.objects.count() == 0

# TODO test other property types


@pytest.mark.django_db
def test_can_get_latest_article_ids_excluding_published_articles(article, properties_v1):
	# create an 'already published' article
	article_2 = Article.objects.create(article_identifier='01234')

	Property.objects.create(article_id=article_2.article_id,
	                        name='publication-status',
	                        text_value='published',
	                        property_type='text',
	                        version=2)

	# get latest article identifiers
	latest_article_ids = Property.find.latest_articles()

	# make sure 'already published' article id is not present
	assert article_2.article_identifier not in latest_article_ids


@pytest.mark.django_db
def test_can_get_latest_article_ids_excluding_hidden_articles(article, properties_v1):
	# create an 'already published' article
	article_2 = Article.objects.create(article_identifier='01234')

	Property.objects.create(article_id=article_2.article_id,
	                        name='publication-status',
	                        text_value='hidden',
	                        property_type='text',
	                        version=2)

	# get latest article identifiers
	latest_article_ids = Property.find.latest_articles()

	# make sure 'already published' article id is not present
	assert article_2.article_identifier not in latest_article_ids


@pytest.mark.django_db
def test_can_get_latest_article_ids_without_wrongfully_exluding(article, properties_v1):
	"""Should not exclude properties with 'Property.find.HIDDEDN_STATUSES' if
	the Property `name` is not 'publication-status'
	"""

	article_2 = Article.objects.create(article_identifier='01234')

	# has the value of `hidden` but not the name of `publication-status`
	Property.objects.create(article_id=article_2.article_id,
	                        name='some-name',
	                        text_value='hidden',
	                        property_type='text',
	                        version=2)

	# get latest article identifiers
	latest_article_ids = Property.find.latest_articles()

	# make sure article with 'hidden' property is still present as
	# the name value != 'publication-status'
	assert article_2.article_identifier in latest_article_ids
