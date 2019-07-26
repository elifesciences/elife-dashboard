#!/bin/bash
set -e
./install.sh
./init-test-db.sh
source venv/bin/activate
ln -sf dashboard/dev_settings_test.py settings_test.py
rm -rf build/junit.xml
python -m pytest --junitxml build/junit.xml dashboard/
pylint -E *.py dashboard/*.py dashboard/tests/*.py
