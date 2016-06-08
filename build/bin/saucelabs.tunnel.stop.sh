#!/bin/sh
set -e
set -o pipefail

kill -9 `cat /tmp/sc_client.pid`
