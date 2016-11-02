const ddata = require('ddata');
const stripTags = require('../src/strip-tags');

/**
 * Parse an example annotation, add a title, and strip out @html, @js, and @playground tags.
 */
function parseExample(text) {
  if (text) {
    if (text.match(/@html/)) {
      return `**HTML Example**\n${stripTags(text, ['html', 'playground'])}`;
    } else if (text.match(/@js/)) {
      return `**JS Example**\n${stripTags(text, ['js', 'playground'])}`;
    }
    return `**Example**\n${stripTags(text, ['playground'])}`;
  }
  return text;
}

function hasApi(type, options) {
  const d = ddata.descendants.bind(this)(options);
  return d && d.some(el => el.kind === type);
}

exports.parseExample = parseExample;
exports.hasApi = hasApi;
