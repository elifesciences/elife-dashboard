#!/bin/bash
set -ex

# elife-dashboard
# WARNING: this should be enabled and pulling credentials from somewhere!
#[ $(curl --write-out %{http_code} --silent --output /dev/null https://$(hostname)/api/current) == 200 ]

# elife-dashboard2
#[ $(curl --write-out %{http_code} --silent --output /dev/null https://$(hostname):8081/api/current) == 200 ]

# elife-article-scheduler
[ $(curl --write-out %{http_code} --silent --output /dev/null http://localhost:8080/schedule/ping) == 200 ]
