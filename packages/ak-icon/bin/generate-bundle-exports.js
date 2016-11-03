#!/usr/bin/env node

const glob = require('glob');
const path = require('path');
const fileToScope = require('./fileToScope');
const pathToDashed = require('./pathToDashed');
const iconNameToComponentName = require('./iconNameToComponentName');
const { tmpFolderName } = require('./constants');

const tempFolder = `../src/${tmpFolderName}/`;
const sourceFolder = path.join(__dirname, '..', 'src');

const pathToExport = p => iconNameToComponentName(pathToDashed(fileToScope(p, tempFolder)));

glob(`${tempFolder}**/*.js`, {
  cwd: sourceFolder,
}, (err, files) => {
  if (err) {
    throw err;
  }
  /* eslint-disable no-console */
  console.log('// NOTE: This file is generated from the glyphs found inside this Component');
  console.log('//       DO NOT MODIFY THIS FILE AS YOUR CHANGES WILL BE OVERRIDDEN');
  console.log();
  console.log("import { size } from './Icon';");

  files.forEach((file) => {
    const componentName = pathToExport(file);
    const tmpComponentName = `tmp${componentName}`;
    const fileWithoutJs = file.substring(0, file.length - 3);
    console.log(`import ${tmpComponentName} from '${fileWithoutJs}';`);
  });

  console.log();

  files.forEach((file) => {
    const componentName = pathToExport(file);
    const tmpComponentName = `tmp${componentName}`;
    console.log(`export const ${componentName} = ${tmpComponentName};`);
  });

  console.log('export { size };');
});
