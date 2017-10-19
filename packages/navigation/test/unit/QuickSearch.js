import React from 'react';
import PropTypes from 'prop-types';
import {
  AkQuickSearch,
  AkNavigationItem,
  AkNavigationItemGroup,
  AkSearch,
  quickSearchResultTypes,
} from '../../src';
import {
  QS_ANALYTICS_EV_CLOSE,
  QS_ANALYTICS_EV_KB_CTRLS_USED,
  QS_ANALYTICS_EV_OPEN,
  QS_ANALYTICS_EV_QUERY_ENTERED,
  QS_ANALYTICS_EV_SUBMIT,
} from '../../src/components/js/quick-search/constants';
import { mountWithRootTheme } from './_theme-util';

const { PersonResult } = quickSearchResultTypes;

const noOp = () => {};

const isInputFocused = wrapper =>
  wrapper.find('input').getDOMNode() === document.activeElement;

describe('<QuickSearch />', () => {
  const onAnalyticsEventSpy = jest.fn();
  const onClickSpy = jest.fn();

  const exampleChildren = [
    (<AkNavigationItemGroup title="test group 1">
      <PersonResult resultId="1" name="one" onClick={onClickSpy} />
      <PersonResult resultId="2" name="two" onClick={onClickSpy} />
    </AkNavigationItemGroup>),
    (<AkNavigationItemGroup title="test group 2">
      <PersonResult resultId="3" name="three" onClick={onClickSpy} />
    </AkNavigationItemGroup>),
  ];

  let wrapper;
  let searchInput;

  const render = (props) => {
    wrapper = mountWithRootTheme(
      (
        <AkQuickSearch {...props} onSearchInput={noOp}>
          {(props && props.children) || exampleChildren}
        </AkQuickSearch>
      ),
      undefined,
      {
        context: { onAnalyticsEvent: onAnalyticsEventSpy },
        childContextTypes: { onAnalyticsEvent: PropTypes.func },
      }
    );
    searchInput = wrapper.find(AkSearch).find('input');
  };

  beforeEach(() => {
    render();
  });

  afterEach(() => {
    onAnalyticsEventSpy.mockReset();
    onClickSpy.mockReset();
  });

  it('should contain a Search component', () => {
    expect(wrapper.find(AkSearch)).toHaveLength(1);
  });

  describe('(Prop) children', () => {
    it('should render its children', () => {
      render({ children: <div id="child" /> });
      expect(wrapper.find('div#child').exists()).toBe(true);
    });
    it('should support non-component children', () => {
      render({ children: 'child' });
      /* Expect that no errors occur while parsing children */
    });
    it('should support non-component grandchildren', () => {
      render({ children: <div>grandchild</div> });
      /* Expect that no errors occur while parsing children */
    });
  });

  describe('Analytics events', () => {
    const getLastEventFired = () => {
      const calls = onAnalyticsEventSpy.mock.calls;
      return calls[calls.length - 1];
    };
    const expectEventFiredLastToBe = (name) => expect(getLastEventFired()[0]).toBe(name);
    it('should fire event on mount', () => {
      expectEventFiredLastToBe(QS_ANALYTICS_EV_OPEN);
    });
    it('should fire event on unmount', () => {
      wrapper.unmount();
      expectEventFiredLastToBe(QS_ANALYTICS_EV_CLOSE);
    });
    describe('submit/click event', () => {
      it('should fire event on result click', () => {
        const result = wrapper.find(AkNavigationItem).first();
        result.simulate('click');
        expectEventFiredLastToBe(QS_ANALYTICS_EV_SUBMIT);
      });
      it('should carry payload of resultCount, queryLength, index and type', () => {
        const result = wrapper.find(AkNavigationItem).first();
        result.simulate('click');
        const eventData = getLastEventFired()[1];
        expect(eventData).toMatchObject({
          index: expect.any(Number),
          queryLength: expect.any(Number),
          resultCount: expect.any(Number),
          type: expect.any(String),
        });
      });
    });
    describe('submit/keyboard event', () => {
      it('should fire event on submit ENTER key stroke', () => {
        searchInput.simulate('keydown', { key: 'Enter' });
        expectEventFiredLastToBe(QS_ANALYTICS_EV_SUBMIT);
      });
      it('should carry payload of resultCount, queryLength, index and type', () => {
        searchInput.simulate('keydown', { key: 'Enter' });
        const eventData = getLastEventFired()[1];
        expect(eventData).toMatchObject({
          index: expect.any(Number),
          queryLength: expect.any(Number),
          resultCount: expect.any(Number),
          type: expect.any(String),
        });
      });
    });
    describe('keyboard-controls-used event', () => {
      it('ArrowUp', () => {
        searchInput.simulate('keydown', { key: 'ArrowUp' });
        expectEventFiredLastToBe(QS_ANALYTICS_EV_KB_CTRLS_USED);
      });

      it('ArrowDown', () => {
        searchInput.simulate('keydown', { key: 'ArrowDown' });
        expectEventFiredLastToBe(QS_ANALYTICS_EV_KB_CTRLS_USED);
      });

      it('Enter', () => {
        searchInput.simulate('keydown', { key: 'Enter' });
        const calls = onAnalyticsEventSpy.mock.calls;
        // -2 because the MOST recent event should be the submit event
        expect(calls[calls.length - 2][0]).toBe(QS_ANALYTICS_EV_KB_CTRLS_USED);
      });

      it('should only fire once per mount', () => {
        searchInput.simulate('keydown', { key: 'ArrowUp' });
        searchInput.simulate('keydown', { key: 'ArrowUp' });
        searchInput.simulate('keydown', { key: 'ArrowUp' });
        const kbCtrlsUsedEventsFired = onAnalyticsEventSpy.mock.calls.filter(call =>
          call[0] === QS_ANALYTICS_EV_KB_CTRLS_USED
        );
        expect(kbCtrlsUsedEventsFired).toHaveLength(1);
      });
    });
    describe('query-entered event', () => {
      it('should fire when search term is entered', () => {
        wrapper.setProps({ value: 'hello' });
        expectEventFiredLastToBe(QS_ANALYTICS_EV_QUERY_ENTERED);
      });
      it('should not fire if previous search term was not empty', () => {
        // Set up non-empty-query state.
        render({ value: 'hello' });
        // Clear events fired from mounting
        onAnalyticsEventSpy.mockReset();

        wrapper.setProps({ value: 'goodbye' });
        expect(onAnalyticsEventSpy).not.toHaveBeenCalled();
      });
      it('should only fire once per mount', () => {
        wrapper.setProps({ value: 'hello' });
        expectEventFiredLastToBe(QS_ANALYTICS_EV_QUERY_ENTERED);
        onAnalyticsEventSpy.mockReset();

        wrapper.setProps({ value: '' });
        wrapper.setProps({ value: 'is anybody home?' });
        wrapper.setProps({ value: '' });
        wrapper.setProps({ value: 'HELLOOO?' });
        expect(onAnalyticsEventSpy).not.toHaveBeenCalled();
      });
    });
  });

  describe('Keyboard controls', () => {
    it('should select the first result by default', () => {
      expect(wrapper.find(AkNavigationItem).filterWhere(n => n.prop('isSelected')).prop('text')).toBe('one');
      expect(isInputFocused(searchInput)).toBe(true);
    });
    it('should select the next result on DOWN keystroke', () => {
      wrapper.find(AkSearch).find('input').simulate('keydown', { key: 'ArrowDown' });
      expect(wrapper.find(AkNavigationItem).filterWhere(n => n.prop('isSelected')).prop('text')).toBe('two');
      expect(isInputFocused(searchInput)).toBe(true);
    });
    it('should select the previous result on UP keystroke', () => {
      searchInput.simulate('keydown', { key: 'ArrowDown' });
      searchInput.simulate('keydown', { key: 'ArrowUp' });
      expect(wrapper.find(AkNavigationItem).filterWhere(n => n.prop('isSelected')).prop('text')).toBe('one');
      expect(isInputFocused(searchInput)).toBe(true);
    });
    it('should wrap around to the top when traversing forward past the last result', () => {
      searchInput.simulate('keydown', { key: 'ArrowDown' });
      searchInput.simulate('keydown', { key: 'ArrowDown' });
      searchInput.simulate('keydown', { key: 'ArrowDown' });
      expect(wrapper.find(AkNavigationItem).filterWhere(n => n.prop('isSelected')).prop('text')).toBe('one');
      expect(isInputFocused(searchInput)).toBe(true);
    });
    it('should wrap around to the end when traversing backward past the first result', () => {
      searchInput.simulate('keydown', { key: 'ArrowUp' });
      expect(wrapper.find(AkNavigationItem).filterWhere(n => n.prop('isSelected')).prop('text')).toBe('three');
      expect(isInputFocused(searchInput)).toBe(true);
    });
    it('should call window.location.assign() with item`s href property', () => {
      const locationAssignSpy = jest.spyOn(window.location, 'assign');
      try {
        const url = 'http://www.atlassian.com';
        wrapper.setProps({
          children:
            (<AkNavigationItemGroup title="test group 2">
              <PersonResult resultId="b" name="test" href={url} />
            </AkNavigationItemGroup>),
        });
        searchInput.simulate('keydown', { key: 'Enter' });
        expect(locationAssignSpy).toHaveBeenCalledWith(url);
      } finally {
        locationAssignSpy.mockRestore();
      }
    });
    it('should trigger the onClick handler with the same parameters when a result is submitted via keyboards as when clicked', () => {
      searchInput.simulate('keydown', { key: 'Enter' });
      const paramsKeyboard = onClickSpy.args;
      onClickSpy.mockClear();
      wrapper.find(AkNavigationItem).at(0).simulate('click');
      expect(onClickSpy.args).toEqual(paramsKeyboard);
    });
    it('should run the onClick callback with the result\'s data on ENTER keystroke', () => {
      searchInput.simulate('keydown', { key: 'Enter' });
      expect(onClickSpy).toHaveBeenCalledTimes(1);
      expect(isInputFocused(searchInput)).toBe(true);
    });
    it('should select the first result when query changes', () => {
      const newChildren = (
        <AkNavigationItemGroup title="test group 2">
          <PersonResult resultId="4" name="four" />
          <PersonResult resultId="5" name="five" />
        </AkNavigationItemGroup>
      );
      wrapper.setProps({ children: newChildren });
      expect(wrapper.find(AkNavigationItem).filterWhere(n => n.prop('isSelected')).prop('text')).toBe('four');
      expect(isInputFocused(searchInput)).toBe(true);
    });
    it('should let mouseEnter override keyboard selection', () => {
      // First result is selected by default as established by previous test.
      // Mouse over the third result.
      wrapper.find(AkNavigationItem).at(2).find(AkNavigationItem).simulate('mouseenter');
      expect(wrapper.find(AkNavigationItem).filterWhere(n => n.prop('isSelected')).prop('text')).toBe('three');
    });
    it('should clear selection onMouseLeave', () => {
      wrapper.find(AkNavigationItem).at(2).find(AkNavigationItem).simulate('mouseleave');
      expect(wrapper.find(AkNavigationItem).filterWhere(n => n.prop('isSelected'))).toHaveLength(0);
    });
    it('should remove selection on search input blur', () => {
      searchInput.simulate('blur');
      expect(wrapper.find(AkNavigationItem).length).toBeGreaterThan(0);
      expect(wrapper.find(AkNavigationItem).filterWhere(n => n.prop('isSelected'))).toHaveLength(0);
    });
  });
});
