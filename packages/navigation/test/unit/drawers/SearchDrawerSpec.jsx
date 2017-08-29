import { mount } from 'enzyme';
import React from 'react';
import { AkSearchDrawer } from '../../../src/index';
import { searchIconOffset } from '../../../src/shared-variables';
import Drawer from '../../../src/components/js/Drawer';

describe('<SearchDrawer />', () => {
  describe('the inner Drawer', () => {
    // icon for use in required icon props
    const genericIcon = <span />;

    it('isFullWidth should pass width="full" to the inner drawer', () => {
      expect(mount(
        <AkSearchDrawer
          backIcon={genericIcon}
          primaryIcon={genericIcon}
          isFullWidth
        />
      ).find(Drawer).props().width).toBe('full');
    });
    it('isFullWidth={false} should pass width="wide" to the inner drawer', () => {
      expect(mount(
        <AkSearchDrawer
          backIcon={genericIcon}
          primaryIcon={genericIcon} isFullWidth={false}
        />
      ).find(Drawer).props().width).toBe('wide');
    });
    it('should render the backIcon in the correct position default to false', () => {
      expect(mount(
        <AkSearchDrawer
          backIcon={genericIcon}
          primaryIcon={genericIcon}
        />
      ).find(Drawer).props().backIconOffset).toBe(searchIconOffset);
    });
  });
});
