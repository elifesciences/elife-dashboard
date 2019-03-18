#!/bin/bash
set -ex

# elife-dashboard
[ $(curl --write-out %{http_code} --silent --output /dev/null https://$(hostname):8081/api/current) == 200 ]

# elife-article-scheduler
[ $(curl --write-out %{http_code} --silent --output /dev/null http://localhost:8080/schedule/ping) == 200 ]
