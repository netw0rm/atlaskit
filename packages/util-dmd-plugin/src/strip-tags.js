/**
 * Strip '@'-prefixed tags from a string
 * @param {string} str The string
 * @param {string[]} tags The tags to strip.
 * @example stripTags('@example My example', ['example']);
 */
function stripTags(str, tags) {
  return tags.reduce((stripped, tag) => stripped.replace(new RegExp(`[^\\S\\n]*@${tag}\\s*`), ''), str);
}

module.exports = stripTags;
