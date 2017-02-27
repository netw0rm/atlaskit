import { mount } from 'enzyme';
import React from 'react';
import { AkCustomDrawer } from '../../src/index';
import { searchIconOffset } from '../../src/shared-variables';

describe('<CustomDrawer />', () => {
  describe('the inner Drawer', () => {
    it('isWide should default to false', () => {
      expect(mount(<AkCustomDrawer />).find('Drawer').props().isWide).to.equal(false);
    });
    it('should render the backIcon in the correct position default to false', () => {
      expect(mount(<AkCustomDrawer />).find('Drawer').props().backIconOffset).to.equal(searchIconOffset);
    });
  });
});
