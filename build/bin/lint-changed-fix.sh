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
    [ ! "" == "$jsdiff" ] && eslint --fix --no-ignore $jsdiff || [ "" == "$jsdiff" ]
    jsfixresult=$?
    [ ! "" == "$tsdiff" ] && tslint --project tsconfig.json --fix $tsdiff || [ "" == "$tsdiff" ]
    tsfixresult=$?
    [ "$jsfixresult" == "0" ] && [ "$tsfixresult" == "0" ]
    exit $?
}
fix
