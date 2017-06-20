import React from 'react';
import { AkQuickSearch, AkSearch, AkSearchResults } from '../../src';
import { mountWithRootTheme } from '../theme-util';

const noOp = () => {};

const searchProps = {
  isLoading: true,
  onChange: noOp,
  onSearchClear: noOp,
  placeholder: 'Placeholder',
  value: '13',
};

const resultsProps = {
  results: [
    {
      title: 'group title',
      items: [],
    },
    {
      title: 'group title',
      items: [],
    },
  ],
};

describe('Quick Search', () => {
  it('should contain a Search component and pass through the appropriate props', () => {
    const wrapper = mountWithRootTheme(<AkQuickSearch {...searchProps} />);
    expect(wrapper.find(AkSearch).props()).to.deep.include(searchProps);
  });

  it('should contain a SearchResults component and pass through the appropriate props', () => {
    const wrapper = mountWithRootTheme(<AkQuickSearch {...searchProps} {...resultsProps} />);
    expect(wrapper.find(AkSearchResults).props()).to.deep.include(resultsProps);
  });
});
