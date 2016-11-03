import { waitUntil, getShadowRoot } from 'akutil-common-test';
import keyCode from 'keycode';

import Dropdown, * as exports from '../src';

function createTemplate(options) {
  return options.map((opt) => {
    const elem = new exports[opt.id]();
    elem.innerHTML = opt.value || opt.id;
    if (elem instanceof exports.DropdownTrigger) {
      elem.setAttribute('slot', 'trigger');
    }
    if (opt.props) {
      Object.keys(opt.props).forEach((prop) => {
        elem[prop] = opt.props[prop];
      });
    }
    if (opt.children) {
      const children = createTemplate(opt.children);
      children.forEach((child) => {
        elem.appendChild(child);
      });
    }
    return elem;
  });
}

const defaultOptions = [
  { id: 'DropdownTriggerButton', value: 'Trigger test' },
  { id: 'Item', value: 'Item 1' },
  { id: 'Item', value: 'Item 2' },
];

function initDropdown(options = defaultOptions) {
  const component = new Dropdown();
  const template = createTemplate(options);
  template.forEach((child) => {
    component.appendChild(child);
  });

  const componentHasShadowRoot = () => !!getShadowRoot(component);
  document.body.appendChild(component);
  return waitUntil(componentHasShadowRoot, 10).then(() => component);
}

function clickDropdownTrigger(component) {
  component.querySelector('[slot="trigger"]').shadowRoot.firstChild.click();
}

function pressDropdownTrigger(component, key = 'enter') {
  const event = new CustomEvent('keydown', {
    bubbles: true,
    cancelable: true,
  });
  event.keyCode = keyCode(key);
  getShadowRoot(component.querySelector('[slot="trigger"]')).firstChild.dispatchEvent(event);
}

function getPaddings(item1, item2) {
  const item1Calc = item1.getBoundingClientRect();
  const item2Calc = item2.getBoundingClientRect();

  return {
    left: Math.round(item2Calc.left - item1Calc.left),
    top: Math.round(item2Calc.top - item1Calc.top),
    bottom: Math.round(item1Calc.bottom - item2Calc.bottom),
    right: Math.round(item1Calc.right - item2Calc.right),
    between: Math.round(item2Calc.left - item1Calc.left - item1Calc.width),
  };
}

export const itemHeight = 28;
export const itemLeftGap = 12;
export const itemLeftToDefaultGap = 8;

export { initDropdown, clickDropdownTrigger, pressDropdownTrigger, getPaddings };
