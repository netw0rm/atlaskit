import { mount } from 'enzyme';
import React from 'react';
import NavigationItemGroup from '../src/components/js/NavigationItemGroup';

describe('<NavigationItemGroup />', () => {
  describe('props', () => {
    it('title should render a title', () => {
      expect(mount(<NavigationItemGroup title="foo" />).find('NavigationItemGroupTitle').text()).to.equal('foo');
    });
    it('action should render in the container item group', () => {
      expect(mount(<NavigationItemGroup action={<div className="create">Create button</div>} />).find('.create').length).to.be.above(0);
    });
    it('separator should render in the container item group', () => {
      expect(mount(<NavigationItemGroup hasSeparator />).find('NavigationItemGroupSeparator').length).to.equal(1);
    });
    it('with no action specified, no action should be rendered', () => {
      expect(mount(<NavigationItemGroup />).find('NavigationItemGroupAction').length).to.equal(0);
    });
    it('with no separator specified, no separator should be rendered', () => {
      expect(mount(<NavigationItemGroup />).find('NavigationItemGroupSeparator').length).to.equal(0);
    });
  });
});
