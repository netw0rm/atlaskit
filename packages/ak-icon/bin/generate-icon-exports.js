#!/usr/bin/env node

const path = require('path');
const glob = require('glob');
const fs = require('fs');
const SVGO = require('svgo');
const async = require('async');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const minilog = require('minilog');
const { name } = require('../package.json');
const log = minilog('generate-icon-exports');
minilog.enable();

const fileEnding = '.svg';
const maxWidth = 20;
const maxHeight = 20;

const rootFolder = path.join(__dirname, '..');
const srcFolder = path.join(rootFolder, 'src');
const destFolder = path.join(rootFolder, 'glyph');

async.waterfall([
  function cleanOutputDir(cb) {
    rimraf(destFolder, cb);
  },
  function findIconFiles(cb) {
    glob(`**/*${fileEnding}`, {
      cwd: srcFolder,
    }, cb);
  },

  function workOnIcons(iconPaths, finishIconWork) {
    const svgo = new SVGO({
      multipass: true,
      plugins: [
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
      ],
    });

    async.eachSeries(iconPaths, (iconRelativePathToSrc, callback) => {
      const iconRelativePathToSrcNoExt = iconRelativePathToSrc
        .replace(new RegExp(`\\${fileEnding}$`), '');
      async.waterfall([
        function readSvg(cb) {
          fs.readFile(path.join(srcFolder, iconRelativePathToSrc), 'utf8', cb);
        },
        function optimizeSvg(data, cb) {
          svgo.optimize(data, (result) => {
            if (result.info.width > maxWidth) {
              log.warn(`"${iconRelativePathToSrc}" is too wide: \
${result.info.width} > ${maxWidth}`);
            }
            if (result.info.height > maxHeight) {
              log.warn(`"${iconRelativePathToSrc}" is too high: \
${result.info.height} > ${maxHeight}`);
            }
            cb(null, result);
          });
        },
        function generateExport({ data: svgData }, cb) {
          const iconRelativePathDashed = iconRelativePathToSrcNoExt
            .replace(new RegExp(path.sep, 'g'), '-');

          cb(null, `import { define, vdom } from 'skatejs';

// eslint-disable-next-line max-len, react/jsx-space-before-closing
const Glyph = () => (${svgData});

export default define('${name}-${iconRelativePathDashed}', {
  render() {
    return (<Glyph />);
  },
});
`);
        },
        function createDirs(contents, cb) {
          const targetFile = path.join(destFolder, `${iconRelativePathToSrcNoExt}.js`);
          mkdirp(path.dirname(targetFile), (err) => cb(err, {
            targetFile,
            contents,
          }));
        },
        function writeFile({ contents, targetFile }, cb) {
          fs.writeFile(targetFile, contents, cb);
        },
      ], callback);
    }, finishIconWork);
  },
], (err) => {
  if (err) {
    log.error(err);
    process.exit(1);
  }
});
