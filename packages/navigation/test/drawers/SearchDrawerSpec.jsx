import { mount } from 'enzyme';
import React from 'react';
import { AkSearchDrawer } from '../../src/index';
import { searchIconOffset } from '../../src/shared-variables';

describe('<SearchDrawer />', () => {
  describe('the inner Drawer', () => {
    it('isWide should default to false', () => {
      expect(mount(<AkSearchDrawer />).find('Drawer').props().isWide).to.equal(true);
    });
    it('should render the backIcon in the correct position default to false', () => {
      expect(mount(<AkSearchDrawer />).find('Drawer').props().backIconOffset).to.equal(searchIconOffset);
    });
  });
});
