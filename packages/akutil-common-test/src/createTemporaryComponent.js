import { waitUntil, getShadowRoot } from './';
import uid from 'uid';

/**
* Creates a temporary component from a SkateJS module definition
*
* @param {object} define The SkateJS define function. This needs to be passed in so that vdom
* doesn't get confused between your components skate and the skate from akutil-common-test.
* @param {object} definition The SkateJS definition to base the temporary component upon
* @param {object} [target=document.body] The target element to which the component
* should be appended
* @return {Promise.<Component>} A promise resolving to a ready-to-use instance of the created
* temporary SkateJS WebComponent.
*/
export default (define, definition, target = document.body) => {
  if (!define || !definition) {
    return undefined;
  }
  const TemporaryWebComponent = define(`x-${uid()}`, definition);
  const component = new TemporaryWebComponent();
  const componentHasShadowRoot = () => !!getShadowRoot(component);
  target.appendChild(component);
  return waitUntil(componentHasShadowRoot).then(() => component);
};
