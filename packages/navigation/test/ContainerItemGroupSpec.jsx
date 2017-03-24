import { mount } from 'enzyme';
import React from 'react';
import {
  action,
  title,
  separator,
  hasGlobalAppearance,
  hasSettingsAppearance,
} from 'style!../src/components/less/NavigationItemGroup.less';
import NavigationItemGroup from '../src/components/js/NavigationItemGroup';

describe('<NavigationItemGroup />', () => {
  describe('props', () => {
    it('title should render a title', () => {
      expect(mount(<NavigationItemGroup title="foo" />).find(`.${title}`).text()).to.equal('foo');
    });
    it('action should render in the container item group', () => {
      expect(mount(<NavigationItemGroup action={<div className="create">Create button</div>} />).find('.create').length).to.be.above(0);
    });
    it('separator should render in the container item group', () => {
      expect(mount(<NavigationItemGroup hasSeparator />).find(`.${separator}`).length).to.equal(1);
    });
    it('with no action specified, no action should be rendered', () => {
      expect(mount(<NavigationItemGroup />).find(`.${action}`).length).to.equal(0);
    });
    it('with no separator specified, no separator should be rendered', () => {
      expect(mount(<NavigationItemGroup />).find(`.${separator}`).length).to.equal(0);
    });
    it('appearance="global" should render separator with the global appearance class', () => {
      expect((mount(<NavigationItemGroup appearance="global" hasSeparator />).find(`.${separator}`)).hasClass((hasGlobalAppearance))).to.equal(true);
    });
    it('appearance="settings" should render separator with the settings appearance class', () => {
      expect((mount(<NavigationItemGroup appearance="settings" hasSeparator />).find(`.${separator}`)).hasClass((hasSettingsAppearance))).to.equal(true);
    });
  });
});
