#!/bin/bash
msha=$(git rev-list --merges HEAD~1..HEAD)
if [ "" != "$msha" ]; then
  # HEAD is a merge commit
  exit 0
fi

echo "Checking for testable changes..."
changed_files=$(git diff-tree --no-commit-id --name-only -r HEAD | grep -v ".md")
if [ "" == "$changed_files" ]; then
    echo "...no changes found that warrant testing. Done."
    exit 1
fi
