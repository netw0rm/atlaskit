#!/bin/sh
set -e

BROWSERSTACK=1 lerna exec --concurrency 1 -- karma start ../../karma.conf.js --single-run
