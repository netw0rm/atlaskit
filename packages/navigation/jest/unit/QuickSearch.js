import React from 'react';
import sinon from 'sinon';
import {
  AkQuickSearch,
  AkQuickSearchWithKeyboardControls,
  AkNavigationItem,
  AkSearch,
  AkSearchResults,
} from '../../src';
import { mountWithRootTheme } from './_theme-util';

describe('Quick Search', () => {
  const isInputFocused = wrapper =>
    wrapper.find('input').getDOMNode() === document.activeElement;

  it('should contain a Search component', () => {
    const wrapper = mountWithRootTheme(
      <AkQuickSearch
        onSearchChange={() => {}}
        onResultClick={() => {}}
      />);
    expect(wrapper.find(AkSearch)).toHaveLength(1);
  });

  it('should contain a SearchResults component', () => {
    const wrapper = mountWithRootTheme(
      <AkQuickSearch
        onSearchChange={() => {}}
        onResultClick={() => {}}
      />);
    expect(wrapper.find(AkSearchResults)).toHaveLength(1);
  });

  describe('Keyboard controls', () => {
    const kbTestResults = [{
      title: 'test group',
      items: [
        { id: '1', type: 'person', name: 'one' },
        { id: '2', type: 'person', name: 'two' },
        { id: '3', type: 'person', name: 'three' },
      ],
    }];

    const onClickSpy = sinon.spy();
    const QsComponent = (
      <AkQuickSearchWithKeyboardControls
        onSearchChange={() => {}}
        onResultClick={onClickSpy}
        results={kbTestResults}
      />);
    let wrapper;
    let searchInput;

    beforeEach(() => {
      wrapper = mountWithRootTheme(QsComponent);
      searchInput = wrapper.find(AkSearch).find('input');
    });

    afterEach(() => {
      onClickSpy.reset();
    });

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
      wrapper.find(AkSearch).find('input').simulate('keydown', { key: 'ArrowUp' });
      expect(wrapper.find(AkNavigationItem).filterWhere(n => n.prop('isSelected')).prop('text')).toBe('three');
      expect(isInputFocused(searchInput)).toBe(true);
    });
    it('should run the onClick callback with the result\'s data on ENTER keystroke', () => {
      wrapper.find(AkSearch).find('input').simulate('keydown', { key: 'Enter' });
      expect(onClickSpy.callCount).toBe(1);
      expect(isInputFocused(searchInput)).toBe(true);
    });
    it('should select the first result when query changes', () => {
      const newResults = [{
        title: 'test group',
        items: [
          { id: '1', type: 'person', name: 'four' },
          { id: '2', type: 'person', name: 'five' },
        ],
      }];
      wrapper.setProps({ results: newResults });
      expect(wrapper.find(AkNavigationItem).filterWhere(n => n.prop('isSelected')).prop('text')).toBe('four');
      expect(isInputFocused(searchInput)).toBe(true);
    });
  });
});
