import { mount } from 'enzyme';
import React from 'react';
import {
  action,
  title,
  separator,
  hasGlobalAppearance,
  hasSettingsAppearance,
} from 'style!../src/components/less/ContainerItemGroup.less';
import ContainerItemGroup from '../src/components/js/ContainerItemGroup';

describe('<ContainerItemGroup />', () => {
  describe('props', () => {
    it('title should render a title', () => {
      const wrapper = mount(<ContainerItemGroup title="foo" />);
      expect(wrapper.find(`.${title}`).text()).to.equal('foo');
      wrapper.unmount();
    });
    it('action should render in the container item group', () => {
      const wrapper = mount(<ContainerItemGroup action={<div className="create">Create button</div>} />);
      expect(wrapper.find('.create').length).to.be.above(0);
      wrapper.unmount();
    });
    it('separator should render in the container item group', () => {
      const wrapper = mount(<ContainerItemGroup hasSeparator />);
      expect(wrapper.find(`.${separator}`).length).to.equal(1);
      wrapper.unmount();
    });
    it('with no action specified, no action should be rendered', () => {
      const wrapper = mount(<ContainerItemGroup />);
      expect(wrapper.find(`.${action}`).length).to.equal(0);
      wrapper.unmount();
    });
    it('with no separator specified, no separator should be rendered', () => {
      const wrapper = mount(<ContainerItemGroup />);
      expect(wrapper.find(`.${separator}`).length).to.equal(0);
      wrapper.unmount();
    });
    it('appearance="global" should render separator with the global appearance class', () => {
      const wrapper = mount(<ContainerItemGroup appearance="global" hasSeparator />);
      expect(wrapper.find(`.${separator}`).hasClass(hasGlobalAppearance)).to.equal(true);
      wrapper.unmount();
    });
    it('appearance="settings" should render separator with the settings appearance class', () => {
      const wrapper = mount(<ContainerItemGroup appearance="settings" hasSeparator />);
      expect(wrapper.find(`.${separator}`).hasClass(hasSettingsAppearance)).to.equal(true);
      wrapper.unmount();
    });
  });
});
