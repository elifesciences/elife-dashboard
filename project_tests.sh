#!/bin/bash
./install.sh
ln -sf dashboard/dev_settings_test.py settings_test.py
rm -rf build/junit.xml
source venv/bin/activate
python -m pytest --junitxml build/junit.xml dashboard/
node_modules/.bin/grunt test
