import { shallow, mount } from 'enzyme';
import React from 'react';
import styled from 'styled-components';
import ContainerNavigation from '../../src/components/js/ContainerNavigation';
import { globalSecondaryActions } from '../../src/shared-variables';
import { isCollapsed } from '../../src/theme/util';
import * as presets from '../../src/theme/presets';
import Reveal from '../../src/components/js/Reveal';
import GlobalNavigationSecondaryContainer from '../../src/components/styled/GlobalNavigationSecondaryContainer';
import GlobalSecondaryActions from '../../src/components/js/GlobalSecondaryActions';

describe('<ContainerNavigation />', () => {
  describe('props', () => {
    it('should default theme to presets.container', () => {
      expect(mount(<ContainerNavigation />).props().theme).toBe(presets.container);
    });
  });

  describe('behaviour', () => {
    describe('putting isCollapsed on the theme', () => {
      it('should set isCollapsed to false when not collapsed', () => {
        const stub = jest.fn(() => '');
        const Item = styled.div`
          property: ${({ theme }) => stub(isCollapsed(theme))}
        `;

        mount(
          <ContainerNavigation
            isCollapsed={false}
          >
            <Item />
          </ContainerNavigation>
        );

        expect(stub).toHaveBeenCalledWith(false);
      });

      it('should set isCollapsed to true when it is collapsed', () => {
        const stub = jest.fn(() => '');
        const Item = styled.div`
          property: ${({ theme }) => stub(isCollapsed(theme))}
        `;

        mount(
          <ContainerNavigation
            isCollapsed
          >
            <Item />
          </ContainerNavigation>
        );
        expect(stub).toHaveBeenCalledWith(true);
      });
    });

    it('collapses the container header when closed', () => {
      const headerComponent = jest.fn();
      shallow(<ContainerNavigation isCollapsed headerComponent={headerComponent} />);
      expect(headerComponent).toHaveBeenCalledWith({ isCollapsed: true });
    });
  });

  describe('revealing the global primary actions', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(<ContainerNavigation />);
    });

    it('should not animate the global primary actions on initial render', () => {
      expect(wrapper.find(Reveal).first().props().shouldAnimate).toBe(false);
    });

    it('should animate the global primary actions after any change', () => {
      wrapper.setProps({ showGlobalActions: true });
      expect(wrapper.find(Reveal).first().props().shouldAnimate).toBe(true);
    });
  });

  describe('revealing the global secondary actions', () => {
    let wrapper;
    let globalSecondaryReveal;

    beforeEach(() => {
      wrapper = mount(<ContainerNavigation />);
      globalSecondaryReveal = wrapper.find(GlobalNavigationSecondaryContainer).find(Reveal);
    });

    it('should not animate the global secondary actions on initial render', () => {
      expect(globalSecondaryReveal.prop('shouldAnimate')).toBe(false);
    });

    it('should animate the global secondary actions after any change', () => {
      wrapper.setProps({ showGlobalActions: true });
      expect(globalSecondaryReveal.prop('shouldAnimate')).toBe(true);
    });

    it('should set the global secondary actions container height based on the number of actions', () => {
      const expectedHeight = childCount => globalSecondaryActions.height(childCount).outer;

      expect(globalSecondaryReveal.prop('openHeight')).toBe(expectedHeight(0));

      wrapper.setProps({ globalSecondaryActions: [<div />, <div />] });
      expect(globalSecondaryReveal.prop('openHeight')).toBe(expectedHeight(2));

      wrapper.setProps({ globalSecondaryActions: [<div />, <div />, <div />] });
      expect(globalSecondaryReveal.prop('openHeight')).toBe(expectedHeight(3));
    });

    it('should only render GlobalSecondaryActions if showGlobalActions is true and globalSecondaryActions has item(s)', () => {
      expect(wrapper.find(GlobalSecondaryActions).length).toBe(0);

      wrapper.setProps({ showGlobalActions: true });
      expect(wrapper.find(GlobalSecondaryActions).length).toBe(0);

      wrapper.setProps({ globalSecondaryActions: [<div />] });
      expect(wrapper.find(GlobalSecondaryActions).length).toBe(1);
    });
  });
});
