import { getShadowRoot } from 'akutil-common-test';

export const shadowDomQuery = (elem, selector) =>
  getShadowRoot(elem).querySelector(selector);

export const getShadowButtonElem = (elem) =>
  shadowDomQuery(elem, 'button');

export const createDivTest = config => {
  const div = document.createElement('div');
  div.innerText = 'test';
  if (config.slotName) {
    div.slot = config.slotName;
  }
  return div;
};
