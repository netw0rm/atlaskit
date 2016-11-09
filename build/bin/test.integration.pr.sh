#!/usr/bin/env bash
set -e

function integration_build_status() {
  build_status \
    "INTGR" \
    "Integration" \
    "The integration tests for this pull request" \
    "$1" \
    ""
}

integration_build_status "INPROGRESS"
npm run test/integration || integration_build_status "FAILED"
integration_build_status "SUCCESSFUL"
