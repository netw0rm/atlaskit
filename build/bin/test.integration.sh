#!/usr/bin/env bash
set -e

WAITON_LOC="`npm bin`/wait-on"

npm run storybook& # runs in background
STORYBOOK_PID=$!
# give storybook 20 seconds, before checking every half second for a total of 2 minutes max if it is up
$WAITON_LOC -d 20000 -i 500 -t 120000 http-get://0.0.0.0:9001/
npm run test/integration/browserstack
kill $STORYBOOK_PID
