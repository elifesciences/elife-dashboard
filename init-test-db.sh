#!/bin/bash
# 2019-07-26: script may be redundant, but I need to run these before tests could pass
set -e
dropdb -U root elifemonitortest || echo "failed to drop database. It may not exist."
createdb -U root elifemonitortest
psql -U root elifemonitortest < dashboard/db/create_monitor_dashboard.sql
