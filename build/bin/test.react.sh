#!/usr/bin/env bash
set -e

BASEDIR=$(dirname $0)
. $BASEDIR/_mocha_react.sh

mocha_react \
"**" \ # All packages
$@ # Pass on user arguments
