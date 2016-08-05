#!/bin/bash
source venv/bin/activate
pip install -r requirements.txt
ln -sfT settings.py settings_test.py
rm -rf build/junit.xml
python -m pytest --junitxml build/junit.xml dashboard/
