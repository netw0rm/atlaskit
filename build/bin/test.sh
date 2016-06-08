#!/bin/sh
set -e
set -o pipefail

lerna exec -- karma start ../../karma.conf.js --single-run
