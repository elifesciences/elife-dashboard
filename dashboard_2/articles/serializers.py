from rest_framework import serializers


class ArticlePublicationStatusSerializer(serializers.Serializer):
    id = serializers.CharField()
    run = serializers.IntegerField()
    version = serializers.IntegerField()
