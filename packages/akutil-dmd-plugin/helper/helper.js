/* eslint-disable */

const ddata = require('ddata');

function stripTags(str, tags) {
  let stripped = str;
  tags.forEach(function(tag) {
    const re = new RegExp(`*\s*@${tag}\s*`);
    stripped = str.replace(re, '');
  });
  return stripped;
}

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
