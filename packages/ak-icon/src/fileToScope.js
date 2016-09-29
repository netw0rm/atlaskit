/**
 * Takes a filename and returns it without the leading `./` and trailing '.js'
 *
 * @param {string} file Path to an icon in the form './pathTo/icon.js'
 * @param {String} [prefix] The prefix to strip. Defaults to `./`.
 * @return {string} the path without the leading prefix and trailing '.js'
 */
module.exports = function fileToScope(file, prefix = './') {
  return file.replace(prefix, '').replace(/\.js$/, '');
};
