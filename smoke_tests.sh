#!/bin/bash
set -ex

[ $(curl --write-out %{http_code} --silent --output /dev/null https://$(hostname):8081/api/current) == 200 ]
