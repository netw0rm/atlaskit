#!/bin/bash
set -e

BASEDIR=$(dirname $0)
PKG="$1"
# shift removes first command line arg (the package name)
shift || true

$BASEDIR/_scope_command.sh "$PKG" "../../build/bin/generate.readme.sh"
$BASEDIR/_scope_command.sh "$PKG" "webpack --config ../../webpack.config.production.js $@"
