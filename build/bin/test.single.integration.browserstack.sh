#!/bin/bash
set -e

BASEDIR=$(dirname $0)
PKG="$1"
# shift removes first command line arg (the package name)
shift || true
BROWSERSTACK=1 PKG=$PKG BASE_URL="http://localhost:9001" $BASEDIR/_scope_command.sh "$PKG" "protractor ../../protractor.conf.js $@"
