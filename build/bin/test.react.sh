#!/usr/bin/env bash
set -e

node --max_old_space_size=4092 \
./node_modules/.bin/karma \
start \
./build/karma/react/all.js \
$@
