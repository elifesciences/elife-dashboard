from rest_framework import serializers


class ArticlePublicationStatusSerializer(serializers.Serializer):
    id = serializers.CharField(max_length=512)
    run = serializers.IntegerField()
    version = serializers.IntegerField()
