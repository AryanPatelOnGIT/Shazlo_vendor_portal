#!/bin/bash
# Runs once, when the postgres-data volume is first created.
# One database per service, plus a *_test database for each.
set -euo pipefail

for db in identity identity_test vendor vendor_test; do
  psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname postgres \
    -c "CREATE DATABASE $db"
done
