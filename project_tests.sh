#!/bin/bash
set -e
./install.sh
ln -sf dashboard/dev_settings_test.py settings_test.py
rm -rf build/junit.xml
source venv/bin/activate
python -m pytest --junitxml build/junit.xml dashboard/
# lsh@2022-04-01: added '--force' flag to ignore warnings until someone can fix the warnings.
node_modules/.bin/grunt ci --force
