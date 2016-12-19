#!/usr/bin/env bash

function get_changed_ts () {
    diff=$(git diff --cached --name-only --diff-filter=ACM | grep -E '(\.tsx?)$')
    echo $diff
}
get_changed_ts
