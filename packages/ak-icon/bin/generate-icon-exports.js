#!/usr/bin/env node

const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const async = require('async');
const rimraf = require('rimraf');
const minilog = require('minilog');

const webpackConf = require('./webpack.config.js');
const { glyphFolderName, tmpFolderName, fileEnding } = require('./constants');
const workOnIcons = require('./workOnIcons');


const log = minilog('ak-icon/gen-js');

if (process.env.CLI) {
  minilog.suggest.defaultResult = false;
  minilog.suggest.clear().allow('ak-icon/gen-js', 'warn');
}

minilog.enable();

const rootFolder = path.join(__dirname, '..');
const srcFolder = path.join(rootFolder, 'src', 'icons');
const tmpFolder = path.join(rootFolder, 'src', tmpFolderName);
const destFolder = path.join(rootFolder, glyphFolderName);

async.waterfall([
  function cleanTmpDir(cb) {
    log.debug('cleaning temp directory');

    rimraf(tmpFolder, cb);
  },
  function cleanOutputDir(cb) {
    log.debug('cleaning destination directory');

    rimraf(destFolder, cb);
  },
  function findIconFiles(cb) {
    log.debug('Finding SVG files to transform');

    glob(`**/*${fileEnding}`, {
      cwd: srcFolder,
    }, cb);
  },
  workOnIcons(log, srcFolder, tmpFolder),

  function webpackify(iconPaths, cb) {
    log.info('Transforming icons via webpack');

    const entry = iconPaths.reduce((prev, svgFile) => {
      const base = svgFile.replace(/\.svg$/, '');
      prev[base] = path.join(tmpFolder, base);
      return prev;
    }, {});
    const compiler = webpack(webpackConf(destFolder, entry));
    compiler.run((err, stats) => {
      if (err || stats.compilation.errors.length) {
        cb(err || stats.compilation.errors);
        return;
      }
      cb();
    });
  },
], (err) => {
  if (err) {
    log.error(err);
    process.exit(1);
  }
  log.info('Done!');
});
