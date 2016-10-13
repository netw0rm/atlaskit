/**
 * @description locates a web component by its prefix.
 *
 * Note: this is also used in protractor as a custom locator, so the signature of the method has
 * to follow the protractor spec
 *
 * @param {String} componentNamePrefix The name of the web component (will be used as a prefix)
 * @param {Node} [parentElement] The parent element to search in. Will use document if omitted.
 * @return {Node[]} An array of DOM elements
 */

function locateComponent(componentNamePrefix, parentElement) {
  const using = parentElement || document;
  const tagMatcher = new RegExp(`^${componentNamePrefix}`, 'i');

  return Array
    .from(using.querySelectorAll('*[defined]'))
    .filter((node) => tagMatcher.test(node.tagName));
}

// Note: no es6 export here, as it needs to be loaded by protractor
// It only found the top level shadow dom matches
module.exports = function locateShadowDOM(componentNamePrefix, parentElement) {
  const foundElements = locateComponent(componentNamePrefix, parentElement);
  console.log(parentElement,'-----------------------');

  if (foundElements.length > 0) {
    return foundElements;
  }

  if (parentElement.shadowRoot) {
    return locateShadowDOM(componentNamePrefix, parentElement.shadowRoot);
  }
};
