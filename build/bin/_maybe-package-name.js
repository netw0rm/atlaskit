#!/usr/bin/env node

const path = require('path');
const getConfigRoot = require('../config/_getConfigRoot');

const configRoot = getConfigRoot(process.cwd());

if (configRoot.indexOf('/packages/') > -1) {
  const pkgPath = path.join(configRoot, 'package.json');
  const pkg = require(pkgPath); // eslint-disable-line
  console.log(pkg.name); // eslint-disable-line
}
