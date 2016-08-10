#!/bin/bash
function lint () {
    echo "Gathering files to lint..."
    diff=$(git diff --cached --name-only --diff-filter=ACM | grep -E '(\.jsx?)$')
    if [ "" == "$diff" ]; then
        echo "...no JS changes found. Done."
        exit 0
    fi
    echo "linting..."
    eslint --format 'node_modules/eslint-friendly-formatter' --no-ignore $diff
    exit $?
}
lint
