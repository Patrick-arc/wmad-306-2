#!/usr/bin/env bash
set -euo pipefail
# Helper to enter the web container shell. Uses legacy `docker-compose` if available,
# otherwise falls back to `docker compose` (newer Docker CLI).
if command -v docker-compose >/dev/null 2>&1; then
  docker-compose exec web bash
else
  docker compose exec web bash
fi
