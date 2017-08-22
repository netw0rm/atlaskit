import React from 'react';
import { shallow } from 'enzyme';
import NavigationOverflowHandler from '../../src/components/js/NavigationOverflowHandler';

describe('<AkCollapseOverflow />', () => {
  describe('height detector handling', () => {
    it('handleAvailableHeight should take into account vertical padding, button height, and reserved gap height', () => {
      const buttonHeight = 32;
      const reservedGapHeight = 32;

      const instance = shallow(
        <NavigationOverflowHandler />
      ).instance();

      instance.handleAvailableHeight(100);
      expect(instance.availableHeight).toBe(
        100 - buttonHeight - reservedGapHeight
      );

      instance.handleAvailableHeight(200);
      expect(instance.availableHeight).toBe(
        200 - buttonHeight - reservedGapHeight
      );
    });

    it('handleChildHeight should store detected height at correct array position', () => {
      const instance = shallow(<NavigationOverflowHandler />).instance();
      instance.handleChildHeight(0)(10);
      instance.handleChildHeight(1)(20);
      instance.handleChildHeight(0)(30);
      instance.handleChildHeight(2)(40);
      instance.handleChildHeight(3)(100);
      instance.handleChildHeight(3)(50);
      expect(instance.childHeights).toEqual([30, 20, 40, 50]);
    });
  });
  describe('calculateIndexOfLastVisibleChild', () => {
    let instance;

    beforeEach(() => {
      instance = shallow(
        <NavigationOverflowHandler>
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </NavigationOverflowHandler>
      ).instance();
      instance.availableHeight = 0;
      instance.childHeights = [10, 10, 10, 10, 10, 10, 10];
    });

    it('should include all children if availableHeight is zero', () => {
      instance.calculateIndexOfLastVisibleChild();
      expect(instance.state.indexOfLastVisibleChild).toBe(6);
    });
    it('should include all children if not all children heights have been detected', () => {
      instance.childHeights = [10, 10, 10];
      instance.calculateIndexOfLastVisibleChild();
      expect(instance.state.indexOfLastVisibleChild).toBe(6);
    });
    it('should include as many children that will fit in availableHeight', () => {
      instance.availableHeight = 45;
      instance.calculateIndexOfLastVisibleChild();
      expect(instance.state.indexOfLastVisibleChild).toBe(3);
    });
    it('should include all children if they will all fit', () => {
      instance.availableHeight = 70;
      instance.calculateIndexOfLastVisibleChild();
      expect(instance.state.indexOfLastVisibleChild).toBe(6);
    });
  });

  describe('needsDropdown()', () => {
    let instance;
    beforeEach(() => {
      instance = shallow(
        <NavigationOverflowHandler>
          <span />
          <span />
          <span />
          <span />
        </NavigationOverflowHandler>
      ).instance();
      instance.availableHeight = 20;
      instance.childHeights = [10, 10, 10, 10];
    });

    it('should be true if there are more children than can fit', () => {
      instance.calculateIndexOfLastVisibleChild();
      expect(instance.needsDropdown()).toBe(true);
    });

    it('should be false if all children can fit', () => {
      instance.availableHeight = 40;
      instance.calculateIndexOfLastVisibleChild();
      expect(instance.needsDropdown()).toBe(false);
    });
  });

  describe('rendering and passing props', () => {
    describe('OverflowDropdown', () => {
      let wrapper;

      beforeEach(() => {
        wrapper = shallow(
          <NavigationOverflowHandler>
            <span />
          </NavigationOverflowHandler>
        );
        wrapper.instance().handleChildHeight(0)(20);
      });

      it('should be rendered if dropdown is needed', () => {
        wrapper.instance().handleAvailableHeight(10);
        expect(wrapper.find('NavigationOverflowDropdown').length).toBe(1);
      });

      it('should not be rendered if no dropdown is needed', () => {
        wrapper.instance().handleAvailableHeight(100);
        expect(wrapper.find('NavigationOverflowDropdown').length).toBe(0);
      });
    });

    describe('HeightDetector', () => {
      it('should apply certain props only to the root HeightDetector', () => {
        const wrapper = shallow(
          <NavigationOverflowHandler>
            <span />
          </NavigationOverflowHandler>
        );
        const detectors = wrapper.find('HeightDetector');

        expect(detectors.at(0).prop('shouldDetectResize')).toBe(true);
        expect(detectors.at(1).prop('shouldDetectResize')).toBe(undefined);

        expect(detectors.at(0).prop('shouldFillHeight')).toBe(true);
        expect(detectors.at(1).prop('shouldFillHeight')).toBe(undefined);
      });
    });
  });
});
