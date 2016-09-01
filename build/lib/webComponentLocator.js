module.exports = function webComponentLocator(componentNamePrefix, parentElement) {
  const using = parentElement || document;
  const tagMatcher = new RegExp(`^${componentNamePrefix}`, 'i');

  return Array
    .from(using.querySelectorAll('*[defined]'))
    .filter((node) => tagMatcher.test(node.tagName));
};
