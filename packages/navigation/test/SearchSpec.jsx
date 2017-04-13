import React from 'react';
import { mount } from 'enzyme';
import Search from '../src/components/js/Search';

const describe = window.describe;
const it = window.it;

const noop = () => {};

describe('Search', () => {
  const isInputFocused = wrapper =>
    wrapper.find('input').getDOMNode() === document.activeElement;

  describe('on mount', () => {
    it('should focus on the input if requested', () => {
      const wrapper = mount(
        <Search
          onChange={noop}
          shouldFocusInput
        />);

      expect(isInputFocused(wrapper)).to.equal(true);
    });

    it('should not focus on the input if requested', () => {
      const wrapper = mount(<Search onChange={noop} />);

      expect(isInputFocused(wrapper)).to.equal(false);
    });
  });

  describe('on update', () => {
    it('should gain focus when requested', () => {
      const wrapper = mount(<Search onChange={noop} />);

      expect(isInputFocused(wrapper)).to.equal(false);

      wrapper.setProps({ shouldFocusInput: true });

      expect(isInputFocused(wrapper)).to.equal(true);
    });

    it('should loose focus when requested', () => {
      const wrapper = mount(<Search onChange={noop} shouldFocusInput />);

      expect(isInputFocused(wrapper)).to.equal(true);

      wrapper.setProps({ shouldFocusInput: false });

      expect(isInputFocused(wrapper)).to.equal(false);
    });
  });
});
