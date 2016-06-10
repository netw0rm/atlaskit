#!/bin/sh
function lint () {
    echo "Gathering files to lint..."
    diff=$(git diff --cached --name-only --diff-filter=ACM | grep -E '(.js)$')
    if [ "" == "$diff" ]; then
        echo "...no JS changes found. Done."
        exit 0
    fi
    echo "linting..."
    eslint $diff
    exit $?
}
lint
