#!/bin/bash
set -e

SAUCE_VERSION=4.3.15
wget https://saucelabs.com/downloads/sc-$SAUCE_VERSION-linux.tar.gz -nv -O - | tar -xz
PATH=./sc-$SAUCE_VERSION-linux/bin:$PATH
truncate -s 0 /tmp/sc.log
rm -f /tmp/sc.ready
sc --user $SAUCE_USERNAME --api-key $SAUCE_ACCESS_KEY --daemonize --readyfile /tmp/sc.ready

tail -f /tmp/sc.log | while read LOGLINE
do
  echo $LOGLINE
  [[ "${LOGLINE}" == *"Sauce Connect is up, you may start your tests"* ]] && pkill -P $$ tail
done
