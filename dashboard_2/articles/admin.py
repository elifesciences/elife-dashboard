from django.contrib import admin

from .models import (
	Article,
	Event,
	Message,
	Property
)

admin.site.register(Article)
admin.site.register(Event)
admin.site.register(Message)
admin.site.register(Property)
