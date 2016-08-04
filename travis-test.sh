#!/bin/bash
CONFIG_FILE="test" python -m unittest discover -s dashboard/tests -p '*_tests.py'
