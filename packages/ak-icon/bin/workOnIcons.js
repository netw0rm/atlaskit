const componentTemplate = require('./componentTemplate');
const path = require('path');
const fs = require('fs');
const async = require('async');
const mkdirp = require('mkdirp');
const { name } = require('../package.json');
const defaultSvgo = require('./svgo/transformations/default');
const customSvgo = require('./svgo/transformations/custom');

const { maxWidth, maxHeight, fileEnding } = require('./constants');

/**
* Generates a method that processes list of icons
*
* @param {!minilog} log A minilog logger instance
* @param {!String} srcFolder The source folder (base of the icon files)
* @param {!String} tmpFolder The temporary folder to write the intermediate icon files to
* @return {Function} The method to be used for the icon processing
*/
module.exports = (log, srcFolder, tmpFolder) =>
/**
* A worker that asynchronously processes some icons
*
* @param {Array.<String>} iconPaths The icon files to process
* @param {Function} finishIconWork The callback to invoke when the processing is done
* @return void
*/
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
      function optimizeSvg(rawSvg, cb) {
        log.debug(`"${iconRelativePathToSrc}": optimizing SVG`);

        defaultSvgo.optimize(rawSvg, ({ info, data }) => {
          const { width, height } = info;
          if (width > maxWidth) {
            log.warn(`"${iconRelativePathToSrc}": too wide: ${width} > ${maxWidth}`);
          }
          if (height > maxHeight) {
            log.warn(`"${iconRelativePathToSrc}": too high: ${height} > ${maxHeight}`);
          }
          cb(null, data);
        });
      },
      function runCustomTransformations(svgData, cb) {
        const fillCallback = (fill) =>
          log.warn(`"${iconRelativePathToSrc}": has a fill of "${fill}"`);
        const styleCallback = () =>
          log.warn(`"${iconRelativePathToSrc}": has a <style> element which will be stripped`);

        const svgo = customSvgo(fillCallback, styleCallback);
        svgo.optimize(svgData, (result) => cb(null, result.data));
      },
      function generateExport(svgData, cb) {
        log.debug(`"${iconRelativePathToSrc}": generating export`);

        const iconRelativePathDashed = iconRelativePathToSrcNoExt.split(path.sep).join('-');
        const iconName = `${name}-${iconRelativePathDashed}`;
        const template = componentTemplate({
          iconName,
          unprefixedIconName: iconRelativePathDashed,
          svgData,
          iconRelativePathToSrc,
          iconRelativePathToSrcNoExt,
        });
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
};
