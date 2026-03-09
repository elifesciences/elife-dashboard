#!/bin/bash
set -ex

#elife-dashboard
#WARNING: this should be enabled and pulling credentials from somewhere!
hostname=$(hostname)
if [[ "$hostname" == "ci--ppp-dash.elifesciences.org" ]]; then
    hostname="ci-ppp-dash.elifesciences.org"
fi

auth_params=()
if [[ -f ~/dashboard-login.env ]]; then
    source ~/dashboard-login.env
    auth_params=(-u "$DASHBOARD_USER:$DASHBOARD_PASS")
fi

[ $(curl "${auth_params[@]}" --write-out %{http_code} --silent --output /dev/null https://$hostname/api/current) == 200 ]

# elife-article-scheduler
[ $(curl --write-out %{http_code} --silent --output /dev/null http://localhost:8080/schedule/ping) == 200 ]
