#!/usr/bin/env bash
set -e

BASEDIR=$(dirname $0)

printf "\033[34m"
echo "Removing old symlinks..."
printf "\033[0m"
find $BASEDIR/../.. -maxdepth 2 -lname \"*\" -exec rm -v {} \;
