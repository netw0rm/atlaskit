#!/usr/bin/env bash
set -e

BASEDIR=$(dirname $0)
. $BASEDIR/_build_status.sh

function integration_build_status() {
  build_status \
    "INTGR" \
    "Integration" \
    "The integration tests for this pull request" \
    "$1" \
    ""
}

integration_build_status "INPROGRESS"
(yarn run test/integration && integration_build_status "SUCCESSFUL") || (integration_build_status "FAILED" && exit 1)
