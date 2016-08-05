#!/bin/bash
set -e

mkdir -p /root/.ssh/
touch /root/.ssh/known_hosts

ssh-keyscan -H bitbucket.org >> /root/.ssh/known_hosts
ssh-keyscan -H github.com >> /root/.ssh/known_hosts
