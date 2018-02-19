from django.contrib import admin

from .models import (
    Article,
    Event,
    Message,
    Property
)


class ArticleAdmin(admin.ModelAdmin):
    model = Article
    list_display = ('article_id', 'article_identifier')
    search_fields = ('article_id', 'article_identifier')


class EventAdmin(admin.ModelAdmin):
    model = Event
    list_display = (
        'event_id',
        'article',
        'type',
        'version',
        'run',
        'status',
        'timestamp',
        'message'
    )
    search_fields = (
        'event_id',
        'type',
        'status',
        'timestamp',
        'message'
    )


class MessageAdmin(admin.ModelAdmin):
    model = Message
    list_display = ('message_id', 'timestamp')
    search_fields = ('message_id', 'timestamp')


class PropertyAdmin(admin.ModelAdmin):
    model = Property
    list_display = (
        'property_id',
        'article',
        'name',
        'version',
        'property_type'
    )
    search_fields = ('property_id', 'name', 'property_type')


admin.site.register(Article, ArticleAdmin)
admin.site.register(Event, EventAdmin)
admin.site.register(Message, MessageAdmin)
admin.site.register(Property, PropertyAdmin)
