#!/bin/bash
set -e

mkdir -p /root/.ssh/
touch /root/.ssh/known_hosts

ssh-keyscan -t rsa -H bitbucket.org >> /root/.ssh/known_hosts
ssh-keyscan -t rsa -H github.com >> /root/.ssh/known_hosts
