#!/bin/bash
source venv/bin/activate
pip install -r requirements.txt
ln -sf dashboard/dev_settings_test.py settings_test.py
rm -rf build/junit.xml
CONFIG_FILE="test" python -m pytest --junitxml build/junit.xml dashboard/
