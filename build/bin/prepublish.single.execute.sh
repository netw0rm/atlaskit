#!/usr/bin/env bash
set -e

BASEDIR=$(dirname $0)

$BASEDIR/generate.readme.sh
printf "\033[34m"
echo "Generating UMD bundle..."
printf "\033[0m"
webpack --config ../../build/webpack/production.js $@
printf "\033[34m"
echo "Generating CJS bundle..."
printf "\033[0m"
webpack --config ../../build/webpack/production-cjs.js $@
printf "\033[34m"
echo "Generating bundle with dependencies..."
printf "\033[0m"
webpack --config ../../build/webpack/production-with-deps.js $@
