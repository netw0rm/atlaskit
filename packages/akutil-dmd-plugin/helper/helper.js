const ddata = require('ddata');

function parseExample(text) {
  if (text) {
    if (text.match(/@html/)) {
      return `**HTML Example**\n${text.replace(/.*@html\s*/g, '')}`;
    } else if (text.match(/@js/)) {
      return `**JS Example**\n${text.replace(/.*@js\s*/g, '')}`;
    }
    return `**Example**\n${text}`;
  }
  return text;
}

function hasApi(type, options) {
  const d = ddata.descendants.bind(this)(options);
  return d && d.some(el => el.kind === type);
}

exports.parseExample = parseExample;
exports.hasApi = hasApi;
