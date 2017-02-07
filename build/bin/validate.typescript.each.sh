#!/usr/bin/env bash
set -e
export PATH="`yarn bin`:$PATH"
NAME=$(basename $(pwd))

if [ -f tsconfig.json ]; then
  chalk --no-stdin -t "{yellow > {white $NAME}}"
  tsc -p . --noEmit
fi
