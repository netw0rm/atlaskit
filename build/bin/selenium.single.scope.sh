#!/usr/bin/env bash
set -e

BIN_PATH=$(yarn bin)
LERNA_LOC="$BIN_PATH/lerna"

PKG="$1"
$LERNA_LOC exec --scope "$PKG" -- ../../build/bin/selenium.single.sh
