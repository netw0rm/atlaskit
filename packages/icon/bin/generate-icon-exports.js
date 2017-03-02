#!/usr/bin/env node

const fs = require('fs');
const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const async = require('async');
const rimraf = require('rimraf');
const minilog = require('minilog');

const webpackConf = require('./webpack.config.js');
const { glyphFolderName, tmpFolderName, fileEnding } = require('./constants');
const workOnIcons = require('./workOnIcons');
const babelCore = require('babel-core');
const mkdirp = require('mkdirp');

const log = minilog('ak-icon/gen-js');

if (process.env.CLI) {
  minilog.suggest.defaultResult = false;
  minilog.suggest.clear().allow('ak-icon/gen-js', 'warn');
}

minilog.enable();

const rootFolder = path.join(__dirname, '..');
const srcFolder = path.join(rootFolder, 'src', 'icons');
const tmpFolder = path.join(rootFolder, tmpFolderName);
const destFolder = path.join(rootFolder, glyphFolderName);

async.waterfall([
  function createIcon(cb) {
    const entry = {
      Icon: `${path.join(rootFolder, 'src')}/Icon.jsx`,
    };
    const compiler = webpack(webpackConf(path.join(rootFolder, 'lib'), entry));
    compiler.run((err, stats) => {
      if (err || stats.compilation.errors.length) {
        cb(err || stats.compilation.errors);
        return;
      }
      cb();
    });
  },
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
  function createTargetDir(iconPaths, cb) {
    log.debug('creating target directorie');
    mkdirp(destFolder, () => cb(null, iconPaths));
  },
  function webpackify(iconPaths, cb) {
    log.info('Transforming icons via webpack');

    const entry = iconPaths.reduce((prev, svgFile) => {
      const base = svgFile.replace(/\.svg$/, '');
      prev[base] = path.join(tmpFolder, base);
      return prev;
    }, {});

    const tasks = Object.keys(entry).map(name => _cb =>
      babelCore.transformFile(`${entry[name]}.jsx`, {}, (err, result) => {
        if (err) {
          log.error(err);
        }
        const fileName = path.join(destFolder, `${name}.js`);
        mkdirp(path.dirname(fileName), () => fs.writeFile(fileName, result.code, _cb));
      })
    );

    async.waterfall(tasks, () => cb(null, { entry }));
  },
  function writeTypeScriptDefinitions({ entry }, cb) {
    log.debug('Writing TypeScript definitions');

    const contents = `
import { PureComponent } from 'react';

type State = {};
type Props = {
  label: string;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  onClick?: (e: MouseEvent) => void;
};

export default class extends PureComponent<Props, State> {}
`;
    const tasks = Object
      .keys(entry)
      .map(item =>
        cb_ => fs.writeFile(path.join(destFolder, `${item}.d.ts`), contents, cb_)
      );

    async.waterfall(tasks, cb);
  },
], (err) => {
  if (err) {
    log.error(err);
    process.exit(1);
  }
  log.info('Done!');
});
