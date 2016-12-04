import { mount } from 'enzyme';

// eslint-disable-next-line import/prefer-default-export
export const mountWithContext = (component, opts = {}) => {
  opts.context = Object.assign({}, opts.context, {
    insertCss: () => {},
  });
  return mount(component, opts);
};
