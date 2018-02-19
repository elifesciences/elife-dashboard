# [eLife Dashboard](https://github.com/elifesciences/elife-dashboard/)

This is the proposed new implementation of the eLife Dashboard backend. Functionally nothing has changed, all endpoints and data models have remained the same. 

**Note: this implementation intentionally does not yet support receiving and sending of SQS messages. This would cause complications when running the two dashboards in parallel for testing purposes. Once this implementation is set to replace the current one the SQS support will be added (these are not large changes).**


## Table of Contents


* [Requirements](#requirements)
* [Quick start](#quick-start)
* [Tests](#tests)
* [License](#license)



## Requirements:


* [Scheduler](https://github.com/elifesciences/elife-article-scheduler)  
* [Python 3](https://www.python.org/) 
* [Postgres](https://www.postgresql.org/) though [SQLite3](https://www.sqlite.org/) is used for testing by default


## Quick Start

The instructions below are for Mac OS and may need to be adapted for other platforms

* Create virtual environment, you will only need to do this once. In the project folder run:

```bash
virtualenv venv --python=3.5
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
python manage.py runserver
```




## Tests

The dynamic settings used by the application can be modified by changing the values in the app.cfg file in the parent directory.

#### Command line:

```
./project_tests.sh
```

## License

MIT Licensed. See [LICENSE](LICENSE)
