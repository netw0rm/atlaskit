import React from 'react';
import { AkSearch } from '../../src';
import { mountWithRootTheme } from '../theme-util';

describe('Search', () => {
  let defaultProps;
  let wrapper;

  beforeEach(() => {
    const noOp = () => {};
    defaultProps = {
      children: <div />,
      isLoading: false,
      onChange: noOp,
      onSearchClear: noOp,
      placeholder: 'Search Placeholder',
      value: '',
    };

    wrapper = mountWithRootTheme(<AkSearch {...defaultProps} />);
  });

  describe('Placeholder', () => {
    it('should be visible if value is empty', () => {
      expect(wrapper.find('SearchPlaceholder').props().style).to.deep.equal({ opacity: 1 });
    });

    it('should be invisible if value is non-empty', () => {
      wrapper.setProps({ value: 'non empty value' });
      expect(wrapper.find('SearchPlaceholder').props().style).to.deep.equal({ opacity: 0 });
    });

    it('should render passed placeholder text', () => {
      expect(wrapper.find('SearchPlaceholder').text()).to.equal(defaultProps.placeholder);
    });
  });

  describe('SearchInput', () => {
    it('should accept onChange prop from parrent component as onInput prop', () => {
      const searchInput = wrapper.find('SearchInput');
      expect(searchInput.props().onInput).to.equal(defaultProps.onChange);
    });
  });
});
