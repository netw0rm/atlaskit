import { mount } from 'enzyme';
import React from 'react';
import { AkCustomDrawer } from '../../src/index';
import { searchIconOffset } from '../../src/shared-variables';

describe('<CustomDrawer />', () => {
  describe('the inner Drawer', () => {
    it('width="narrow" should pass width="narrow" to the inner drawer', () => {
      const wrapper = mount(<AkCustomDrawer width="narrow" />);
      expect(wrapper.find('Drawer').props().width).to.equal('narrow');
      wrapper.unmount();
    });
    it('width="wide" should pass width="wide" to the inner drawer', () => {
      const wrapper = mount(<AkCustomDrawer width="wide" />);
      expect(wrapper.find('Drawer').props().width).to.equal('wide');
      wrapper.unmount();
    });
    it('width="full" should pass width="full" to the inner drawer', () => {
      const wrapper = mount(<AkCustomDrawer width="full" />);
      expect(wrapper.find('Drawer').props().width).to.equal('full');
      wrapper.unmount();
    });
    it('no width set should pass width="wide" to the inner drawer', () => {
      const wrapper = mount(<AkCustomDrawer />);
      expect(wrapper.find('Drawer').props().width).to.equal('wide');
      wrapper.unmount();
    });
    it('should render the backIcon in the correct position default to false', () => {
      const wrapper = mount(<AkCustomDrawer />);
      expect(wrapper.find('Drawer').props().backIconOffset).to.equal(searchIconOffset);
      wrapper.unmount();
    });
  });
});
