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

exports.parseExample = parseExample;
