from django.db.utils import IntegrityError
import pytest
from articles.models import Message


@pytest.mark.django_db
def test_can_create_mesasge(message: Message):
	assert message.message_id == '2a4ee336-288a-47e2-9d74-1b337642df57'
	assert message.timestamp == '2016-03-23 12:15:22.225078'


@pytest.mark.django_db
def test_can_delete_message(message: Message):
	message.delete()
	assert Message.objects.count() == 0


@pytest.mark.django_db
def test_message_id_is_unique(message: Message):
	with pytest.raises(IntegrityError):
		Message.objects.create(message_id='2a4ee336-288a-47e2-9d74-1b337642df57',
		                       timestamp='2016-03-23 12:15:22.225078')
