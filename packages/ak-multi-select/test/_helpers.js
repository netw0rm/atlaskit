// any file prefixed with _ will be ignored by Karma when picking up test files
import { waitUntil, getShadowRoot } from 'akutil-common-test';

import MultiSelect, * as exports from '../src';

function createTemplate(options) {
  return options.map((opt) => {
    const elem = new exports[opt.id]();

    if (opt.value) {
      elem.innerHTML = opt.value;
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
  {
    id: 'Group',
    children: [
      { id: 'Item', value: 'Item 1' },
      { id: 'Item', value: 'Item 2' },
      { id: 'Item', value: 'Item 3' },
    ],
  },
  {
    id: 'Group',
    children: [
      { id: 'Item', value: 'Item 4' },
      { id: 'Item', value: 'Item 5' },
      { id: 'Item', value: 'Item 6' },
    ],
  },
];

function initMultiSelect(options = defaultOptions) {
  const component = new MultiSelect();
  const template = createTemplate(options);
  template.forEach((child) => {
    component.appendChild(child);
  });

  const componentHasShadowRoot = () => !!getShadowRoot(component);
  document.body.appendChild(component);
  return waitUntil(componentHasShadowRoot, 10).then(() => component);
}

export { initMultiSelect }; // eslint-disable-line import/prefer-default-export
