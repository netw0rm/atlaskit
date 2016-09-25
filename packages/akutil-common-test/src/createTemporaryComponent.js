import { define } from 'skatejs';
import { waitUntil, getShadowRoot } from './';
import uid from 'uid';

export default function createTemporary(definition) {
  const TemporaryWebComponent = define(`x-${uid()}`, definition);
  const component = new TemporaryWebComponent();
  const componentHasShadowRoot = () => !!getShadowRoot(component);
  document.body.appendChild(component);
  return waitUntil(componentHasShadowRoot).then(() => component);
}
