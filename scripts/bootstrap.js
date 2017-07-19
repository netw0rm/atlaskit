// @flow
const lerna = require('./utils/lerna');

lerna.exec([], ['git', 'clean', '-Xdf', '.'])
  .then(() => lerna.bootstrap());

