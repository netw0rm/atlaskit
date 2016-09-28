import { define } from 'skatejs';
import { waitUntil, getShadowRoot } from 'akutil-common-test';

function createTemporaryComponent(definition) {
  const TemporaryWebComponent = define('x-test', definition);
  const component = new TemporaryWebComponent();
  const componentHasShadowRoot = () => !!getShadowRoot(component);
  document.body.appendChild(component);
  return waitUntil(componentHasShadowRoot).then(() => component);
}

function tearDownComponent(component) {
  document.body.removeChild(component);
}

export { createTemporaryComponent, tearDownComponent };
