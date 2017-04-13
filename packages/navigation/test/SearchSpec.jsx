import React from 'react';
import { mount } from 'enzyme';
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

  describe('controlling focus', () => {
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

  describe('clearing input', () => {
    let onSearchClearStub;
    let wrapper;

    const wasInputCleared = () =>
      isInputFocused(wrapper) &&
      getInputText(wrapper) === '' &&
      onSearchClearStub.called;

    beforeEach(() => {
      onSearchClearStub = sinon.spy(() => {
        wrapper.setProps({ value: '' });
      });

      wrapper = mount(
        <Search
          onChange={noop}
          onSearchClear={onSearchClearStub}
          shouldFocusInput
          value="hello"
        />
      );
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it('should clear the input and give focus to the input field when clicking the clear button', () => {
      wrapper.find('SearchClearButton').simulate('mousedown');

      expect(wasInputCleared()).to.equal(true);
    });

    it('should not clear the input when the input is clicked', () => {
      wrapper.find('input').simulate('mousedown');

      expect(wasInputCleared()).to.equal(false);
    });

    describe('on clear button keypress', () => {
      it('should clear the input and give focus to the input field when the user hits "Enter"', () => {
        const button = wrapper.find('SearchClearButton');

        // pulling focus away from input explicity
        button.getDOMNode().focus();
        button.simulate('keydown', { key: 'Enter' });

        expect(wasInputCleared()).to.equal(true);
      });

      it('should not clear the input or give focus if the user hits a key other than "ENTER"', () => {
        const button = wrapper.find('SearchClearButton');

        // pulling focus away from input explicity
        button.getDOMNode().focus();
        button.simulate('keyup', { key: 'a' });
        button.simulate('keyup', { key: ' ' });
        button.simulate('keyup', { key: 'Tab' });

        expect(wasInputCleared()).to.equal(false);
      });
    });

    describe('clearing the input text with the keyboard', () => {
      it('should clear the input if a user hits "ESCAPE"', () => {
        wrapper.find('input').simulate('keydown', { key: 'Escape' });

        expect(wasInputCleared()).to.equal(true);
      });

      it('should clear the input if a user hits a key other than "ESCAPE"', () => {
        wrapper.find('input').simulate('keydown', { key: 'Enter' });
        wrapper.find('input').simulate('keydown', { key: 'a' });
        wrapper.find('input').simulate('keydown', { key: 'Tab' });

        expect(wasInputCleared()).to.equal(false);
      });
    });
  });
});
