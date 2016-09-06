# eLife Dashboard

This is the eLife Dashboard application and API. 

[Click here for frontend documentation](README-Frontend.md).

---

# Requirements:

* [Scheduler](https://github.com/elifesciences/elife-article-scheduler)  
* Working python development environment
* Postgres should be installed (this is not required for the test services)

---


The instructions below are for Mac OS and may need to be adapted for other platforms

## Create and use a virtual environment

create the environment (once):

(in project folder)
```bash
virtualenv venv
```

to activate the virtual environment at any point:

```bash
source venv/bin/activate
```

to deactivate:

```bash
deactivate
```

### Install Python pre-requisites

(in project folder)
(with active virtual environment as above)

if you only need to run the test services:
```bash
pip install -r service-test-requirements.txt

```

else

```bash
pip install -r requirements.txt
```
This will only succeed if postgres binaries are installed


### Running test services

After setup above and with virtual environment active:

```bash
python test_services.py
```

The server will launch and a console message will provide the base URL, typically http://localhost:8008

### Running Python Unit tests

The dashboard unit tests depend on database access. The settings used in the tests will be in `settings_test.py`.

To check which files will be considered tests, take a look at the `pytest.ini` configuration file.

#### Command line:

```
cd /srv/elife-dashboard 
./project_tests.sh
```

#### Pycharm:

Create a new Run/Debug Configuration:
Add a new Python test > Unittests configuration
In the section
Unittests:
    Test: Script
    Script: the path select the path .../tests/test_file_you want_to_test.py
Environment:
    Project: elife-dashboard
    Environment variables: CONFIG_FILE=test
    Python interpreter: (the virtualenv at your dashboard project)
    Working directory: [your path to]/elife-dashboard

Add content roots to PYTHONPATH (checked)
Add source roots to PYTHONPATH (checked)


## License

MIT Licensed. See [LICENSE](LICENSE)

npm install
