#!/usr/bin/env node

const glob = require('glob');
const lessToJs = require('less-vars-to-js');
const fs = require('fs');
const camelCase = require('camelcase');

function jsifyLessVariable(variable) {
  return camelCase(variable.substr(1));
}
/* eslint-disable no-console */
glob('**/*.less', {}, (err, files) => {
  if (err) {
    process.exit(1);
  }
  const vars = files.reduce((prev, file) => {
    const fileContent = fs.readFileSync(file, 'utf8');
    return Object.assign(prev, lessToJs(fileContent));
  }, {});

  console.log('/* eslint-disable quotes, max-len */');
  Object.keys(vars).forEach((key) => {
    console.log(`const ${jsifyLessVariable(key)} = ${JSON.stringify(vars[key])};`);
  });
  console.log('');
  console.log('export {');
  Object.keys(vars).forEach((key) => console.log(`  ${jsifyLessVariable(key)},`));
  console.log('};');
});
