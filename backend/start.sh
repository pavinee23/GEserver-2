#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# GEserver Backend — Production Startup Script
# Usage: bash backend/start.sh
# ---------------------------------------------------------------------------
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"

# Load .env from project root
if [[ -f "$ROOT_DIR/.env" ]]; then
  set -a
  # shellcheck disable=SC1091
  source "$ROOT_DIR/.env"
  set +a
fi

HOST="${HOST:-0.0.0.0}"
PORT="${PORT:-8000}"
WORKERS="${GUNICORN_WORKERS:-3}"
LOG_LEVEL="${LOG_LEVEL:-info}"

cd "$ROOT_DIR"

exec gunicorn backend.app:application \
  --bind "${HOST}:${PORT}" \
  --workers "$WORKERS" \
  --worker-class sync \
  --timeout 60 \
  --access-logfile - \
  --error-logfile - \
  --log-level "$LOG_LEVEL"
