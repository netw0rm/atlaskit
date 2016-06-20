#!/bin/sh
set -e

BASEDIR=$(dirname $0)
$BASEDIR/browserstack.tunnel.start.sh
BROWSERSTACK_HAS_TUNNEL=1 $BASEDIR/test.browserstack.sh
$BASEDIR/browserstack.tunnel.stop.sh
