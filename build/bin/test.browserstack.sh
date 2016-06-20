#!/bin/sh
set -e

BASEDIR=$(dirname $0)
BROWSERSTACK=1 $BASEDIR/test.sh
