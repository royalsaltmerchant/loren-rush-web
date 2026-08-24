#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT_DIR="${1:-/tmp/loren-site-deploy}"

"$ROOT_DIR/scripts/prepare-deploy.sh" "$OUT_DIR"

netlify deploy --prod --dir="$OUT_DIR" --no-build
