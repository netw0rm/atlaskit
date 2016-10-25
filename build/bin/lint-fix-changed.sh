#!/usr/bin/env bash
CHALK="`npm bin`/chalk"

function fix () {
    $CHALK --no-stdin -t "{blue Gathering files to fix...}"
    diff=$(git diff --cached --name-only --diff-filter=ACM | grep -E '(\.jsx?)$')
    if [ "" == "$diff" ]; then
        $CHALK --no-stdin -t "{blue ...no JS changes found. Done.}"
        exit 0
    fi
    $CHALK --no-stdin -t "{blue fixing...}"
    eslint --fix --no-ignore $diff
    exit $?
}
fix
