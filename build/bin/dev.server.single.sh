#!/bin/sh
BASEDIR=$(dirname $0)
PKG="$1"
shift
#shift removes first command line arg (the package name)
#so that we can pass $@ as the args to karma
$BASEDIR/_scope_command.sh $PKG "webpack-dev-server --config ../../webpack.config.js --inline --bundle-deps --demo $@"
