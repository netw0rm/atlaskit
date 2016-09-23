import { define } from 'skatejs';
import { waitUntil, getShadowRoot } from 'akutil-common-test';
import uid from 'uid';


function createTemporary(definition) {
  const TemporaryWebComponent = define(`x-${uid()}`, definition);
  const component = new TemporaryWebComponent();
  const componentHasShadowRoot = () => !!getShadowRoot(component);
  document.body.appendChild(component);
  return waitUntil(componentHasShadowRoot).then(() => component);
}

function removeTemporary(component) {
  document.body.removeChild(component);
}

function getRootNode(component) {
  return getShadowRoot(component).firstChild;
}

export { createTemporary, removeTemporary, getRootNode };
