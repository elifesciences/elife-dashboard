#!/bin/bash
source install.sh > /dev/null
pylint -E *.py dashboard/*.py dashboard/test/*.py
python -m unittest discover --verbose --failfast --catch --start-directory dashboard/tests/ --pattern "*.py"
