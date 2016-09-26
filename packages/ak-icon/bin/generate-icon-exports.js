#!/usr/bin/env node

const webpack = require('webpack');
const webpackConf = require('./webpack.config.js');
const componentTemplate = require('./componentTemplate');
const path = require('path');
const glob = require('glob');
const fs = require('fs');
const SVGO = require('svgo');
const async = require('async');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const minilog = require('minilog');
const { name } = require('../package.json');
const log = minilog('ak-icon/gen-js');

if (process.env.CLI) {
  minilog.suggest.defaultResult = false;
  minilog.suggest.clear().allow('ak-icon/gen-js', 'warn');
}

minilog.enable();

const fileEnding = '.svg';
const defaultWidth = 20;
const defaultHeight = 20;

const maxWidth = 20;
const maxHeight = 20;

const rootFolder = path.join(__dirname, '..');
const srcFolder = path.join(rootFolder, 'src', 'icons');
const tmpFolder = path.join(rootFolder, 'tmp');
const destFolder = path.join(rootFolder, 'glyph');

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
  function workOnIcons(iconPaths, finishIconWork) {
    log.debug('starting work on icons');

    async.eachSeries(iconPaths, (iconRelativePathToSrc, callback) => {
      const iconRelativePathToSrcNoExt = iconRelativePathToSrc
        .replace(new RegExp(`\\${fileEnding}$`), '');
      async.waterfall([
        function readSvg(cb) {
          const file = path.join(srcFolder, iconRelativePathToSrc);
          log.debug(`"${iconRelativePathToSrc}": reading file`);

          fs.readFile(file, 'utf8', cb);
        },
        function optimizeSvg(data, cb) {
          log.debug(`"${iconRelativePathToSrc}": optimizing SVG`);

          const knownItems = [];
          const svgo = new SVGO({
            multipass: true,
            plugins: [
              'removeTitle',
              'cleanupIDs',
              'collapseGroups',
              {
                rewriteXmlnsLink: {
                  type: 'perItem',
                  fn: (item) => {
                    item.eachAttr((attr) => {
                      if (attr.prefix && attr.local) {
                        item.removeAttr(attr.name);
                      }
                    });
                  },
                },
              },
              {
                warnOnDefinedFill: {
                  type: 'perItem',
                  fn: (item) => {
                    if (item.hasAttr('fill')) {
                      const { value: fill } = item.attr('fill');
                      if (knownItems.indexOf(fill) !== -1) {
                        return;
                      }
                      knownItems.push(fill);
                      if (fill !== 'currentColor' && fill !== 'none') {
                        log.warn(`"${iconRelativePathToSrc}": has a fill of "${fill}"`);
                      }
                    }
                  },
                },
              },
            ],
          });

          svgo.optimize(data, (result) => {
            if (result.info.width > maxWidth) {
              log.warn(`"${iconRelativePathToSrc}": too wide: ${result.info.width} > ${maxWidth}`);
            }
            if (result.info.height > maxHeight) {
              log.warn(`"${iconRelativePathToSrc}": too high: \
${result.info.height} > ${maxHeight}`);
            }
            cb(null, result);
          });
        },
        function generateExport({ data: svgData }, cb) {
          log.debug(`"${iconRelativePathToSrc}": generating export`);

          const iconRelativePathDashed = iconRelativePathToSrcNoExt.split(path.sep).join('-');
          const iconName = `${name}-${iconRelativePathDashed}`;
          const template = componentTemplate(iconName, svgData, defaultWidth, defaultHeight);
          cb(null, template);
        },
        function createDirs(contents, cb) {
          log.debug(`"${iconRelativePathToSrc}": creating intermediate directories`);

          const targetFile = path.join(tmpFolder, `${iconRelativePathToSrcNoExt}.js`);
          mkdirp(path.dirname(targetFile), (err) => cb(err, {
            targetFile,
            contents,
          }));
        },
        function writeFile({ contents, targetFile }, cb) {
          log.debug(`"${iconRelativePathToSrc}": writing generated code to memory`);

          fs.writeFile(targetFile, contents, cb);
        },
        function done(cb) {
          log.info(`"${iconRelativePathToSrc}" transformed successfully`);

          cb();
        },
      ], callback);
    }, (err) => finishIconWork(err, iconPaths));
  },

  function webpackify(iconPaths, cb) {
    log.info('Transforming icons via webpack');

    const entry = iconPaths.reduce((prev, svgFile) => {
      const base = svgFile.replace(/\.svg$/, '');
      prev[base] = path.join(tmpFolder, base);
      return prev;
    }, {});
    const compiler = webpack(webpackConf(destFolder, entry));
    compiler.run((err, stats) => {
      if (err) {
        cb(err);
        return;
      }
      if (stats.compilation.errors.length) {
        cb(stats.compilation.errors);
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
