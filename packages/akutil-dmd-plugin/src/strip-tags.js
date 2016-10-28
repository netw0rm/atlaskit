function stripTags(str, tags) {
  let stripped = str;
  // eslint-disable-next-line prefer-arrow-callback
  tags.forEach(function (tag) {
    const re = new RegExp(`\\s*@${tag}\\s*`);
    stripped = stripped.replace(re, '');
  });
  return stripped;
}

exports.stripTags = stripTags;
export default stripTags;
