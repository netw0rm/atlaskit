// any file prefixed with _ will be ignored by Karma when picking up test files
import { waitUntil, getShadowRoot } from 'akutil-common-test';

function setupComponent(Component) {
  const component = new Component();
  const componentHasShadowRoot = () => !!getShadowRoot(component);

  document.body.appendChild(component);

  return waitUntil(componentHasShadowRoot).then(() => component);
}

function tearDownComponent(component) {
  document.body.removeChild(component);
}

export { setupComponent, tearDownComponent };
