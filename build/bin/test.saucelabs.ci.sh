#!/bin/sh
set -e
set -o pipefail

BASEDIR=$(dirname $0)
$BASEDIR/saucelabs.tunnel.start.sh
SAUCELABS_HAS_TUNNEL=1 $BASEDIR/test.saucelabs.sh
$BASEDIR/saucelabs.tunnel.stop.sh
