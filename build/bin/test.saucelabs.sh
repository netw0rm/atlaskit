#!/bin/sh
set -e

BASEDIR=$(dirname $0)
SAUCELABS=1 $BASEDIR/test.sh
