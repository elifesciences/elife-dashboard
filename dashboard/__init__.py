import settings
from . import app_logging
app_logging.init_logging(__name__, settings.log_file, settings.log_level)

from flask import Flask, redirect, url_for, render_template, request, Response, jsonify
from flask_cors import CORS
from .models import article_adapters, article_operations, articles
import requests
import traceback
import logging

LOG = logging.getLogger(__name__)

app = Flask(__name__)
app.config.from_object(__name__)
CORS(app)


@app.route('/')
def index():
    return redirect(url_for('current_page'))


@app.route('/current')
def current_page():
    return render_template('current.html')


@app.route('/scheduled')
def scheduled_page():
    return render_template('scheduled.html')


@app.route('/api/current')
def current():
    return jsonify(article_adapters.get_current_model())


@app.route('/article/<article_id>/<version>/<run_id>')
@app.route('/article/<article_id>/<version>')
@app.route('/article/<article_id>')
def detail_page(article_id, version=None, run_id=None):
    # article_id, version and run captured but not actually needed
    return render_template("detail.html")


@app.route('/api/article/<article_id>')
def detail(article_id):
    article = article_adapters.get_detail_article_model(article_id)
    if not article:
        return Response(status=404)
    return jsonify(article)


@app.route('/api/queue_article_publication', methods=['POST'])
def queue_article_publication():
    results = []
    request_data = request.get_json(force=True)
    if isinstance(request_data, dict):
        if 'articles' in request_data:
            articles_to_queue = request_data['articles']
            for article in articles_to_queue:
                article_id = article.get('id')
                version, run = articles.get_latest_version_run(article_id, article.get('version'), article.get('run'))
                if version is not None and run is not None:
                    queue_result = article_operations.queue_article_publication(article_id, version, run)
                    results.append(queue_result)
                else:
                    LOG.error("Could not determine version and run for article")
                    LOG.error("Error in article: %s", article_id)
                    results.append({
                        'publication-status': 'error',
                        'id': article_id,
                        'version': str(version),
                        'run': run
                    })
    else:
        LOG.error("Problem with request data")
        return report_error("Problem with request data", "Request data not a json dictionary")

    return jsonify({'articles': results})


@app.route('/api/article_publication_status', methods=['POST'])
def status():
    results = []
    request_data = request.get_json(force=True)
    if isinstance(request_data, dict):
        if 'articles' in request_data:
            articles_for_status = request_data['articles']
            for article in articles_for_status:
                publication_status, message = articles.get_article_status(article.get('id'), int(article.get('version')))
                results.append({'id': article.get('id'),
                                'version': article.get('version'),
                                'run': article.get('run'),
                                'publication-status': publication_status,
                                'message': message})
    else:
        LOG.error("Problem with request data")
        return report_error("Problem with request data", "Request data not a json dictionary")
    return jsonify({'articles': results})


@app.route('/api/article_scheduled_status', methods=['POST'])
def scheduled_status():

    try:
        r = requests.post(settings.article_scheduler_url, json=request.get_json(force=True))
        if r.status_code == 200:
            return jsonify(r.json())
        else:
            LOG.error("Status code from scheduler was " + str(r.status_code))
            return report_error("Error in scheduling service",
                                "Status code from scheduler was " + str(r.status_code))

    except IOError:
        LOG.exception("Error contacting scheduling service")
        return report_error("Error contacting scheduling service",
                            "Stack trace: " + traceback.format_exc())


@app.route('/api/schedule_article_publication', methods=['POST'])
def schedule_publication():

    try:
        r = requests.post(settings.article_schedule_publication_url, json=request.get_json(force=True))
        if r.status_code == 200:
            return jsonify(r.json())
        else:
            LOG.error("Status code from scheduler was " + str(r.status_code))
            return report_error("Error in scheduling service",
                                "Status code from scheduler was " + str(r.status_code))

    except IOError:
        LOG.exception("Error contacting scheduling service")
        return report_error("Error contacting scheduling service",
                            "Stack trace: " + traceback.format_exc())


@app.route('/api/article_schedule_for_range/from/<from_date>/to/<to_date>/')
def article_schedule_for_range(from_date, to_date):

    url = settings.article_schedule_range_url
    url = url.replace("<from>", from_date)
    url = url.replace("<to>", to_date)

    try:
        r = requests.get(url)

        if r.status_code == 200:
            data = r.json()
            if 'articles' in data:
                scheduled_articles = article_adapters.get_scheduled_articles(data)
                return jsonify({'articles': scheduled_articles})
        else:
            LOG.error("Status code from scheduler was " + str(r.status_code))
            return report_error("Error in scheduling service",
                                "Status code from scheduler  was " + str(r.status_code))

    except IOError:
        LOG.exception("Error contacting scheduling service")
        return report_error("Error contacting scheduling service",
                            "Stack trace: " + traceback.format_exc())


def report_error(message, error_detail):

    e = {"message": message}
    if detail is not None:
        e["detail"] = error_detail
    return jsonify(e), 500


if __name__ == '__main__':
    port = getattr(settings, 'application_port', 5000)
    app.run(threaded=True, port=port)
