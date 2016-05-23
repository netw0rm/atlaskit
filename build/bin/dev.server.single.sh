#!/bin/sh
BASEDIR=$(dirname $0)
$BASEDIR/_scope_command.sh $1 "webpack-dev-server --config ../../webpack.config.js --bundle-deps"
