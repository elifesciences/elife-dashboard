#!/bin/bash
set -e
source venv/bin/activate
exec python process_dashboard_queue.py
