# [eLife Dashboard](https://github.com/elifesciences/elife-dashboard/)

This is the eLife Dashboard application and API.

[README-Frontend.md](README-Frontend.md) covers the setup of the application from a front end perspective.

## Requirements:

* Python 3+
* [PostgreSQL](https://www.postgresql.org/)
* [elife-article-scheduler](https://github.com/elifesciences/elife-article-scheduler)

## setup

    ./install.sh
    source venv/bin/activate
    python runserver.py

## testing

The dashboard unit tests depend on database access. The settings used in the tests are in `settings_test.py`.

    ./project_tests.sh

## License

MIT Licensed. See [LICENSE](LICENSE)
