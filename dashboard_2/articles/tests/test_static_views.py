from django.test import Client
from django.urls import reverse


def test_can_get_current_page(client: Client):
    response = client.get(reverse('articles:current_page'))
    assert response.status_code == 200


def test_can_get_detail_page(client: Client):
    response = client.get(reverse('articles:detail'))
    assert response.status_code == 200


def test_can_get_detail_page_with_id(client: Client):
    response = client.get('/article/1')
    assert response.status_code == 200


def test_can_get_detail_page_with_id_and_version(client: Client):
    response = client.get('/article/1/2')
    assert response.status_code == 200


def test_can_get_detail_page_with_id_version_and_run_id(client: Client):
    response = client.get('/article/1/2/3')
    assert response.status_code == 200


def test_can_get_scheduled_page(client: Client):
    response = client.get(reverse('articles:scheduled_page'))
    assert response.status_code == 200


def test_will_redirect_index_to_current_page(client: Client):
    response = client.get(reverse('articles:index'))
    assert response.status_code == 302
