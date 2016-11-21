#!/usr/bin/env bash
set -e

karma \
start \
./build/karma/react/all.watch.js \
$@
