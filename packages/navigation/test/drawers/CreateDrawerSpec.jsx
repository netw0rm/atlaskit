import { mount } from 'enzyme';
import React from 'react';
import { AkCreateDrawer } from '../../src/index';
import { createIconOffset } from '../../src/shared-variables';

describe('<CreateDrawer />', () => {
  describe('the inner Drawer', () => {
    it('isFullWidth should pass width="full" to the inner drawer', () => {
      const wrapper = mount(<AkCreateDrawer isFullWidth />);
      expect(wrapper.find('Drawer').props().width).to.equal('full');
      wrapper.unmount();
    });
    it('isFullWidth={false} should pass width="narrow" to the inner drawer', () => {
      const wrapper = mount(<AkCreateDrawer isFullWidth={false} />);
      expect(wrapper.find('Drawer').props().width).to.equal('narrow');
      wrapper.unmount();
    });
    it('should render the backIcon in the correct position default to false', () => {
      const wrapper = mount(<AkCreateDrawer />);
      expect(wrapper.find('Drawer').props().backIconOffset).to.equal(createIconOffset);
      wrapper.unmount();
    });
  });
});
