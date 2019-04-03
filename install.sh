#!/bin/bash
set -e # everything must succeed.
if [ ! -d venv ]; then
    virtualenv --python=`which python2` venv
fi
source venv/bin/activate
pip install -r requirements.txt
NEW_RELIC_EXTENSIONS=false pip install --no-binary :all: newrelic==2.82.0.62
