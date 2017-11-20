import { mount } from 'enzyme';
import React from 'react';
import { AkCustomDrawer } from '../../../src/index';
import { drawerIconOffset } from '../../../src/shared-variables';
import Drawer from '../../../src/components/js/Drawer';
import requiredProps from '../_drawer-util';

describe('<CustomDrawer />', () => {
  describe('the inner Drawer', () => {
    it('width="narrow" should pass width="narrow" to the inner drawer', () => {
      expect(mount(
        <AkCustomDrawer {...requiredProps} width="narrow" />
      ).find(Drawer).props().width).toBe('narrow');
    });
    it('width="wide" should pass width="wide" to the inner drawer', () => {
      expect(mount(
        <AkCustomDrawer {...requiredProps} width="wide" />
      ).find(Drawer).props().width).toBe('wide');
    });
    it('width="full" should pass width="full" to the inner drawer', () => {
      expect(mount(
        <AkCustomDrawer {...requiredProps} width="full" />
      ).find(Drawer).props().width).toBe('full');
    });
    it('no width set should pass width="wide" to the inner drawer', () => {
      expect(mount(
        <AkCustomDrawer {...requiredProps} />
      ).find(Drawer).props().width).toBe('wide');
    });
    it('should render the backIcon in the correct position default to false', () => {
      expect(mount(
        <AkCustomDrawer {...requiredProps} />
      ).find(Drawer).props().iconOffset).toBe(drawerIconOffset);
    });
  });
});
