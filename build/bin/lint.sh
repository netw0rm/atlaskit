#!/usr/bin/env bash
set -e

NODE_MODULES=`npm root`
CHALK="`npm bin`/chalk"
GITHEAD_SHORT=$(git rev-parse --short HEAD)
BUILD_KEY="DOCS-$GITHEAD_SHORT"
BUILD_NAME="Docs"
BUILD_DESCRIPTION="The docs for this pull request"


function build_status () {
  if [[ -n "$BITBUCKET_COMMIT" ]]; then
    $CHALK --no-stdin -t "{blue Post build in '$1' status}"

    bbuild \
    --commit "$BITBUCKET_COMMIT" \
    --repo "$BITBUCKET_REPO_SLUG" \
    --owner "$BITBUCKET_REPO_OWNER" \
    --username "$BITBUCKET_USER" \
    --password "$BITBUCKET_PASSWORD" \
    --key "$BUILD_KEY" \
    --name "$BUILD_NAME" \
    --description "$BUILD_DESCRIPTION" \
    --state "$1"
  fi
}

build_status "INPROGRESS"

$CHALK --no-stdin -t "{blue Start linting...}"

set +e
(eslint --color --format "$NODE_MODULES/eslint-friendly-formatter" . --ext .js,.jsx \
&& build_status "SUCCESSFUL") \
|| build_status "FAILED"
