#!/usr/bin/env bash
set -e

CURRENT_SHA=$(git rev-parse HEAD)

# DEBUG=echo
$DEBUG rm -rf .git
$DEBUG git init
$DEBUG git clean -dfx
$DEBUG git config credential.helper store
$DEBUG echo "https://$BITBUCKET_USER:$BITBUCKET_PASSWORD@bitbucket.org" > ~/.git-credentials
$DEBUG git remote add origin "https://bitbucket.org/atlassian/atlaskit.git"
$DEBUG git fetch origin
$DEBUG git reset $CURRENT_SHA --hard
$DEBUG git branch --set-upstream-to origin/$BITBUCKET_BRANCH
$DEBUG git config --global user.email "$BOT_ACCOUNT_EMAIL"
$DEBUG git config --global user.name "$BOT_ACCOUNT_NAME"
$DEBUG git config --global push.default simple
$DEBUG git fetch --tags
$DEBUG git fsck --full

$DEBUG npm set //registry.npmjs.org/:_authToken=$NPM_TOKEN

$DEBUG npm install -g lerna-semantic-release@8.0.2
