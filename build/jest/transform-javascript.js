const fs = require('fs');
const path = require('path');
const babelJest = require('babel-jest');

const babelConfig = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../.babelrc')));

module.exports = babelJest.createTransformer(
  babelConfig
);
