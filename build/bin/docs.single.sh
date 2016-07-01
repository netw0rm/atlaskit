#!/bin/sh
set -e

BASEDIR=$(dirname $0)
PKG="$1"
# shift removes first command line arg (the package name)
shift || true
./node_modules/.bin/jsdoc2md --plugin dmd-bitbucket --src "./packages/$PKG/src/index.js" > "./packages/$PKG/README.md"
git add "./packages/$PKG/README.md"
