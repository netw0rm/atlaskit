/**
 * @description Takes a filename and returns
 * @params {string} file Path to an icon in the form './pathTo/icon.js'
 * @return {string} the path without the leading `./` and trailing '.js'
 */
export default function fileToScope(file) {
  return file.replace(/^\.\//, '').replace(/\.js$/, '');
}
