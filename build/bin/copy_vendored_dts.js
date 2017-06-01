#!/usr/bin/env node

/* eslint-disable no-console */

const path = require('path');
const fs = require('fs-extra');
const glob = require('glob');

const dtsMatcher = path.join(process.cwd(), 'src/**/*.d.ts');

glob.sync(dtsMatcher).forEach((file) => {
  const umdPath = path.dirname(file).replace(/\/src\//, '/umd/types/');
  const umdFile = `${umdPath}/${path.basename(file)}`;
  fs.mkdirpSync(umdPath);
  fs.copySync(file, umdFile);
});

/* eslint-enable no-console */
