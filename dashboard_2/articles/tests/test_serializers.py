import pytest

from articles.serializers import (
    ArticlePublicationStatusSerializer,
    ArticleScheduledstatusSerializer,
)


def test_can_validate_pub_status_request_data():
    data = {'id': '1234', 'run': 1, 'version': 1}
    serializer = ArticlePublicationStatusSerializer(data=data)
    assert serializer.is_valid()


def test_can_validate_multiple_pub_status_targets():
    data = [
        {'id': '1234', 'run': 1, 'version': 1},
        {'id': '5678', 'run': 1, 'version': 2},
        {'id': '9999', 'run': 2, 'version': 2},
    ]
    serializer = ArticlePublicationStatusSerializer(data=data, many=True)
    assert serializer.is_valid()


@pytest.mark.parametrize('data', [
    ({'id': '1234', 'version': 1}),
    ({'id': '1234', 'run': 1}),
    ({'run': 1, 'version': 1}),
])
def test_will_not_validate_incorrect_pub_status_data_formats(data):
    serializer = ArticlePublicationStatusSerializer(data=data)
    assert not serializer.is_valid()


def test_can_validate_scheduled_status_request_data():
    data = {'id': '1234'}
    serializer = ArticleScheduledstatusSerializer(data=data)
    assert serializer.is_valid()


def test_can_validate_multiple_scheduled_status_targets():
    data = [
        {'id': '1234'},
        {'id': '5678'},
        {'id': '9999'},
    ]
    serializer = ArticleScheduledstatusSerializer(data=data, many=True)
    assert serializer.is_valid()
