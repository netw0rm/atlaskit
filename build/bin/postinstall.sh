#!/usr/bin/env bash
set -e

BASEDIR=$(dirname $0)
LERNA_LOC="`npm bin`/lerna"
CHALK="`npm bin`/chalk"

$CHALK blue "Lerna bootstrap..."
$LERNA_LOC bootstrap

$CHALK blue "Installing hooks..."
node $BASEDIR/pre-commit.install.js
validate-commit-msg
