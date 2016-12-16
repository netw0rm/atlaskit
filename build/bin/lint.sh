#!/usr/bin/env bash
set -e

export PATH="`npm bin`:$PATH"
NODE_MODULES=`npm root`
BASEDIR=$(dirname $0)
. $BASEDIR/_build_status.sh

function lint_build_status() {
  build_status \
    "LINT" \
    "Lint" \
    "The linting result for this pull request" \
    "$1" \
    ""
}

chalk --no-stdin -t "{blue Start linting...}"
lint_build_status "INPROGRESS"

set +e
(eslint \
  --color \
  --format \
  "$NODE_MODULES/eslint-friendly-formatter" \
  . \
  --ext .js,.jsx\
&& tslint --project tsconfig.json --format stylish\
&& lint_build_status "SUCCESSFUL") \
|| lint_build_status "FAILED"
