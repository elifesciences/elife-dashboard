from django.contrib import admin

from .models import (
	Article,
	Event,
	Message,
	Property
)


class PropertyAdmin(admin.ModelAdmin):
    model = Property
    search_fields = ('property_id', 'name')


admin.site.register(Article)
admin.site.register(Event)
admin.site.register(Message)
admin.site.register(Property, PropertyAdmin)
