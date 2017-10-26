from flask import Flask, request, jsonify, redirect, url_for, render_template
from flask_cors import CORS
from time import sleep
import random
import json
import datetime
import time
import sys

rng = random.Random()
app = Flask(__name__, template_folder="dashboard/templates", static_folder='dashboard/static')
CORS(app)

articles = {}


messages = [
            "+++ out of cheese +++",
            "I'm a teapot",
            "Input, number 5 need input",
            "Quit now and cake will be served immediately",
            "I'm afraid I can't do that Dave",
            "Use the force"]


def get_random_enqueue_status():
    # 1 in 10 return error

    rn = rng.randrange(1, 10)
    if rn == 1:
        return 'error', get_random_message()
    return 'queued', get_random_message()


def get_random_publish_status():
    rn = rng.randrange(1, 15)
    if rn < 5:
        return 'published', get_random_message()
    if rn < 6:
        return 'error', get_random_message()
    return 'ready to publish', None


def get_random_message():
    rn = rng.randrange(1, len(messages))
    return messages[rn]


@app.route('/api/article/<article_id>')
def article(article_id):

    error = get_rate_error()
    if error is not None:
        return error, 500

    
    error_id = '21230' # error 21230
    in_progress_id = '21451' # in progress 21451
    scheduled_id = '28801' # scheduled 28801
    uirvr_id = '00010' # reason for version (uir) 00010
    uir_id = '002898' # ready to publish (uir) 002898
    
    if(article_id) == error_id:
        filename = 'details--error.json'
    elif(article_id) == in_progress_id:
        filename = 'details--in-progress.json'
    elif(article_id) == scheduled_id:
        filename = 'details--scheduled.json'
    elif(article_id) == uirvr_id:
        filename = 'details--reason-for-version.json'
    elif(article_id) == uir_id:
        filename = 'details.json'
    else:
        filename = 'details.json'
      
    with open(filename, 'r+') as f:
        article_view = f.read()
        f.close()
        article_view = article_view.replace("{{article_id}}", article_id)
        return article_view


@app.route('/api/current')
def current():

    error = get_rate_error()
    if error is not None:
        return error, 500

    with open('articles.json', 'r+') as f:
        current_view = f.read()
        f.close()
        return current_view


@app.route('/api/queue_article_publication', methods=['POST'])
def queue_article_publication():

    error = get_rate_error()
    if error is not None:
        return error, 500

    # create new registry of articles and generate random queue status for each and return the result
    global articles
    articles = request.get_json()
    for art in articles['articles']:
        art['publication-status'], message = get_random_enqueue_status()
        art.pop('doi', None)
        if 'run' not in art:
            art['run'] = '00000000-0000-0000-0000-cc00000c0000'
        if 'version' not in art:
            art['version'] = "2"
    return jsonify(articles)


@app.route('/api/article_publication_status', methods=['POST'])
def publication_status():

    error = get_rate_error()
    if error is not None:
        return error, 500

    global articles

    # do random updates of outstanding article statuses
    for art in articles['articles']:
        if art['publication-status'] == "queued" or art['publication-status'] == "ready to publish":
            art['publication-status'], message = get_random_publish_status()
            if message is not None:
                art['message'] = message

    # check status of request articles
    check_articles = request.get_json()
    checked_articles = {'articles': []}

    for check_article in check_articles['articles']:
        for queue_article in articles['articles']:
            if queue_article['id'] == check_article['id'] \
                    and queue_article['version'] == check_article['version'] \
                    and queue_article['run'] == check_article['run']:
                checked_articles['articles'].append(queue_article)

    return jsonify(checked_articles)

@app.route('/api/schedule_article_publication', methods=['POST'])
def set_publication_date():

    error = get_rate_error()
    if error is not None:
        return error, 500

    return jsonify({'result': 'success'})


