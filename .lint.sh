#!/bin/bash
set -e
pylint -E *.py dashboard/*.py dashboard/tests/*.py
