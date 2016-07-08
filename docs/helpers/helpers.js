function parseExample(text) {
  if (text) {
    if (text.match(/@html/)) {
      return `**HTML Example**\n${text.replace(/@html /g, '')}`;
    } else if (text.match(/@js/)) {
      return `**JS Example**\n${text.replace(/@js /g, '')}`;
    }
    return `'**Example**\n'${text}`;
  }
  return text;
}

function hasEvents(identifier, value) {
  identifier.hasEvents = value;
}

exports.parseExample = parseExample;
exports.hasEvents = hasEvents;
