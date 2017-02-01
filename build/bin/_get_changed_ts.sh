#!/usr/bin/env bash

function get_changed_ts () {
    # Exclude .d.ts as they're implicitly excluded by TSLint when --project is passed. We
    # need to explicitly avoid them here otherwise users complain of problems "that only occur during
    # validate/lint-changed".
    diff=$(git diff --cached --name-only --diff-filter=ACM | grep -v -e '\.d\.ts$' | grep -e '\.tsx\?$')
    echo $diff
}
get_changed_ts
