from django.views.generic import RedirectView, TemplateView


class IndexView(RedirectView):
	pattern_name = 'articles:current_page'


class CurrentPageView(TemplateView):
	template_name = 'current.html'


class DetailPageView(TemplateView):
	template_name = 'detail.html'


class ScheduledPageView(TemplateView):
	template_name = 'scheduled.html'
