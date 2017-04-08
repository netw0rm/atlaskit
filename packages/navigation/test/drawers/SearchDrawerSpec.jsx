import { mount } from 'enzyme';
import React from 'react';
import { AkSearchDrawer } from '../../src/index';
import { searchIconOffset } from '../../src/shared-variables';

describe('<SearchDrawer />', () => {
  describe('the inner Drawer', () => {
    it('isFullWidth should pass width="full" to the inner drawer', () => {
      const wrapper = mount(<AkSearchDrawer isFullWidth />);
      expect(wrapper.find('Drawer').props().width).to.equal('full');
      wrapper.unmount();
    });
    it('isFullWidth={false} should pass width="wide" to the inner drawer', () => {
      const wrapper = mount(<AkSearchDrawer isFullWidth={false} />);
      expect(wrapper.find('Drawer').props().width).to.equal('wide');
      wrapper.unmount();
    });
    it('should render the backIcon in the correct position default to false', () => {
      const wrapper = mount(<AkSearchDrawer />);
      expect(wrapper.find('Drawer').props().backIconOffset).to.equal(searchIconOffset);
      wrapper.unmount();
    });
  });
});
