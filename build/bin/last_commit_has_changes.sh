#!/usr/bin/env bash
set -e

msha=$(git rev-list --merges HEAD~1..HEAD)
if [ "" != "$msha" ]; then
  # HEAD is a merge commit
  exit 0
fi

# Chalk can't be used here, as this script is run before npm install

printf "Checking for testable changes..."
changed_files=$(git diff-tree --no-commit-id --name-only -r HEAD | grep -v ".md")
if [ "" == "$changed_files" ]; then
    echo "no changes found that warrant testing. Done."
    exit 1
fi

author=$(git log -1 --pretty=%ae)
if [ "$BOT_ACCOUNT_EMAIL" == "$author" ]; then
    echo "commit was made by bot account. Done."
    exit 1
fi
