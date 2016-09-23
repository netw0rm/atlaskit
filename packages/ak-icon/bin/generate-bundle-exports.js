#!/usr/bin/env node

const glob = require('glob');
const path = require('path');
const camelcase = require('camelcase');
const fileToScope = require('../src/fileToScope');
const pathToDashed = require('../src/pathToDashed');

const pathToSymbol = (p) => camelcase(pathToDashed(fileToScope(p, '../tmp/')));

glob('../tmp/**/*.js', {
  cwd: path.join(__dirname, '..', 'src'),
}, (err, files) => {
  if (err) {
    throw err;
  }
  /* eslint-disable no-console */
  console.log('// NOTE: This file is generated from the glyphs found inside this Component');
  console.log('//       DO NOT MODIFY THIS FILE AS YOUR CHANGES WILL BE OVERRIDDEN');
  console.log('');

  files.forEach((file) => console.log(`export ${pathToSymbol(file)} from '${file}';`));
});
