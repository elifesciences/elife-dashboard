#!/bin/bash
set -ex

# elife-article-scheduler
[ $(curl --write-out %{http_code} --silent --output /dev/null http://localhost:8080) == 200 ]
