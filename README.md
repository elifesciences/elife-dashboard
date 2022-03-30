# [eLife Dashboard](https://github.com/elifesciences/elife-dashboard/)

This is the eLife Dashboard application and API.

This document covers the setup of the dashboard application and API. [Click here for frontend documentation](README-Frontend.md) which includes instructions for a setup with no external dependencies.

## Table of Contents

* [Requirements](#requirements)
* [Quick start](#quick-start)
* [Tests](#tests)
* [Documentation](#documentation)
* [License](#license)

## Requirements:

* [Scheduler](https://github.com/elifesciences/elife-article-scheduler)  
* [Python](https://www.python.org/) 
* [Postgres](https://www.postgresql.org/)

## setup

    ./install.sh
    source venv/bin/activate
    python runserver.py

## testing

The dashboard unit tests depend on database access. The settings used in the tests will be in `settings_test.py`.

To check which files will be considered tests, take a look at the `pytest.ini` configuration file.

    ./project_tests.sh

## License

MIT Licensed. See [LICENSE](LICENSE)
