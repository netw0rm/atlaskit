#!/usr/bin/env bash
set -e

BASEDIR=$(dirname $0)
LERNA_LOC="`npm bin`/lerna"

printf "\033[34m"
echo "Lerna bootstrap..."
printf "\033[0m"
$LERNA_LOC bootstrap

printf "\033[34m"
echo "Installing hooks..."
printf "\033[0m"
node $BASEDIR/pre-commit.install.js
validate-commit-msg
