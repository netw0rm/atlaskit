#!/bin/bash
echo "Checking for testable changes..."
changed_files=$(git diff-tree --no-commit-id --name-only -r HEAD | grep -v ".md")
if [ "" == "$diff" ]; then
    echo "...no changes found that warrant testing. Done."
    exit 1
fi
