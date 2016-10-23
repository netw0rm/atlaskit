import { define } from 'skatejs';
import { waitUntil, getShadowRoot } from 'akutil-common-test';
import keyCode from 'keycode';

import Dropdown, * as exports from '../src';

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

function createTemplate(options) {
  return options.map((opt) => {
    const elem = new exports[opt.id]();
    elem.textContent = opt.value || opt.id;
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

export const itemHeight = 28;
export const itemLeftGap = 12;
export const itemLeftToDefaultGap = 8;

export { createTemporaryComponent, tearDownComponent, initDropdown, clickDropdownTrigger,
  pressDropdownTrigger };
