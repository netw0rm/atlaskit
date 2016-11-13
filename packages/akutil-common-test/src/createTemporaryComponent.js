import uid from 'uid';

import waitUntil from './waitUntil';
import getShadowRoot from './getShadowRoot';


/**
* Creates a temporary component from a SkateJS module definition
*
* @param {Function} define The SkateJS define function. This needs to be passed in so that vdom
* doesn't get confused between your components skate and the skate from akutil-common-test.
* @param {object|Component} definition The SkateJS definition to base the temporary component upon
* @param {Node} [target=document.body] The target element to which the component
* should be appended
* @return {Promise.<Component>} A promise resolving to a ready-to-use instance of the created
* temporary SkateJS WebComponent.
*/
export default (define, definition, target = document.body) => {
  if (typeof define !== 'function') {
    throw new Error('Given define is not a function');
  }
  if (typeof definition !== 'object' && typeof definition !== 'function') {
    throw new Error('Definition must be an object or constructor');
  }
  const TemporaryWebComponent = define(`x-${uid()}`, definition);
  const component = new TemporaryWebComponent();
  const componentHasShadowRoot = () => !!getShadowRoot(component);
  target.appendChild(component);
  return waitUntil(componentHasShadowRoot).then(() => component);
};
