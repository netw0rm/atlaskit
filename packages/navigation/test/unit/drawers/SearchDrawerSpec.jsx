import { mount } from 'enzyme';
import React from 'react';
import { AkSearchDrawer } from '../../../src/index';
import { searchIconOffset } from '../../../src/shared-variables';
import Drawer from '../../../src/components/js/Drawer';
import requiredProps from '../_drawer-util';

describe('<SearchDrawer />', () => {
  describe('the inner Drawer', () => {
    it('isFullWidth should pass width="full" to the inner drawer', () => {
      expect(mount(
        <AkSearchDrawer {...requiredProps} isFullWidth />
      ).find(Drawer).props().width).toBe('full');
    });
    it('isFullWidth={false} should pass width="wide" to the inner drawer', () => {
      expect(mount(
        <AkSearchDrawer {...requiredProps} isFullWidth={false} />
      ).find(Drawer).props().width).toBe('wide');
    });
    it('should render the backIcon in the correct position default to false', () => {
      expect(mount(
        <AkSearchDrawer {...requiredProps} />
      ).find(Drawer).props().iconOffset).toBe(searchIconOffset);
    });
  });
});
