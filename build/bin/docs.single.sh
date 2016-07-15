#!/bin/sh
set -e

BASEDIR=$(dirname $0)
PKG="$1"
# shift removes first command line arg (the package name)
shift || true

# Concatenate USAGE docs and JSDoc output
# Use a .tmp folder in the root directory because `lerna exec` only handles one command at a time
$BASEDIR/_scope_command.sh "$PKG" "mkdir -p ../../.tmp/"
$BASEDIR/_scope_command.sh "$PKG" "../../node_modules/.bin/jsdoc2md
--plugin dmd-bitbucket ak-dmd-plugin
--src ./src/index.js
--member-index-format list
--name-format" | sed 1,3d > ".tmp/API.md"
$BASEDIR/_scope_command.sh "$PKG" "cat ./docs/USAGE.md ../../.tmp/API.md" | sed 1,3d > ".tmp/README.md"
$BASEDIR/_scope_command.sh "$PKG" "mv ../../.tmp/README.md ./README.md"
$BASEDIR/_scope_command.sh "$PKG" "rm -rf ../../.tmp"
