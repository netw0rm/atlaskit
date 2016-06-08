#!/bin/sh
set -e
set -o pipefail

BASEDIR=$(dirname $0)
PKG="$1"
# shift removes first command line arg (the package name)
shift || true
$BASEDIR/_scope_command.sh "$PKG" "karma start ../../karma.conf.js $@"
