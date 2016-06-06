#!/bin/sh
BASEDIR=$(dirname $0)
PKG="$1"
# shift removes first command line arg (the package name)
shift
$BASEDIR/_scope_command.sh $PKG "karma start ../../karma.conf.js --single-run $@"
