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


## Quick Start

The instructions below are for Mac OS and may need to be adapted for other platforms

* Create virtual environment, you will only need to do this once. In the project folder run:

```bash
virtualenv venv
```
* Activate the virtual environment

```bash
source venv/bin/activate
```
* Install dependencies (This will only succeed if postgres binaries are installed)

```bash
pip install -r requirements.txt
```
* run application

```bash
python runserver.py
```




## Tests


The dashboard unit tests depend on database access. The settings used in the tests will be in `settings_test.py`.

To check which files will be considered tests, take a look at the `pytest.ini` configuration file.

#### Command line:

```
cd /srv/elife-dashboard 
./project_tests.sh
```

#### Pycharm:

* Create a new Run/Debug Configuration
* Add a new Python test > Unittests configuration
* In the section
 * Unittests:
     * Test: Script
    	* Script: the path select the path .../tests/test_file_you want_to_test.py
 * Environment:
     * Project: elife-dashboard
     * Environment variables: CONFIG_FILE=test
     * Python interpreter: (the virtualenv at your dashboard project)
     * Working directory: [your path to]/elife-dashboard
 * Add content roots to PYTHONPATH (checked)
 * Add source roots to PYTHONPATH (checked)




## Documentation

### Creating, Activating and Deactivating virtual environment

**Create environment**

```bash
virtualenv venv
```

**Activate environment**

```bash
source venv/bin/activate
```

**Deactivate environment**

```bash
deactivate
```



## License

MIT Licensed. See [LICENSE](LICENSE)
