#!/bin/bash
#set -x

# ./copyfrompatternportfolio.sh DASHBOARD
# ./copyfrompatternportfolio.sh ~/Projects/eLife/elife-monitoring-dashboard-frontend/

#DASHBOARD="~/Projects/eLife/elife-monitoring-dashboard-frontend/"
DASHBOARD=$1

cp -rp "$DASHBOARD/assets/libs/" assets/libs/
cp -rp "$DASHBOARD/source/css/" dashboard/static/css/
cp -rp "$DASHBOARD/source/images/" dashboard/static/images/
cp -rp "$DASHBOARD/source/fonts/" dashboard/static/fonts/
grunt