#!/bin/bash
set -e # everything must succeed.

. mkvenv.sh

source venv/bin/activate
pip install pip wheel --upgrade
pip install -r requirements.txt
NEW_RELIC_EXTENSIONS=false pip install --no-binary :all: newrelic==2.82.0.62
