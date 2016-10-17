#!/usr/bin/env bash
set -e

karma start ./build/karma/all.js --single-run --no-auto-watch --reporters=dots $@
