from django.urls import path

from .api import (
    ArticleDetailAPIView, ArticlePublicationStatusAPIView,
    ArticleScheduledStatusAPIView, CurrentArticlesAPIView,
    ScheduleArticlePublicationAPIView,
)
from .views import (
    CurrentPageView, DetailPageView,
    IndexView, ScheduledPageView,
)

app_name = 'articles'

urlpatterns = [
    path('current', CurrentPageView.as_view(), name='current_page'),
    path('scheduled', ScheduledPageView.as_view(), name='scheduled_page'),
    path('article', DetailPageView.as_view(), name='detail'),
    path('article/<int:article_id>', DetailPageView.as_view(), name='detail-id'),
    path('article/<int:article_id>/<int:version>', DetailPageView.as_view(), name='detail-id-version'),
    path('article/<int:article_id>/<int:version>/<str:run_id>', DetailPageView.as_view(), name='detail-id-version-run'),
    path('api/article/<str:article_id>', ArticleDetailAPIView.as_view(), name='api-article-detail'),
    path('api/article_publication_status', ArticlePublicationStatusAPIView.as_view(), name='api-article-pub-status'),
    path('api/article_scheduled_status', ArticleScheduledStatusAPIView.as_view(), name='api-article-scheduled-status'),
    path('api/current', CurrentArticlesAPIView.as_view(), name='api-current-articles'),
    path('api/article_scheduled_status', ArticleScheduledStatusAPIView.as_view(), name='api-article-scheduled-status'),
    path('api/schedule_article_publication', ScheduleArticlePublicationAPIView.as_view(), name='api-schedule-article'),
    path('', IndexView.as_view(), name='index'),

    # '/api/article_schedule_for_range/from/<from_date>/to/<to_date>/'
    # '/api/queue_article_publication', methods=['POST'] + remote SQS
]

# TODO version api endpoints, will require change to consumers urls
