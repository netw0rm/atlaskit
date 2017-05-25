import React from 'react';
import { mountWithTheme } from './theme-util';
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
    const wrapper = mountWithTheme(<Search />);

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

      wrapper = mountWithTheme(
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

    it('should clear the input and give focus to the input field when clicking the clear button', () => {
      wrapper.find('SearchClearButton').simulate('mousedown');

      expect(isInputFocusedAndReset()).to.equal(true);
    });

    it('should not clear the input when the input is clicked', () => {
      wrapper.find('input').simulate('mousedown');

      expect(isInputFocusedAndReset()).to.equal(false);
    });

    describe('no input to clear', () => {
      it('should not call the onSearchClear callback', () => {
        wrapper.setProps({
          value: '',
        });

        wrapper.find('SearchClearButton').simulate('mousedown');

        expect(onSearchClearStub.called).to.equal(false);
      });

      it('should give the search input focus if it does not already have it', () => {
        // pulling focus away from input explicity
        wrapper.find('SearchClearButton').getDOMNode().focus();

        expect(isInputFocused(wrapper)).to.equal(false);

        wrapper.find('SearchClearButton').simulate('mousedown');

        expect(isInputFocused(wrapper)).to.equal(true);
      });
    });

    describe('clearing the input text with the keyboard', () => {
      it('should clear the input if a user hits "ESCAPE"', () => {
        wrapper.find('input').simulate('keydown', { key: 'Escape' });

        expect(isInputFocusedAndReset()).to.equal(true);
      });

      it('should clear the input if a user hits a key other than "ESCAPE"', () => {
        wrapper.find('input').simulate('keydown', { key: 'Enter' });
        wrapper.find('input').simulate('keydown', { key: 'a' });
        wrapper.find('input').simulate('keydown', { key: 'Tab' });

        expect(isInputFocusedAndReset()).to.equal(false);
      });
    });
  });
});
