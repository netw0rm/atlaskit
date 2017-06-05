import React from 'react';
import FieldBase from '@atlaskit/field-base';
import { mountWithRootTheme } from './theme-util';
import Search from '../src/components/js/Search';

const describe = window.describe;
const it = window.it;
const expect = window.expect;

const noop = () => { };

describe('Search', () => {
  const isInputFocused = wrapper =>
    wrapper.find('input').getDOMNode() === document.activeElement;

  const getInputText = wrapper =>
    wrapper.find('input').props().value;

  it('should auto focus on mount', () => {
    const wrapper = mountWithRootTheme(<Search />);

    expect(isInputFocused(wrapper)).to.equal(true);
  });

  describe('clearing input', () => {
    let onSearchClearStub;
    let wrapper;

    const isInputFocusedAndReset = () =>
      isInputFocused(wrapper) &&
      getInputText(wrapper) === '' &&
      onSearchClearStub.called;

    beforeEach(() => {
      onSearchClearStub = sinon.spy(() => {
        wrapper.setProps({ value: '' });
      });

      wrapper = mountWithRootTheme(
        <Search
          onChange={noop}
          onSearchClear={onSearchClearStub}
          value="hello"
        />
      );
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it('should not clear the input when the input is clicked', () => {
      wrapper.find('input').simulate('mousedown');

      expect(isInputFocusedAndReset()).to.equal(false);
    });

    describe('clearing the input text with the keyboard', () => {
      it('should clear the input if a user hits "ESCAPE"', () => {
        wrapper.find('input').simulate('keydown', { key: 'Escape' });

        expect(isInputFocusedAndReset()).to.equal(true);
      });

      it('should not clear the input if a user hits a key other than "ESCAPE"', () => {
        wrapper.find('input').simulate('keydown', { key: 'Enter' });
        wrapper.find('input').simulate('keydown', { key: 'a' });
        wrapper.find('input').simulate('keydown', { key: 'Tab' });

        expect(isInputFocusedAndReset()).to.equal(false);
      });
    });

    describe('no input to clear', () => {
      it('should not call the onSearchClear callback', () => {
        wrapper.setProps({
          value: '',
        });

        wrapper.find('input').simulate('keydown', { key: 'Escape' });

        expect(onSearchClearStub.called).to.equal(false);
      });
    });
  });

  it('should pass on its isLoading prop to the internal FieldBase for it to handle', () => {
    expect(mountWithRootTheme(<Search isLoading />).find(FieldBase).at(0).prop('isLoading')).to.equal(true);
    expect(mountWithRootTheme(<Search isLoading={false} />).find(FieldBase).at(0).prop('isLoading')).to.equal(false);
  });
});
