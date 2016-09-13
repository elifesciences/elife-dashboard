# [eLife Dashboard](https://github.com/elifesciences/elife-dashboard/)

This is the eLife Dashboard application and API.


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

* [Node](https://nodejs.org/en/)
* [Grunt](http://gruntjs.com/)
* [Pattern Library](https://github.com/digirati-co-uk/elife-monitoring-dashboard-frontend)
* [Live Reload](http://livereload.com/) - [Chrome plugin](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei) (optional)

## Quick Start

You can setup the application to run in one of two ways, with **test services** or **live data**.  
Both require the you setup the python application.

* Follow the [setup instructions](README.md) for the python dashboard, installing the relevant requirements file.
* Install all dependencies and build the assets ```npm install```
* To watch for updates in the assets ```grunt dev```.
* Run the application:
 * **Test services**
   * run ```grunt shell:serve_mock```
   * run ```grunt shell:serve``` (in separate windows.)
   * open ```/assets/js/main.js``` and add the following to enable debug mode
   ```sh     
    var options = {
        debug: true
    };
    var config = require('config')(options);
    ```
 * **Live services**
   * The live data setup requires additional credentials.
   * run ```grunt shell:serve```


## Aliases

|             Task             |                                            Description                                           |
|----------------------------|------------------------------------------------------------------------------------------------|
| ```grunt```                  | Builds all site assets                                                                           |
| ```grunt dev```              | Builds all site assets and watches for changes                                                   |
| ```grunt test```             | Run tests                                                                                        |
| ```grunt shell:serve_mock``` | Alias for test services python command ```source venv/bin/activate && python test_services.py``` |
| ```grunt shell:serve```      | Alias for run server python command ```source venv/bin/activate && python runserver.py```        |



## Tests

In order to run the tests simply run ```grunt test```.  
You can also view individual tests by running ```grunt browserify:test``` and opening the corresponding html file in ```/assets/test```


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
