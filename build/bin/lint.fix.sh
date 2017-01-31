#!/usr/bin/env bash
set -e

export PATH="`yarn bin`:$PATH"
NODE_MODULES=`npm root`

set +e

# Run eslint and tslint in parallel for speed!

eslint --color --format "$NODE_MODULES/eslint-friendly-formatter" . --ext .js --ext .jsx --fix &
eslint_pid=$!

tslint --project tsconfig.json --format stylish --fix &
tslint_pid=$!

wait $eslint_pid
eslint_exit=$?

wait $tslint_pid
tslint_exit=$?

if [ "$eslint_exit" == "0" ] && [ "$tslint_exit" == "0" ]; then
  exit 0
else
  exit 1
fi
