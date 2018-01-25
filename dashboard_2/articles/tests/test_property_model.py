import pytest
from articles.models import Article, Property


@pytest.mark.django_db
def test_can_create_property(property_doi_v1: Property):
	assert property_doi_v1.article_id == 1
	assert property_doi_v1.name == 'doi'
	assert property_doi_v1.text_value == '10.7554/eLife.09003'
	assert property_doi_v1.property_type == 'text'
	assert property_doi_v1.version == 1


@pytest.mark.django_db
def test_can_delete_property(property_doi_v1: Property):
	property_doi_v1.delete()
	assert Property.objects.count() == 0

# TODO test other property types


@pytest.mark.django_db
def test_can_get_latest_article_ids_excluding_published_articles(article: Article, properties_v1: Property):
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
def test_can_get_latest_article_ids_excluding_hidden_articles(article: Article, properties_v1: Property):
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
def test_can_get_preview_link_for_article(article: Article):
	preview_base = 'https://foo.test.org/'
	path = 'content/7/e33511v1'

	prop = Property.objects.create(article_id=article.article_id,
	                               name='path',
	                               text_value=path,
	                               property_type='text',
	                               version=1)
	preview_link = Property.find.preview_link(properties=[prop])['preview_link']
	assert preview_link == preview_base + path


@pytest.mark.django_db
def test_can_get_publication_data_for_article(article: Article):
	pub_data = 'eyJ3b3JrZmxvd19uYW1lIj...'
	prop = Property.objects.create(article_id=article.article_id,
	                               name='_publication-data',
	                               text_value=pub_data,
	                               property_type='text',
	                               version=1)

	assert Property.find.publication_data(properties=[prop]) == pub_data


@pytest.mark.django_db
def test_can_check_if_article_has_certain_version(article: Article, property_authors_v1: Property):
	assert Property.find.article_has_version(article.article_identifier, 1)
