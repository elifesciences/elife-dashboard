#!/bin/bash
#set -x

# ./copytopatternportfolio.sh DASHBOARD
# ./copytopatternportfolio.sh ~/Projects/eLife/elife-monitoring-dashboard-frontend/

#DASHBOARD="~/Projects/eLife/elife-monitoring-dashboard-frontend/"
DASHBOARD=$1

cp -rp assets/libs/ "$DASHBOARD/assets/libs/"
grunt