#!/usr/bin/env bash
set -e

BASEDIR=$(dirname $0)
PKG="$1"
# shift removes first command line arg (the package name)
shift || true

PKG=$($BASEDIR/_get_package_name.sh)
VERSION=$($BASEDIR/_get_package_version.sh)

if [ -d "stories" ]; then
    echo "$PKG: Generating storybook"
    cd ../..
    mkdir -p stories/$PKG/$VERSION
    npm run storybook/static/single $PKG -- -o stories/$PKG/$VERSION
else
    echo "$PKG: Skipping storybook generation since no stories/ dir"
fi
