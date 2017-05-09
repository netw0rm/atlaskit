import React from 'react';
import { CrossIcon, SearchIcon } from '@atlaskit/icon';
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

  it('should auto focus on mount', () => {
    const wrapper = mount(<Search />);

    expect(isInputFocused(wrapper)).to.equal(true);
  });

  describe('clear button icon', () => {
    describe('has input', () => {
      let wrapper;

      beforeEach(() => {
        wrapper = mount(
          <Search
            clearIcon={<CrossIcon label="Clear" />}
            searchIcon={<SearchIcon label="Search" />}
            value="hello"
          />
        );
      });

      it('should be enabled', () => {
        expect(wrapper.find('SearchClearButton').props().disabled).to.equal(false);
      });

      it('should display the clearIcon', () => {
        expect(wrapper.find('SearchClearButton').find(CrossIcon).length).to.equal(1);
        expect(wrapper.find('SearchClearButton').find(SearchIcon).length).to.equal(0);
      });
    });

    describe('no input', () => {
      let wrapper;

      beforeEach(() => {
        wrapper = mount(
          <Search
            clearIcon={<CrossIcon label="Clear" />}
            searchIcon={<SearchIcon label="Search" />}
          />
        );
      });

      it('should be disabled', () => {
        expect(wrapper.find('SearchClearButton').props().disabled).to.equal(true);
      });

      it('should display the searchIcon', () => {
        expect(wrapper.find('SearchClearButton').find(SearchIcon).length).to.equal(1);
        expect(wrapper.find('SearchClearButton').find(CrossIcon).length).to.equal(0);
      });
    });
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

      wrapper = mount(
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
