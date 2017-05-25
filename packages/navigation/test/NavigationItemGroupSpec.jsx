import React from 'react';
import NavigationItemGroup from '../src/components/js/NavigationItemGroup';
import { mountWithTheme } from './theme-util';

describe('<NavigationItemGroup />', () => {
  describe('props', () => {
    it('title should render a title', () => {
      expect(mountWithTheme(<NavigationItemGroup title="foo" />).find('NavigationItemGroupTitle').text()).to.equal('foo');
    });
    it('action should render in the container item group', () => {
      expect(mountWithTheme(<NavigationItemGroup action={<div className="create">Create button</div>} />).find('.create').length).to.be.above(0);
    });
    it('separator should render in the container item group', () => {
      expect(mountWithTheme(<NavigationItemGroup hasSeparator />).find('NavigationItemGroupSeparator').length).to.equal(1);
    });
    it('with no action specified, no action should be rendered', () => {
      expect(mountWithTheme(<NavigationItemGroup />).find('NavigationItemGroupAction').length).to.equal(0);
    });
    it('with no separator specified, no separator should be rendered', () => {
      expect(mountWithTheme(<NavigationItemGroup />).find('NavigationItemGroupSeparator').length).to.equal(0);
    });
  });
});
