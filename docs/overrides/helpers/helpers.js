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

function hasProps(identifier, value) {
  identifier.hasProps = value;
}

function hasMethods(identifier, value) {
  identifier.hasMethods = value;
}

function hasEvents(identifier, value) {
  identifier.hasEvents = value;
}

exports.parseExample = parseExample;
exports.hasProps = hasProps;
exports.hasMethods = hasMethods;
exports.hasEvents = hasEvents;
