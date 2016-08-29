import { symbols } from 'skatejs';

function getShadowRoot(component) {
  return component[symbols.shadowRoot];
}

export default getShadowRoot;
