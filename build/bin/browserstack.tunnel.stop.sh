#!/usr/bin/env bash
set -e

/BrowserStackLocal --key $BROWSERSTACK_KEY --local-identifier $BITBUCKET_COMMIT --daemon stop
