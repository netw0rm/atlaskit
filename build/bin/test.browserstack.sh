#!/usr/bin/env bash
set -e

HEAD_SHA=$(git rev-parse HEAD | cut -c1-6)
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

# Run the Browserstack tests
HEAD_SHA=$HEAD_SHA CURRENT_BRANCH="$CURRENT_BRANCH" BROWSERSTACK=1 build/bin/test.sh
