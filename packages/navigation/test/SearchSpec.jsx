import React from 'react';
import { mount } from 'enzyme';
import { waitUntil } from '@atlaskit/util-common-test';
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

  describe('busy state and busy icon', () => {
    const BusyIcon = () => <div id="busy-icon" />;
    const ClearIcon = () => <div id="clear-icon" />;
    const SearchWithBusyIcon = props => (
      <Search
        busyIcon={<BusyIcon />}
        clearIcon={<ClearIcon />}
        delayBusyStateBy={0}
        {...props}
      />
    );
    const contains = wrapper => selector => wrapper.find(selector).length > 0;

    it('should show busy icon instead of clear icon when busy', (done) => {
      const wrapper = mount(<SearchWithBusyIcon isBusy />);
      const wrapperContains = contains(wrapper);
      waitUntil(() => wrapperContains(BusyIcon))
        .then(() => {
          expect(wrapper.find(BusyIcon)).to.have.length(1);
          expect(wrapper.find(ClearIcon)).to.have.length(0);
          done();
        }, 0);
    });
    it('should show clear icon when not busy', (done) => {
      const wrapper = mount(<SearchWithBusyIcon isBusy={false} />);
      const wrapperContains = contains(wrapper);
      waitUntil(() => wrapperContains(ClearIcon))
        .then(() => {
          expect(wrapper.find(BusyIcon)).to.have.length(0);
          expect(wrapper.find(ClearIcon)).to.have.length(1);
          done();
        }, 0);
    });
    it('should switch from busy icon to clear icon when busy, on mouse enter', (done) => {
      const wrapper = mount(<SearchWithBusyIcon isBusy />);
      const wrapperContains = contains(wrapper);
      const mouseEventDivWrapper = wrapper.find(ClearIcon).parent();

      waitUntil(() => wrapperContains(BusyIcon))
        .then(() => { mouseEventDivWrapper.simulate('mouseenter'); });

      waitUntil(() => wrapperContains(ClearIcon))
        .then(() => {
          expect(wrapper.find(BusyIcon)).to.have.length(0);
          expect(wrapper.find(ClearIcon)).to.have.length(1);
          done();
        }, 0);
    });
    it('should switch back to busy icon on mouse leave', (done) => {
      const wrapper = mount(<SearchWithBusyIcon isBusy />);
      const wrapperContains = contains(wrapper);
      const mouseEventDivWrapper = wrapper.find(ClearIcon).parent();
      waitUntil(() => wrapperContains(BusyIcon))
        .then(() => { mouseEventDivWrapper.simulate('mouseenter'); })
        .then(() => {
          waitUntil(() => wrapperContains(ClearIcon))
          .then(() => { mouseEventDivWrapper.simulate('mouseleave'); })
          .then(() => {
            waitUntil(() => wrapperContains(BusyIcon))
              .then(() => {
                expect(wrapper.find(BusyIcon)).to.have.length(1);
                expect(wrapper.find(ClearIcon)).to.have.length(0);
                done();
              }, 0);
          });
        });
    });
    it('should show clear icon when busy if no busy icon is supplied', (done) => {
      const wrapper = mount(
        <Search
          isBusy
          clearIcon={<ClearIcon />}
          delayBusyStateBy={0}
        />
      );
      const wrapperContains = contains(wrapper);
      waitUntil(() => wrapperContains(ClearIcon))
        .then(() => {
          expect(wrapper.find(BusyIcon)).to.have.length(0);
          expect(wrapper.find(ClearIcon)).to.have.length(1);
          done();
        }, 0);
    });
  });
});
