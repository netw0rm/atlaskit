#!/usr/bin/env bash
set -e

pushd ../.. > /dev/null
CHALK="`npm bin`/chalk"
popd > /dev/null

PKG=$(node -e 'console.log(require("./package.json").name)')
PREFIX=$($CHALK --no-stdin -t "{white.bold [$PKG]}")
$CHALK --no-stdin -t "{blue {white.bold [$PKG]} Installing packages...}"
npm install --silent | sed "s/^/$PREFIX /"
