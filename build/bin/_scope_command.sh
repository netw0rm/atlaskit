#!/bin/sh
set -e

if [[ $# -eq 0 || "$1" == "" ]]
  then
    echo "No scope given"
    exit 1
fi

if [[ $# -eq 1 || "$1" == "" ]]
  then
    echo "No command given"
    exit 1
fi
package=$1
command=$2

lerna exec --scope $package -- $command
