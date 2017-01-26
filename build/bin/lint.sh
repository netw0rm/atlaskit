#!/usr/bin/env bash
set -e

export PATH="`yarn bin`:$PATH"
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

# Run eslint and tslint in parallel for speed!

eslint --color --format "$NODE_MODULES/eslint-friendly-formatter" . --ext .js --ext .jsx &
eslint_pid=$!

tslint --project tsconfig.json --format stylish &
tslint_pid=$!

wait $eslint_pid
eslint_exit=$?

wait $tslint_pid
tslint_exit=$?

if [ "$eslint_exit" == "0" ] && [ "$tslint_exit" == "0" ]; then
  lint_build_status "SUCCESSFUL"
else
  lint_build_status "FAILED"
fi
