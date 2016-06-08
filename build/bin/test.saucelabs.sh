#!/bin/sh
set -e
set -o pipefail

BASEDIR=$(dirname $0)
SAUCELABS=1 $BASEDIR/test.sh
