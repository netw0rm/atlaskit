import { getShadowRoot, waitUntil, tearDownComponent } from 'akutil-common-test';

import AkButton from '../src';


export const shadowDomQuery = (elem, selector) => getShadowRoot(elem).querySelector(selector);

export const getShadowButtonElem = elem => shadowDomQuery(elem, 'button');

export const createDivTest = (config) => {
  const div = document.createElement('div');
  div.innerText = 'test';
  if (config.slotName) {
    div.slot = config.slotName;
  }
  return div;
};

export const setup = () => {
  const component = new AkButton();
  document.body.appendChild(component);
  return waitUntil(() => getShadowRoot(component) !== null)
    .then(() => (component));
};

export { tearDownComponent };
