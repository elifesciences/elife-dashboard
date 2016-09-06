# eLife Dashboard

This is the eLife Dashboard application and API. The eLife dashboard is comprised of three parts.

1. [UX Pin](https://live.uxpin.com/593d5793b51645bc5dfb5a0a5ab7629065ef1743#/pages/22041535/sitemap) defines the UX and interactions
1. [Pattern Library](https://github.com/digirati-co-uk/elife-monitoring-dashboard-frontend) the front end code describing the UI (but not to include any behaviour)
1. [Dashboard](https://github.com/elifesciences/elife-dashboard) this is the actual implementation of the front end functionality using the patterns from PatternLab.

New front end features should be developed in the [Dashboard](https://github.com/elifesciences/elife-dashboard) and copied back into the [Pattern Library](https://github.com/digirati-co-uk/elife-monitoring-dashboard-frontend) using ```bash -x copyfromdashboard.sh ~/Projects/eLife/elife-dashboard``` within the [Pattern Library](https://github.com/digirati-co-uk/elife-monitoring-dashboard-frontend)

# Things to ensure when developing

* The [Dashboard](https://github.com/elifesciences/elife-dashboard) contains **all** interactions, before developing a new UI feature check that the html, js and css is up to date.
* **Develop new features in the [Dashboard](https://github.com/elifesciences/elife-dashboard), the task will not be considered complete until any UI changes and all updated javascript has been copied back into the [Pattern Library](https://github.com/digirati-co-uk/elife-monitoring-dashboard-frontend) using the script provided in the [Pattern Library](https://github.com/digirati-co-uk/elife-monitoring-dashboard-frontend)**


---

# Requirements:

* [Homebrew](http://brew.sh/) (OSX only)
* [Node](https://nodejs.org/en/)
* [Live Reload](http://livereload.com/) - [Chrome plugin](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei)
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

---

## Setup for frontend 
* Install node, if on OSX run ```brew install node```
* Install ```npm install```


## Development of Front end

* ```npm start``` to start python application - this will only work if you have setup the command line options above - if you already have the application running, skip this.
* ```grunt``` in new terminal window to start build, and live reload.
* run test services.
* Start Live Reload in your browser (if required)


## Running Front end tests

* ```grunt test``` will run the tests.  


## License

MIT Licensed. See [LICENSE](LICENSE)

npm install
