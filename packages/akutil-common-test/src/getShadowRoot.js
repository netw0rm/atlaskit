import { symbols } from 'skatejs';

/**
 * @description A simple helper method to retrieve a shadowRoot from a component
 * @param {Node} component A node to pull the shadowRoot from.
 * @example @js const elem = document.querySelector('.fixture').firstChild;
 *  const sr = getShadowRoot(elem);
 */
function getShadowRoot(component) {
  return component[symbols.shadowRoot];
}

export default getShadowRoot;
