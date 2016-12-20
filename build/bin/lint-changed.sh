#!/usr/bin/env bash
CHALK="`npm bin`/chalk"
BASEDIR=$(dirname $0)

function lint () {
    $CHALK --no-stdin -t "{blue Gathering files to lint...}"
    jsdiff=$($BASEDIR/_get_changed_js.sh)
    tsdiff=$($BASEDIR/_get_changed_ts.sh)
    if [ "" == "$jsdiff" ] && [ "" == "$tsdiff" ]; then
        $CHALK --no-stdin -t "{blue ...no changes found. Done.}"
        exit 0
    fi
    $CHALK --no-stdin -t "{blue linting...}"
    {
      eslint --format 'node_modules/eslint-friendly-formatter' --no-ignore $jsdiff &&
      tslint --project tsconfig.json --format stylish $tsdiff;
    }
    exit $?
}
lint

