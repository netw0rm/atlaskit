#!/usr/bin/env bash
set -e

BASEDIR=$(dirname $0)
PKG="$1"

ROOT=$(git rev-parse --show-toplevel)

# $ROOT/node_modules/.bin/in-publish && { $BASEDIR/_scope_command.sh "$PKG" "../../node_modules/.bin/babel src -Dd dist/es --no-babelrc --presets $ROOT/build/babel/modules.js"; } || $ROOT/node_modules/.bin/not-in-publish
# $ROOT/node_modules/.bin/in-publish && { $BASEDIR/prepublish.single.sh $PKG; } || $ROOT/node_modules/.bin/not-in-publish

# I've removed the inpublish checks from here and back to the package.jsons to see if that helps
$BASEDIR/_scope_command.sh "$PKG" "../../node_modules/.bin/babel src -Dd dist/es --no-babelrc --presets $ROOT/build/babel/modules.js"
$BASEDIR/prepublish.single.sh $PKG

