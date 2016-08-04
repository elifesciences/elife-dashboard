#!/bin/bash
set -e # everything must succeed.
pip install -r requirements.txt
ln -sfT dashboard/dev_settings_test.py settings_test.py
