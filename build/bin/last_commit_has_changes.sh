#!/usr/bin/env bash
msha=$(git rev-list --merges HEAD~1..HEAD)
if [ "" != "$msha" ]; then
  # HEAD is a merge commit
  exit 0
fi

CHALK="`npm bin`/chalk"

$CHALK blue "Checking for testable changes..."
changed_files=$(git diff-tree --no-commit-id --name-only -r HEAD | grep -v ".md")
if [ "" == "$changed_files" ]; then
    $CHALK blue "...no changes found that warrant testing. Done."
    exit 1
fi

author=$(git log -1 --pretty=%ae)
if [ "$BOT_ACCOUNT_EMAIL" == "$author" ]; then
    $CHALK blue "...commit was made by bot account. Done."
    exit 1
fi