@app.route('/api/article_schedule_for_range/from/<start>/to/<end>/')
def article_schedule_for_range(start,end):

    error = get_rate_error()
    if error is not None:
        return error, 500

     # with open('advance-articles.json', 'r+') as f:
    #     advance_article_view = f.read()
    #     f.close()
    # return advance_article_view
    authors = ["Miyuki Suzawa, Diego A Miranda, Karmela A Ramos, Kenny K-H Ang",
               "Emily J Faivre, Christopher G Wilson, Laura Caboni, Michelle R Arkin",
               "Robert J Fletterick, Aaron Diaz, John S Schneekloth, Holly A Ingraham",
               "Yeong-Sang Kim, Peter Tontonoz"];
    titles = ["A gene-expression screen identifies a non-toxic sumoylation inhibitor that mimics SUMO-less human LRH-1 in liver",
              "Sequence co-evolution gives 3D contacts and structures of protein complexes",
              "Residue proximity information and protein model discrimination using saturation-suppressor mutagenesis",
              "Coverage and system efficiencies of insecticide-treated nets in Africa from 2000 to 2017"];

    s = int(start)
    e = int(end)
    lst = []
    is_advanced = True
    for i in range(20):
        elife_article_id =  str(random.randint(2000,7000)).zfill(6)
        #is_advanced = bool(int(not rng.randrange(1, 2) == 1))
        if is_advanced:
            lst.append({"id": elife_article_id, "scheduled-publication-date": random.randint(s, e), "is-temp": 1 })
            is_advanced = False
        else:
            index = int(random.randint(0, 3))
            lst.append({"corresponding-authors": authors[index],
                        "doi": "10." + str(random.randint(7000,7854)) + "/elife." + elife_article_id,
                        "event-status": "end",
                        "event-timestamp": 1458804203,
                        "event-type": "Convert images",
                        "id": elife_article_id,
                        "publication-date": "2015-12-11T00:00:00Z",
                        "run": 1,
                        "run-id": "def",
                        "status": "VOR",
                        "title": titles[index],
                        "version": 2,
                        "preview-link": "http://continuum-test.v2.elifesciences.org/" + elife_article_id + ".html",
                        "scheduled-publication-date": random.randint(s,e),
                        "is-temp": 0,
                        "publication-status": "in progress",
                        "path": "content/4/e" + elife_article_id + "v2",
                        "article_id": elife_article_id,
                        "authors": "Miyuki Suzawa, Diego A Miranda, Karmela A Ramos, Kenny K-H Ang, Emily J Faivre"})
                        #"has-content": int(not rng.randrange(1, 10) == 1)})
            is_advanced = True

    return jsonify({"articles": lst})

@app.route('/api/article_scheduled_status', methods=['POST'])
def scheduled_status():

    error = get_rate_error()
    if error is not None:
        return error, 500

    data = request.get_json()
    article_ids = data["articles"]
    lst = []
    for article_id in article_ids:
        published = 1
        now = int(time.time())

        if published:
            scheduled = random.randint(now, (now + hours(48)))
        else:
            isnotsheduled = int(rng.randrange(1, 2) == 1)
            scheduled = None if isnotsheduled else random.randint((now - hours(48)), now)
        lst.append({"article-identifier": article_id, "published": published, "scheduled": scheduled})

    return jsonify({"articles": lst})


def hours(h):
    return h * 3600000


def get_rate_error(override_rate=None):

    if override_rate is not None:
        effective_rate = override_rate
    else:
        effective_rate = error_rate

    if effective_rate is not None and rng.randrange(0, effective_rate) == 0:
        message = {"message": get_random_message()}
        if rng.randrange(0, 2) == 0:
            message['detail'] = get_random_message()
        return json.dumps(message)
    else:
        return None


### these routes provide the page framework or the services

@app.route('/')
def index():
    return redirect(url_for('current_page'))


@app.route('/current')
def current_page():
    return render_template('current.html')


@app.route('/scheduled')
def scheduled_page():
    return render_template('scheduled.html')


@app.route('/article/<article_id>/<version>/<run_id>')
@app.route('/article/<article_id>/<version>')
@app.route('/article/<article_id>')
def detail_page(article_id, version=None, run_id=None):
    # article_id, version and run captured but not actually needed
    return render_template("detail.html")


if __name__ == '__main__':

    error_rate = None
    if len(sys.argv) > 1:
        error_rate = int(sys.argv[1])
    app.run(threaded=True, port=8008)
