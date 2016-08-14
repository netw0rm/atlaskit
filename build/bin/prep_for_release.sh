#!/usr/bin/env bash
set -e

# DEBUG=echo
$DEBUG git config credential.helper store
$DEBUG echo "https://$BITBUCKET_USER:$BITBUCKET_PASSWORD@bitbucket.org" > ~/.git-credentials
$DEBUG git remote set-url origin "https://bitbucket.org/atlassian/atlaskit.git"
$DEBUG git branch --set-upstream-to origin/$BITBUCKET_BRANCH
$DEBUG git config --global user.email 'aui-team@atlassian.com'
$DEBUG git config --global user.name 'AUI team account'
$DEBUG git config --global push.default simple
$DEBUG git fetch --unshallow
$DEBUG git fetch --tags
$DEBUG git tag --list #debug
$DEBUG npm set //registry.npmjs.org/:_authToken=$NPM_TOKEN
