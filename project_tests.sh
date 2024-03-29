#!/bin/bash
set -e
./install.sh
rm -rf build/junit.xml
source venv/bin/activate
./.lint.sh
python -m pytest --junitxml build/junit.xml dashboard/
# lsh@2022-04-01: added '--force' flag to ignore warnings until someone can fix the warnings.
# lsh@2022-08-22: added 'TZ=UTC' to force headless browser in to UTC. tests with naive datetimes now pass.
# broke when 'pickadate' upgraded to 3.5.6. change introduced in 3.5.5 (patch version)
TZ=UTC node_modules/.bin/grunt ci --force
