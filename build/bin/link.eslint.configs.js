#!/usr/bin/env node

const { exec, pushd, popd } = require('shelljs');

['ak-base', 'ak-cucumber', 'ak-stories', 'ak-tests'].forEach((config) => {
  const packageName = `eslint-config-${config}`;
  pushd(`packages/${packageName}`);
  exec('yarn link');
  popd();
  exec(`yarn link ${packageName}`);
});
