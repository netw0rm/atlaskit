#!/usr/bin/env node

const { exec, pushd, popd } = require('shelljs');

['base', 'stories', 'tests'].forEach((config) => {
  const packageName = `eslint-config-${config}`;
  pushd(`packages/${packageName}`);
  exec('yarn link');
  popd();
  exec(`yarn link @atlaskit/${packageName}`);
});
