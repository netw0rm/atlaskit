import React from 'react';
import {
  AkQuickSearch,
  AkNavigationItem,
  AkNavigationItemGroup,
  AkSearch,
  resultTypes,
} from '../../src';
import { mountWithRootTheme } from './_theme-util';

const { PersonResult } = resultTypes;

const noOp = () => {};

const isInputFocused = wrapper =>
  wrapper.find('input').getDOMNode() === document.activeElement;

describe('<QuickSearch />', () => {
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
  const QsComponent = (
    <AkQuickSearch onSearchInput={noOp}>
      {exampleChildren}
    </AkQuickSearch>
  );

  let wrapper;
  let searchInput;

  beforeEach(() => {
    wrapper = mountWithRootTheme(QsComponent);
    searchInput = wrapper.find(AkSearch).find('input');
  });

  afterEach(() => {
    onClickSpy.mockClear();
  });

  it('should contain a Search component', () => {
    expect(wrapper.find(AkSearch)).toHaveLength(1);
  });

  it('should render its children', () => {
    wrapper.setProps({ children: <div id="child" /> });
    expect(wrapper.find('div#child').exists()).toBe(true);
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
      wrapper.find('Item').at(0).simulate('click');
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
      wrapper.find(AkNavigationItem).at(2).find('Item').simulate('mouseenter');
      expect(wrapper.find(AkNavigationItem).filterWhere(n => n.prop('isSelected')).prop('text')).toBe('three');
    });
    it('should clear selection onMouseLeave', () => {
      wrapper.find(AkNavigationItem).at(2).find('Item').simulate('mouseleave');
      expect(wrapper.find(AkNavigationItem).filterWhere(n => n.prop('isSelected'))).toHaveLength(0);
    });
    it('should remove selection on search input blur', () => {
      searchInput.simulate('blur');
      expect(wrapper.find(AkNavigationItem).length).toBeGreaterThan(0);
      expect(wrapper.find(AkNavigationItem).filterWhere(n => n.prop('isSelected'))).toHaveLength(0);
    });
  });
});
