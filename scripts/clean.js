// @flow
const lerna = require('./utils/lerna');
const { spawn } = require('./utils/processes');

lerna.exec([], ['git', 'clean', '-Xdf', '.'])
  .then(() => spawn('rm', ['-rf', 'node_modules']));
