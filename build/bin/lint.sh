#!/usr/bin/env bash
set -e

export PATH="`yarn bin`:$PATH"
NODE_MODULES=`npm root`

chalk --no-stdin -t "{blue Start linting...}"

set +e

# Run eslint and tslint in parallel for speed!

eslint --color --format "$NODE_MODULES/eslint-friendly-formatter" . --ext .js --ext .jsx &
eslint_pid=$!

tslint --project tsconfig.json --format stylish &
tslint_pid=$!

wait $eslint_pid
eslint_exit=$?

wait $tslint_pid
tslint_exit=$?

# if either lint fails, return non-zero status to fail build
if [ "$eslint_exit" -ne "0" ] || [ "$tslint_exit" -ne "0" ]; then
  exit 1
fi
