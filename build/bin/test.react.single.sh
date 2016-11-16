#!/usr/bin/env bash
set -e

BASEDIR=$(dirname $0)
. $BASEDIR/_mocha_react.sh

PKG="$1"
# shift removes first command line arg (the package name)
shift || true

mocha_react \
"$PKG" \ # Only the current package (currently assumes package name == folder name)
$@ # Pass on user arguments
