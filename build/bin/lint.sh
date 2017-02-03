#!/usr/bin/env bash
set -e

export PATH="`yarn bin`:$PATH"
NODE_MODULES=`npm root`

chalk --no-stdin -t "{blue Start linting...}"

# Run eslint and tslint in parallel for speed!

eslint --color --format "$NODE_MODULES/eslint-friendly-formatter" . --ext .js --ext .jsx &
eslint_pid=$!

tslint --project tsconfig.json --format stylish &
tslint_pid=$!

wait $eslint_pid
wait $tslint_pid
