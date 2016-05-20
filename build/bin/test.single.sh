#!/bin/sh
BASEDIR=$(dirname $0)
$BASEDIR/_scope_command.sh $1 "karma start ../../karma.conf.js --single-run"
