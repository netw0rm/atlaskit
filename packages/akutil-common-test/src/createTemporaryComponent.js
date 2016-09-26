import { define } from 'skatejs';
import { waitUntil, getShadowRoot } from './';
import uid from 'uid';

/**
* Creates a temporary component from a SkateJS module definition
*
* @param {object} definition The SkateJS definition to base the temporary component upon
* @return {Promise.<Component>} A promise resolving to a ready-to-use instance of the created
* temporary SkateJS WebComponent.
*/
export default (definition, target = document.body) => {
  const TemporaryWebComponent = define(`x-${uid()}`, definition);
  const component = new TemporaryWebComponent();
  const componentHasShadowRoot = () => !!getShadowRoot(component);
  target.appendChild(component);
  return waitUntil(componentHasShadowRoot).then(() => component);
};
