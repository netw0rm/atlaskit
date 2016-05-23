#!/bin/sh
BASEDIR=$(dirname $0)
$BASEDIR/_scope_command.sh $1 "webpack --config ../../webpack.config.js --min"
