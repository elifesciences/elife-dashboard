#!/bin/bash
set -e # everything must succeed.
. mkvenv.sh
source venv/bin/activate
if [ -e requirements.lock ]; then
    # just delete the .lock file when you want to recreate it
    pip install -r requirements.lock
else
    pip install -r requirements.txt
    echo "locking..."
    pip freeze > requirements.lock
    echo "wrote 'requirements.lock'"
fi
NEW_RELIC_EXTENSIONS=false pip install --no-binary :all: newrelic==2.82.0.62
