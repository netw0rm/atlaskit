import React from 'react';
import sinon from 'sinon';
import {
  AkNavigationItem,
  AkNavigationItemGroup,
  AkSearchResults,
} from '../../src';
import AdvancedSearchOptions from '../../src/components/js/AdvancedSearchOptions';
import { mountWithRootTheme } from './_theme-util';

const noOp = () => {};

describe('AdvancedSearchOptions', () => {
  it('should compose SearchResults', () => {
    expect(mountWithRootTheme(<AdvancedSearchOptions />).find(AkSearchResults)).toHaveLength(1);
  });

  it('should pass through all props except options and title to SearchResults', () => {
    const testHandleMouseEnter = () => {};
    const testHandleMouseLeave = () => {};
    const searchResultsWrapper = mountWithRootTheme(
      <AdvancedSearchOptions
        isResultHoverStylesDisabled
        onResultMouseEnter={testHandleMouseEnter}
        onResultMouseLeave={testHandleMouseLeave}
        selectedItemId="13"
      />).find(AkSearchResults);
    expect(searchResultsWrapper.prop('isResultHoverStylesDisabled')).toBe(true);
    expect(searchResultsWrapper.prop('onResultMouseEnter')).toBe(testHandleMouseEnter);
    expect(searchResultsWrapper.prop('onResultMouseLeave')).toBe(testHandleMouseLeave);
    expect(searchResultsWrapper.prop('selectedItemId')).toBe('13');
  });

  it('should render the options', () => {
    const wrapper = mountWithRootTheme(
      <AdvancedSearchOptions
        options={[
          {
            resultId: 'test1',
            name: 'test option 1',
            onClick: noOp,
          },
          {
            resultId: 'test2',
            name: 'test option 2',
            onClick: noOp,
          },
        ]}
      />);
    const navItems = wrapper.find(AkNavigationItem);
    expect(navItems.at(0).text()).toEqual(expect.stringContaining('test option 1'));
    expect(navItems.at(1).text()).toEqual(expect.stringContaining('test option 2'));
  });
  it('should invoke onClick of a clicked option', () => {
    const spy1 = sinon.spy();
    const spy2 = sinon.spy();
    const wrapper = mountWithRootTheme(
      <AdvancedSearchOptions
        options={[
          {
            resultId: 'test1',
            name: 'test option 1',
            onClick: spy1,
          },
          {
            resultId: 'test2',
            name: 'test option 2',
            onClick: spy2,
          },
        ]}
      />);
    wrapper.find(AkNavigationItem).find('Item').map(item => item.simulate('click'));
    expect(spy1.callCount).toBe(1);
    expect(spy2.callCount).toBe(1);
  });
  it('should render the default result group title if `title` prop is not supplied', () => {
    const wrapper = mountWithRootTheme(
      <AdvancedSearchOptions
        options={[
          {
            resultId: 'test1',
            name: 'test option 1',
            onClick: noOp,
          },
          {
            resultId: 'test2',
            name: 'test option 2',
            onClick: noOp,
          },
        ]}
      />);
    expect(wrapper.find(AkNavigationItemGroup).prop('title')).toBe(AdvancedSearchOptions.defaultProps.title);
  });
  it('should render provided `title` prop', () => {
    const wrapper = mountWithRootTheme(
      <AdvancedSearchOptions
        options={[
          {
            resultId: 'test1',
            name: 'test option 1',
            onClick: noOp,
          },
        ]}
        title="test custom title"
      />);
    expect(wrapper.find(AkNavigationItemGroup).prop('title')).toBe('test custom title');
  });
});
