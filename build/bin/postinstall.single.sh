#!/usr/bin/env bash
set -e

pushd ../.. > /dev/null
CHALK="`yarn bin`/chalk"
popd > /dev/null

PKG=$(node -e 'console.log(require("./package.json").name)')
export FORCE_COLOR=1
PREFIX=$($CHALK --no-stdin -t "{white.bold [$PKG]}")
$CHALK --no-stdin -t "{blue $PREFIX Installing packages...}"
yarn install --no-progress | sed "s/^/$PREFIX /"
