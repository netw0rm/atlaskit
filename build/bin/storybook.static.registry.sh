#!/usr/bin/env bash
set -e

BASEDIR=$(dirname $0)
PKG="$1"
# shift removes first command line arg (the package name)
shift || true

PKG=$($BASEDIR/_get_package_name.sh)
VERSION=$($BASEDIR/_get_package_version.sh)

pushd ../.. > /dev/null
CHALK="`yarn bin`/chalk"
popd > /dev/null

if [ -d "stories" ]; then
    $CHALK --no-stdin -t "{blue $PKG: Generating storybook}"
    cd ../..
    mkdir -p stories/$PKG/$VERSION
    yarn run storybook/static/single $PKG -- -o stories/$PKG/$VERSION
else
    $CHALK --no-stdin -t "{blue $PKG: Skipping storybook generation since no stories/ dir}"
fi
