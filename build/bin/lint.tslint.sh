#!/usr/bin/env bash
set -e
export PATH="`yarn bin`:$PATH"
ROOT=$(dirname $0)/../..

chalk --no-stdin -t "{blue TSLinting files…}"
tslint -c $ROOT/build/tslint/base.json $@ \
  $ROOT'/packages/*/src/**/*.{ts,tsx,d.ts}' \
  $ROOT'/packages/*/stories/**/*.{ts,tsx,d.ts}' \
  $ROOT'/packages/*/*.{ts,tsx,d.ts}'
