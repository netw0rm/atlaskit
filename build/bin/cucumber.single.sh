#!/bin/bash
set -e

BASEDIR=$(dirname $0)
PKG="$1"
# shift removes first command line arg (the package name)
shift || true
SCOPE="$PKG" docker-compose -f docker-compose-integration.yml up $@
