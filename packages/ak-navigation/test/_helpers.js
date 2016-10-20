import { getShadowRoot, waitUntil } from 'akutil-common-test';

export function setupComponent(Constructor) {
  const component = new Constructor();
  const componentHasShadowRoot = () => !!getShadowRoot(component);

  document.body.appendChild(component);

  return waitUntil(componentHasShadowRoot).then(() => component);
}

export function tearDownComponent(component) {
  document.body.removeChild(component);
}
