#!/usr/bin/env bash
set -e

pushd ../.. > /dev/null
BASEDIR=$(dirname $0)
popd > /dev/null

PKG=$($BASEDIR/_get_package_name.sh)

npm link
pushd ../.. > /dev/null
npm link $PKG
popd > /dev/null
