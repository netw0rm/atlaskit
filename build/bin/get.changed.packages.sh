#!/usr/bin/env bash
set -e

# This script creates a file with a list of all the packages that have changed between the current
# branch and origin/master. We write to a file so that commands running in parallel don't try to
# run git commands at the same time

BASEDIR=$(dirname $0)
$BASEDIR/_get_changed_packages.js > changed-packages