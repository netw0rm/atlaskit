#!/usr/bin/env bash
set -e

LERNA_LOC="`npm bin`/lerna"
CHALK="`npm bin`/chalk"

if [[ $# -eq 0 || "$1" == "" ]]
  then
    $CHALK red "No scope given"
    exit 1
fi

if [[ $# -eq 1 || "$1" == "" ]]
  then
    $CHALK red "No command given"
    exit 1
fi
package=$1
command=$2

$LERNA_LOC exec --scope $package -- $command
