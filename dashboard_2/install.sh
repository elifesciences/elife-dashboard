#!/bin/bash
set -e

python=/usr/bin/python3.5
py=${python##*/} # ll: python3.5

# check for exact version of python3
if [ ! -e "venv/bin/$py" ]; then
    echo "could not find venv/bin/$py, recreating venv"
    rm -rf venv
    $python -m venv venv
fi

source venv/bin/activate

pip install -r requirements.txt


