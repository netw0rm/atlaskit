import { getShadowRoot } from './getShadowRoot';

/**
* Returns the root node of the passed component
*
* @param {Component} component The component to get the root node for
* @return {Node} The root node of the passed component
*/
export default function getRootNode(component) {
  return getShadowRoot(component).firstChild;
}
