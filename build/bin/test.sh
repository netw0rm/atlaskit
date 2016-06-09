#!/bin/sh
set -e

lerna exec -- karma start ../../karma.conf.js --single-run
