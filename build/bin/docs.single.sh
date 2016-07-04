#!/bin/sh
set -e

BASEDIR=$(dirname $0)
PKG="$1"
# shift removes first command line arg (the package name)
shift || true

# Concatenate USAGE docs and JSDoc output
$BASEDIR/_scope_command.sh "$PKG" "cat ./docs/USAGE.md ../../docs/COMPONENT.hbs" | sed 1,3d > "packages/$PKG/docs/build/README.hbs"
$BASEDIR/_scope_command.sh "$PKG" "../../node_modules/.bin/jsdoc2md --plugin dmd-bitbucket --template ./docs/build/README.hbs --src ./src/index.js" | sed 1,3d >  "./packages/$PKG/README.md"
