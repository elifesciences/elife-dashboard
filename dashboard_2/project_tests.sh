#!/bin/bash
set -e

source ../venv_3.5/bin/activate

pip install proofreader==0.0.4

python -m proofreader articles/ dashboard/

python -m pytest --junitxml=build/pytest.xml


