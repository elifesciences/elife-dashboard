#!/bin/bash
# installs the javascript dependencies

set -e
# clean install node.js deps
if [ -e package-lock.json ]; then
    rm -rf node_modules
    npm install
fi
