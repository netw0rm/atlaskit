#!/bin/bash
set -e
set -o pipefail

BASEDIR=$(dirname $0)
PKG="$1"
# shift removes first command line arg (the package name)
shift || true
$BASEDIR/_scope_command.sh "$PKG" "webpack-dev-server --host 0.0.0.0 --config ../../webpack.config.js --no-info --colors --inline --bundle-deps --integration"
