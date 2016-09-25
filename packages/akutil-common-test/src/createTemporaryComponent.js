import { define } from 'skatejs';
import { waitUntil, getShadowRoot } from './';
import uid from 'uid';

export default function createTemporaryComponent(definition, elem) {
  const TemporaryWebComponent = define(`x-${uid()}`, definition);
  const component = new TemporaryWebComponent();
  const componentHasShadowRoot = () => !!getShadowRoot(component);
  elem.appendChild(component);
  return waitUntil(componentHasShadowRoot).then(() => component);
}
