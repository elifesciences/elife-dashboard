# [eLife Dashboard](https://github.com/elifesciences/elife-dashboard/)

This is the eLife Dashboard application and API.

This document covers the setup of the application from a front end perspective and explains how to run the application with no third party dependencies and mocked data. If this is not what you require please consult the main [readme](README.md).

You can setup the application to run in one of two ways:  

 * **mocked services** which requires no dependencies, [quick start mocked services](#quick-start-mocked-services) for this method
 * **development** requires additional third party credentials and a more involved setup, please refer to the main [readme](README.md). You may want to run `grunt` to ensure you have the correct site assets.

## Table of Contents


* [Requirements](#requirements)
* [Quick start mocked services](#quick-start)
* [Aliases](#aliases)
* [Tests](#tests)
* [Documentation](#documentation)
* [Maintaining Dashboard and Pattern Library](#maintaining-dashboard-and-pattern-library)
* [License](#license)



## Requirements:

These requirements are for the front end only, additional requirements can be found on the dashboard [setup instructions](README.md).

* [Python](https://www.python.org/)
* [Node](https://nodejs.org/en/) 
  * v7.0.0
  * [avn](https://github.com/wbyoung/avn) Automatic Version Switching for Node (optional but recommended)
* [Grunt](http://gruntjs.com/)
  * ```npm install -g grunt grunt-cli```
* [Pattern Library](https://github.com/digirati-co-uk/elife-monitoring-dashboard-frontend)
* [Live Reload](http://livereload.com/) - [Chrome plugin](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei) (optional)

## Quick start mocked services

* In the root of the project folder create your virtual environment and activate it. This step will only need to be done once, the [aliases](#aliases) will do this for you in the future.

```bash
virtualenv venv
source venv/bin/activate
```  
  
* Install the dependencies.

```bash
pip install -r service-test-requirements.txt
```

* Install all dependencies and build the assets 

```bash
npm install
```

* If you wish to enable watch and live reload

```bash
grunt dev
```

* To serve the application, if you are running ```grunt dev``` you will need to run this in a new shell window

```bash
grunt shell:mocked_services
```


## Aliases

|             Task             |                                            Description                                           |
|----------------------------|------------------------------------------------------------------------------------------------|
| ```grunt```                  | Builds all site assets                                                                           |
| ```grunt dev```              | Builds all site assets and watches for changes                                                   |
| ```grunt test```             | Run tests                                                                                        |
| ```grunt shell:mocked_services``` | Alias for test services python command ```source venv/bin/activate && python mocked_services.py``` |
| ```grunt shell:serve```      | Alias for run server python command ```source venv/bin/activate && python runserver.py```        |



## Tests

```bash
grunt test
```

You can view individual tests in the browser by opening the corresponding html file in ```/assets/test``` and running 

```bash 
grunt browserify:test
```


## Documentation


The front end workflow for the eLife dashboard is comprised of three parts.

1. [UX Pin](https://live.uxpin.com/593d5793b51645bc5dfb5a0a5ab7629065ef1743#/pages/22041535/sitemap): defines the UX and interactions
1. [Pattern Library](https://github.com/digirati-co-uk/elife-monitoring-dashboard-frontend): the front end code describing the UI (but not to include any behaviour)
1. [This dashboard](https://github.com/elifesciences/elife-dashboard): the actual implementation of the front end functionality using the patterns from PatternLab.


**Develop new features in the [Dashboard](https://github.com/elifesciences/elife-dashboard).**  
The task will not be considered complete until any UI changes and all updated javascript has been copied back into the [Pattern Library](https://github.com/digirati-co-uk/elife-monitoring-dashboard-frontend) using the script provided in the [Pattern Library](https://github.com/digirati-co-uk/elife-monitoring-dashboard-frontend/blob/master/copyfromdashboard.sh).

## Maintaining Dashboard and Pattern Library
Copying [Dashboard](https://github.com/elifesciences/elife-dashboard) back into the [Pattern Library](https://github.com/digirati-co-uk/elife-monitoring-dashboard-frontend)

 ```sh
 bash -x copyfromdashboard.sh ~/Projects/eLife/elife-dashboard
 ```


## License

MIT Licensed. See [LICENSE](LICENSE)
