#!/usr/bin/env bash
set -e

PORT="$1"
PKG=$(../../build/bin/_get_package_name.sh)

cd ../..
./build/bin/_selenium.local.js $PKG
