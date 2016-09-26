#!/usr/bin/env node

const glob = require('glob');
const path = require('path');
const fileToScope = require('../src/fileToScope');
const pathToDashed = require('../src/pathToDashed');
const iconNameToComponentName = require('../src/iconNameToComponentName');

const tempFolder = '../tmp/';
const sourceFolder = path.join(__dirname, '..', 'src');

const pathToExport = (p) => iconNameToComponentName(pathToDashed(fileToScope(p, tempFolder)));

glob(`${tempFolder}**/*.js`, {
  cwd: sourceFolder,
}, (err, files) => {
  if (err) {
    throw err;
  }
  /* eslint-disable no-console */
  console.log('// NOTE: This file is generated from the glyphs found inside this Component');
  console.log('//       DO NOT MODIFY THIS FILE AS YOUR CHANGES WILL BE OVERRIDDEN');

  files.forEach((file) => {
    const componentName = pathToExport(file);
    const tmpComponentName = `tmp${componentName}`;
    console.log();
    console.log(`import ${tmpComponentName} from '${file}';`);
    console.log(`export const ${componentName} = ${tmpComponentName};`);
  });
});
