#!/bin/bash
set -e

source ../venv_3.5/bin/activate
python -m pytest --junitxml=build/pytest.xml
