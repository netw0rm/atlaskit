#!/usr/bin/env bash
CHALK="`npm bin`/chalk"
BASEDIR=$(dirname $0)

function fix () {
    $CHALK --no-stdin -t "{blue Gathering files to fix...}"
    diff=$($BASEDIR/_get_changed.sh)
    if [ "" == "$diff" ]; then
        $CHALK --no-stdin -t "{blue ...no JS changes found. Done.}"
        exit 0
    fi
    $CHALK --no-stdin -t "{blue fixing...}"
    eslint --fix --no-ignore $diff
    exit $?
}
fix
