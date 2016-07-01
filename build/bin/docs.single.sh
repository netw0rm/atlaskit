#!/bin/sh
set -e

BASEDIR=$(dirname $0)
PKG="$1"
# shift removes first command line arg (the package name)
shift || true
./node_modules/.bin/jsdoc2md "./packages/$PKG/src/index.js" > "./packages/$PKG/API.md"
