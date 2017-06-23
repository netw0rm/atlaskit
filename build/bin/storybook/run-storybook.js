#!/usr/bin/env node
const childProcess = require('child_process');

childProcess.spawn('../../node_modules/.bin/start-storybook',
  ['-c', '../../build/storybook',
    '-p', '9001'],
  { stdio: 'inherit' }
);
