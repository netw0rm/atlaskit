#!/usr/bin/env bash
CHALK="`npm bin`/chalk"
BASEDIR=$(dirname $0)

function lint () {
    $CHALK --no-stdin -t "{blue Gathering files to lint...}"
    diff=$($BASEDIR/_get_changed.sh)
    if [ "" == "$diff" ]; then
        $CHALK --no-stdin -t "{blue ...no JS changes found. Done.}"
        exit 0
    fi
    $CHALK --no-stdin -t "{blue linting...}"
    eslint --format 'node_modules/eslint-friendly-formatter' --no-ignore $diff
    exit $?
}
lint
