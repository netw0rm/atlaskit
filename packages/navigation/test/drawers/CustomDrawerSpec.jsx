import { mount } from 'enzyme';
import React from 'react';
import { AkCustomDrawer } from '../../src/index';
import { searchIconOffset } from '../../src/shared-variables';

describe('<CustomDrawer />', () => {
  describe('the inner Drawer', () => {
    it('width="narrow" should pass width="full" to the inner drawer', () => {
      expect(mount(<AkCustomDrawer width="narrow" />).find('Drawer').props().width).to.equal('narrow');
    });
    it('width="wide" should pass width="full" to the inner drawer', () => {
      expect(mount(<AkCustomDrawer width="wide" />).find('Drawer').props().width).to.equal('wide');
    });
    it('width="full" should pass width="full" to the inner drawer', () => {
      expect(mount(<AkCustomDrawer width="full" />).find('Drawer').props().width).to.equal('full');
    });
    it('no width set should pass width="wide" to the inner drawer', () => {
      expect(mount(<AkCustomDrawer />).find('Drawer').props().width).to.equal('wide');
    });
    it('should render the backIcon in the correct position default to false', () => {
      expect(mount(<AkCustomDrawer />).find('Drawer').props().backIconOffset).to.equal(searchIconOffset);
    });
  });
});
