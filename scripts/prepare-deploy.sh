#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT_DIR="${1:-/tmp/loren-site-deploy}"

rm -rf "$OUT_DIR"
mkdir -p "$OUT_DIR"

cp -R \
  "$ROOT_DIR/index.html" \
  "$ROOT_DIR/style.css" \
  "$ROOT_DIR/main.js" \
  "$ROOT_DIR/netlify.toml" \
  "$ROOT_DIR/assets" \
  "$ROOT_DIR/documents" \
  "$ROOT_DIR/media" \
  "$OUT_DIR/"

echo "Prepared deploy artifact at $OUT_DIR"
