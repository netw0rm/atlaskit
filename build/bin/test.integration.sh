#!/usr/bin/env bash
set -e

npm-run-all --race --parallel \
"storybook" \
"test/integration/browserstack/wait"
