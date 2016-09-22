/**
 * @description Takes a filename and returns it without the leading `./` and trailing '.js'
 * @params {string} file Path to an icon in the form './pathTo/icon.js'
 * @return {string} the path without the leading `./` and trailing '.js'
 */
export default function fileToScope(file) {
  return file.replace(/^\.\//, '').replace(/\.js$/, '');
}
