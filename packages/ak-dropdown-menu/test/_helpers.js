// any file prefixed with _ will be ignored by Karma when picking up test files
import { waitUntil, getShadowRoot, tearDownComponent } from 'akutil-common-test';

function setupComponent(Component) {
  const component = new Component();
  const componentHasShadowRoot = () => !!getShadowRoot(component);

  document.body.appendChild(component);

  return waitUntil(componentHasShadowRoot).then(() => component);
}

export { setupComponent, tearDownComponent };
