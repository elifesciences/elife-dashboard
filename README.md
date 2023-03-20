# [eLife Dashboard](https://github.com/elifesciences/elife-dashboard/)

This is the eLife Dashboard application and API.

[README-Frontend.md](README-Frontend.md) covers the setup of the application from a front end perspective.

## Requirements:

* [Python 3+](https://www.python.org/)
* [PostgreSQL](https://www.postgresql.org/)
* [elife-article-scheduler](https://github.com/elifesciences/elife-article-scheduler)

## setup

Create a database and import it's schema:
    
    createdb -U root elifedash
    psql -U root elifedash < dashboard/db/create_monitor_dashboard.sql

Install the Python HTTP server:

    ./install.sh

The scheduler is a separate application called [elife-article-scheduler](https://github.com/elifesciences/elife-article-scheduler)
and is installed the same way.

## running

Start the application HTTP server:

    venv/bin/python flask --app dashboard run

Start the article scheduler:

    cd /path/elife-article-scheduler/
    venv/bin/python src/manage.py runserver

Visit the application in your browser:

    http://localhost:5000

Test the article-scheduler is running:

    http://localhost:8000/schedule/ping

## testing

    ./project_tests.sh

## License

MIT Licensed. See [LICENSE](LICENSE)
