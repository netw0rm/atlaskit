/**
 * locates a web component by its prefix.
 *
 * Note: this is also used in protractor as a custom locator, so the signature of the method has
 * to follow the protractor spec
 *
 * @class locateWebComponent
 * @memberof akutil-common-test
 * @instance
 * @param {String} componentNamePrefix The name of the web component (will be used as a prefix)
 * @param {Node} [parentElement] The parent element to search in. Will use document if omitted.
 * @return {Node[]} An array of DOM elements
 */
function locateWebComponent(componentNamePrefix, parentElement) {
  const using = parentElement || document;
  const tagMatcher = new RegExp(`^${componentNamePrefix}`, 'i');

  return Array
    .from(using.querySelectorAll('*[defined]'))
    .filter((node) => tagMatcher.test(node.tagName));
}

export default locateWebComponent;
