#!/usr/bin/env bash
set -e

BASEDIR=$(dirname $0)
PKG="$1"

ROOT=$(git rev-parse --show-toplevel)

if $ROOT/node_modules/.bin/in-publish; then
  $BASEDIR/_scope_command.sh "$PKG" "../../node_modules/.bin/babel src -Dd dist/es --no-babelrc --presets $ROOT/build/babel/modules.js"
  $BASEDIR/prepublish.single.sh $PKG
fi
