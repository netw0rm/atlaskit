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

eslint --color --quiet --format  "$NODE_MODULES/eslint-friendly-formatter" . --ext .js &
eslint_js_pid=$!

eslint --color --quiet --format  "$NODE_MODULES/eslint-friendly-formatter" . --ext .jsx &
eslint_jsx_pid=$!

tslint --project tsconfig.json --format stylish &
tslint_pid=$!

wait $eslint_js_pid
eslint_js_exit=$?

wait $eslint_jsx_pid
eslint_jsx_exit=$?

wait $tslint_pid
tslint_exit=$?

if [ "$eslint_js_exit" == "0" ] && [ "$eslint_jsx_exit" == "0" ] && [ "$tslint_exit" == "0" ]; then
  lint_build_status "SUCCESSFUL"
else
  lint_build_status "FAILED"
fi
