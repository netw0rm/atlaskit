import { mount } from 'enzyme';
import React from 'react';
import {
  action,
  title,
  separator,
  hasGlobalAppearance,
  hasProjectSettingsAppearance,
} from 'style!../src/components/less/ContainerItemGroup.less';
import ContainerItemGroup from '../src/components/js/ContainerItemGroup';

describe('<ContainerItemGroup />', () => {
  describe('props', () => {
    it('title should render a title', () => {
      expect(mount(<ContainerItemGroup title="foo" />).find(`.${title}`).text()).to.equal('foo');
    });
    it('action should render in the container item group', () => {
      expect(mount(<ContainerItemGroup action={<div className="create">Create button</div>} />).find('.create').length).to.be.above(0);
    });
    it('separator should render in the container item group', () => {
      expect(mount(<ContainerItemGroup hasSeparator />).find(`.${separator}`).length).to.equal(1);
    });
    it('with no action specified, no action should be rendered', () => {
      expect(mount(<ContainerItemGroup />).find(`.${action}`).length).to.equal(0);
    });
    it('with no separator specified, no separator should be rendered', () => {
      expect(mount(<ContainerItemGroup />).find(`.${separator}`).length).to.equal(0);
    });
    it('appearance="global" should render separator with the global appearance class', () => {
      expect((mount(<ContainerItemGroup appearance="global" hasSeparator />).find(`.${separator}`)).hasClass((hasGlobalAppearance))).to.equal(true);
    });
    it('appearance="settings" should render separator with the settings appearance class', () => {
      expect((mount(<ContainerItemGroup appearance="settings" hasSeparator />).find(`.${separator}`)).hasClass((hasProjectSettingsAppearance))).to.equal(true);
    });
  });
});
