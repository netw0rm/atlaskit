#!/usr/bin/env bash
set -e

pushd ../.. > /dev/null
CHALK="`npm bin`/chalk"
popd > /dev/null

PKG=$(node -e 'console.log(require("./package.json").name)')
export FORCE_COLOR=1
PREFIX=$($CHALK --no-stdin -t "{white.bold [$PKG]}")
$CHALK --no-stdin -t "{blue $PREFIX Installing packages...}"
npm install --no-progress --silent | sed "s/^/$PREFIX /"
