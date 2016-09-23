/**
 * @description A simple helper method to retrieve a shadowRoot from a component
 * @param {Node} component A node to pull the shadowRoot from.
 * @example @js const elem = document.querySelector('.fixture').firstChild;
 *  const sr = getShadowRoot(elem);
 */
function getShadowRoot(component) {
  // Note: we can't use the the symbol exported from Skate,
  // because the symbol exported from the skate version in this file might differ to the one used
  // in another component and as we run all components in one single test suite, we can't guarantee
  // which version will be used.
  return component.shadowRoot;
}

export default getShadowRoot;
