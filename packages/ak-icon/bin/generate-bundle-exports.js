#!/usr/bin/env node

const fileToScope = require('./fileToScope');
const pathToDashed = require('./pathToDashed');
const iconNameToComponentName = require('./iconNameToComponentName');
const getAllIconsPaths = require('./getAllIconsPaths');
const { tmpFolderName } = require('./constants');

const tempFolder = `../src/${tmpFolderName}/`;

const pathToExport = p => iconNameToComponentName(pathToDashed(fileToScope(p, tempFolder)));

const allIconPaths = getAllIconsPaths();
/* eslint-disable no-console */
console.log('// NOTE: This file is generated from the glyphs found inside this Component');
console.log('//       DO NOT MODIFY THIS FILE AS YOUR CHANGES WILL BE OVERRIDDEN');
console.log();
console.log("import { size } from './Icon';");

allIconPaths.forEach((file) => {
  const componentName = pathToExport(file);
  const tmpComponentName = `tmp${componentName}`;
  const fileWithoutJsx = file.substring(0, file.length - 4);
  console.log(`import ${tmpComponentName} from '${fileWithoutJsx}';`);
});

console.log();

allIconPaths.forEach((file) => {
  const componentName = pathToExport(file);
  const tmpComponentName = `tmp${componentName}`;
  console.log(`export const ${componentName} = ${tmpComponentName};`);
});

console.log('export { size };');
/* eslint-enable no-console */
