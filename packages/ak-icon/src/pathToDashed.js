/**
 * @description Takes a filename and replaces forward slashes with dashes.
 * @params {string} file Path to an icon in the form 'path/to/icon'
 * @return {string} the path with forward slashes replaced with dashes, e.g 'path-to-icon'
 */
export default (file) => file.split('/').join('-');
