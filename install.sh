#!/bin/bash
# installs the python dependencies for this project.
# see `install-js.sh` for the javascript dependencies.
set -e

. mkvenv.sh

source venv/bin/activate
pip install pip wheel --upgrade
pip install -r requirements.txt --no-color

if [ ! -e settings.py ]; then
    cp dashboard/dev_settings.py settings.py
fi
