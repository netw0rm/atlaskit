#!/usr/bin/env bash
CHALK="`npm bin`/chalk"

function lint () {
    $CHALK blue "Gathering files to lint..."
    diff=$(git diff --cached --name-only --diff-filter=ACM | grep -E '(\.jsx?)$')
    if [ "" == "$diff" ]; then
        $CHALK blue "...no JS changes found. Done."
        exit 0
    fi
    $CHALK blue "linting..."
    eslint --format 'node_modules/eslint-friendly-formatter' --no-ignore $diff
    exit $?
}
lint
