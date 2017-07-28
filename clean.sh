#!/bin/bash
set -e
source venv/bin/activate

python -c "from dashboard.models import articles; articles.clean();"
