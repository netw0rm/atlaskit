#!/usr/bin/env node

const rimraf = require('rimraf');
const path = require('path');
const async = require('async');
const minilog = require('minilog');

const { tmpFolderName } = require('./constants');

const rootFolder = path.join(__dirname, '..');
const tmpFolder = path.join(rootFolder, 'src', tmpFolderName);

const log = minilog('ak-icon/gen-clean');

async.waterfall([
  function cleanTmpDir(cb) {
    log.debug('cleaning temp directory');

    rimraf(tmpFolder, cb);
  },
], (err) => {
  if (err) {
    log.error(err);
    process.exit(1);
  }
  log.info('Done!');
});
