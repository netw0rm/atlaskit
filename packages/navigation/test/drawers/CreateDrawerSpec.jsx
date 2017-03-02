import { mount } from 'enzyme';
import React from 'react';
import { AkCreateDrawer } from '../../src/index';
import { createIconOffset } from '../../src/shared-variables';

describe('<CreateDrawer />', () => {
  describe('the inner Drawer', () => {
    it('isWide should default to false', () => {
      expect(mount(<AkCreateDrawer />).find('Drawer').props().isWide).to.equal(false);
    });
    it('should render the backIcon in the correct position default to false', () => {
      expect(mount(<AkCreateDrawer />).find('Drawer').props().backIconOffset).to.equal(createIconOffset);
    });
  });
});
