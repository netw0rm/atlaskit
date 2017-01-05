#!/usr/bin/env bash
CHALK="`npm bin`/chalk"
BASEDIR=$(dirname $0)

function fix () {
    $CHALK --no-stdin -t "{blue Gathering files to fix...}"
    jsdiff=$($BASEDIR/_get_changed_js.sh)
    tsdiff=$($BASEDIR/_get_changed_ts.sh)
    if [ "" == "$jsdiff" ] && [ "" == "$tsdiff" ]; then
        $CHALK --no-stdin -t "{blue ...no changes found. Done.}"
        exit 0
    fi
    $CHALK --no-stdin -t "{blue fixing...}"

    # Run eslint and tslint in parallel for speed!

    if [ ! "" == "$jsdiff" ]; then
      eslint --fix --no-ignore $jsdiff &
      eslint_pid=$!
    fi

    if [ ! "" == "$tsdiff" ]; then
      tslint --project tsconfig.json --fix $tsdiff &
      tslint_pid=$!
    fi

    set -e

    if [ ! "" == "$jsdiff" ]; then
      wait $eslint_pid
    fi

    if [ ! "" == "$tsdiff" ]; then
      wait $tslint_pid
    fi
}
fix
