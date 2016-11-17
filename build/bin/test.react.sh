#!/usr/bin/env bash
set -e

BASEDIR=$(dirname $0)
. $BASEDIR/_mocha_react.sh

 # All packages
mocha_react \
"**" \
$@
