# [eLife Dashboard](https://github.com/elifesciences/elife-dashboard/)

This is the eLife Dashboard application and API.

This document covers the setup of the application from a front end perspective and explains how to run the application 
with no third party dependencies and mocked data.

You can setup the application to run in one of two ways:  

 * **mocked** which requires no dependencies, skip to [quick start](#quick-start) for this method
 * **development** requires additional third party credentials and a more involved setup, please refer to the main [readme](README.md).

## Table of Contents

* [Requirements](#requirements)
* [Quick start](#quick-start)
* [Aliases](#aliases)
* [Tests](#tests)
* [Documentation](#documentation)
* [Maintaining Dashboard and Pattern Library](#maintaining-dashboard-and-pattern-library)
* [License](#license)

## Requirements:

These requirements are for the front end only, additional requirements can be found on the dashboard [setup instructions](README.md).

* [Python](https://www.python.org/)
* [Node](https://nodejs.org/en/)
* [Grunt](http://gruntjs.com/)
* [Pattern Library](https://github.com/digirati-co-uk/elife-monitoring-dashboard-frontend)
* [Live Reload](http://livereload.com/) - [Chrome plugin](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei) (optional)

## Quick Start

In the root of the project folder create the Python virtual environment (venv), activate it and install the Python dependencies.

    ./install.sh

Install all dependencies and build the assets:

    ./install-js.sh

If you wish to enable watch and live reload:

    grunt dev

To serve the application, if you are running `grunt dev` you will need to run this in a new shell window:

    grunt shell:mocked_services

## Aliases

|             Task             |                                            Description                                           |
|----------------------------|------------------------------------------------------------------------------------------------|
| ```grunt```                  | Builds all site assets                                                                           |
| ```grunt dev```              | Builds all site assets and watches for changes                                                   |
| ```grunt test```             | Run tests                                                                                        |
| ```grunt shell:mocked_services``` | Alias for test services python command ```source venv/bin/activate && python mocked_services.py``` |
| ```grunt shell:serve```      | Alias for run server python command ```source venv/bin/activate && python runserver.py```        |


## Tests

    grunt test

You can view individual tests in the browser by opening the corresponding html file in ```/assets/test``` and running 

    grunt browserify:test

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
