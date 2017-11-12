import React from 'react';
import { mount } from 'enzyme';
import styled from 'styled-components';
import Spinner from '@atlaskit/spinner';
import { Container, SpinnerBackdrop } from '../../src/styled/LoadingContainerAdvanced';

import LoadingContainerAdvanced from '../../src/components/LoadingContainerAdvanced';

describe('LoadingContainerAdvanced', () => {
  const Contents = styled.div``;

  let wrappers;

  beforeEach(() => {
    wrappers = [];
  });

  afterEach(() => {
    wrappers.forEach(wrapper => wrapper.unmount());
  });

  it('should always wrap contents into the container with a relative position so absolute positioned elements inside the children behave consistently despite the loading mode', () => {
    const wrapper = mount(
      <LoadingContainerAdvanced isLoading>
        <Contents />
      </LoadingContainerAdvanced>
    );
    wrappers.push(wrapper);
    expect(wrapper.find(Container).length).toBe(1);

    wrapper.setProps({ isLoading: false });
    expect(wrapper.find(Container).length).toBe(1);
  });

  it('should always render children as is right inside the container', () => {
    const wrapper = mount(
      <LoadingContainerAdvanced isLoading={false}>
        <Contents />
      </LoadingContainerAdvanced>
    );
    wrappers.push(wrapper);
    const container = wrapper.find(Container);
    expect(container.children().is(Contents)).toBe(true);

    wrapper.setProps({ isLoading: false });
    expect(container.children().is(Contents)).toBe(true);
  });

  it('should not render the spinner container when the loading mode is off', () => {
    const wrapper = mount(
      <LoadingContainerAdvanced isLoading={false}>
        <Contents />
      </LoadingContainerAdvanced>
    );
    wrappers.push(wrapper);
    const spinnerBackdrop = wrapper.find(SpinnerBackdrop);
    expect(spinnerBackdrop.length).toBe(0);
  });

  it('should render with a proper default values', () => {
    const wrapper = mount(
      <LoadingContainerAdvanced>
        <Contents />
      </LoadingContainerAdvanced>
    );
    wrappers.push(wrapper);
    expect(wrapper.props().isLoading).toBe(true);
    expect(wrapper.find(Spinner).props().size).toBe('large');
  });

  it('should render the spinner of a given size', () => {
    const wrapper = mount(
      <LoadingContainerAdvanced spinnerSize="xlarge">
        <Contents />
      </LoadingContainerAdvanced>
    );
    wrappers.push(wrapper);
    expect(wrapper.find(Spinner).props().size).toBe('xlarge');
  });

  describe('target manipulations', () => {
    const assertTargetStylesAreCorrect = (node, isLoading) => {
      expect(node.style.opacity).toBe(isLoading ? '0.22' : '');
      expect(node.style.pointerEvents).toBe(isLoading ? 'none' : '');
    };

    it('should update styles on mount only when loading and there is a target node', () => {
      let target;
      let wrapper;

      // targetRef returns invalid target
      wrapper = mount(
        <LoadingContainerAdvanced targetRef={() => undefined}>
          <Contents />
        </LoadingContainerAdvanced>
      );
      wrappers.push(wrapper);
      assertTargetStylesAreCorrect(wrapper.find(Contents).getDOMNode(), false);

      // Not loading
      wrapper = mount(
        <LoadingContainerAdvanced isLoading={false}>
          <Contents />
        </LoadingContainerAdvanced>
      );
      wrappers.push(wrapper);
      assertTargetStylesAreCorrect(wrapper.find(Contents).getDOMNode(), false);

      // Loading and has children
      wrapper = mount(
        <LoadingContainerAdvanced>
          <Contents />
        </LoadingContainerAdvanced>
      );
      wrappers.push(wrapper);
      assertTargetStylesAreCorrect(wrapper.find(Contents).getDOMNode(), true);

      // Loading and has a valid target
      wrapper = mount(
        <LoadingContainerAdvanced targetRef={() => target}>
          <Contents innerRef={el => (target = el)} />
        </LoadingContainerAdvanced>
      );
      wrappers.push(wrapper);
      assertTargetStylesAreCorrect(wrapper.find(Contents).getDOMNode(), true);
    });

    it('should set styles to the children if the targetRef is not defined and revert them on loading mode change', () => {
      const wrapper = mount(
        <LoadingContainerAdvanced>
          <Contents />
        </LoadingContainerAdvanced>
      );
      wrappers.push(wrapper);
      assertTargetStylesAreCorrect(wrapper.find(Contents).getDOMNode(), true);
      wrapper.setProps({ isLoading: false });
      assertTargetStylesAreCorrect(wrapper.find(Contents).getDOMNode(), false);
    });

    it('should set styles to the target and revert them on loading mode change', () => {
      let target;

      const InnerComponent = styled.div``;
      const wrapper = mount(
        <LoadingContainerAdvanced targetRef={() => target}>
          <Contents>
            <InnerComponent ref={el => (target = el)} />
          </Contents>
        </LoadingContainerAdvanced>
      );
      wrappers.push(wrapper);
      assertTargetStylesAreCorrect(wrapper.find(InnerComponent).getDOMNode(), true);
      wrapper.setProps({ isLoading: false });
      assertTargetStylesAreCorrect(wrapper.find(InnerComponent).getDOMNode(), false);
    });
  });

  describe('spinner manipulations', () => {
    // TODO
  });

  describe('helpers', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(
        <LoadingContainerAdvanced targetRef={() => undefined}>
          <Contents />
        </LoadingContainerAdvanced>
      );
      wrappers.push(wrapper);
    });

    describe('isVerticallyVisible', () => {
      it('should detect whether the given rect is vertically visible (at least partially)', () => {
        const isVerticallyVisible = wrapper.instance().isVerticallyVisible;

        // Simulating scrolling down the page
        // The element is below the viewport
        expect(isVerticallyVisible({ top: 1408, bottom: 1608 }, 800)).toBe(false);
        expect(isVerticallyVisible({ top: 801, bottom: 1001 }, 800)).toBe(false);
        expect(isVerticallyVisible({ top: 800, bottom: 1000 }, 800)).toBe(false);

        // The first pixel of the element's header is visible
        expect(isVerticallyVisible({ top: 799, bottom: 999 }, 800)).toBe(true);

        // The last pixel of the element's tail is visible
        expect(isVerticallyVisible({ top: 600, bottom: 800 }, 800)).toBe(true);

        // The first pixel of the element's header is still visible
        expect(isVerticallyVisible({ top: 0, bottom: 200 }, 800)).toBe(true);

        // The last pixel of the element's header is not visible anymore
        expect(isVerticallyVisible({ top: -1, bottom: 199 }, 800)).toBe(true);

        // The last pixel of the element's tails is still visible
        expect(isVerticallyVisible({ top: -199, bottom: 1 }, 800)).toBe(true);

        // The element goes off screen
        expect(isVerticallyVisible({ top: -200, bottom: 0 }, 800)).toBe(false);
        expect(isVerticallyVisible({ top: -300, bottom: -100 }, 800)).toBe(false);
        expect(isVerticallyVisible({ top: -808, bottom: -608 }, 800)).toBe(false);
      });
    });

    describe('isFullyVerticallyVisible', () => {
      it('should detect whether the given rect is fully vertically visible', () => {
        const isFullyVerticallyVisible = wrapper.instance().isFullyVerticallyVisible;

        // Simulating scrolling down the page
        // The element is below the viewport
        expect(isFullyVerticallyVisible({ top: 1408, bottom: 1608 }, 800)).toBe(false);
        expect(isFullyVerticallyVisible({ top: 801, bottom: 1001 }, 800)).toBe(false);
        expect(isFullyVerticallyVisible({ top: 800, bottom: 1000 }, 800)).toBe(false);

        // The last pixel of the element's tail is not yet visible
        expect(isFullyVerticallyVisible({ top: 601, bottom: 801 }, 800)).toBe(false);

        // The last pixel of the element's tail becomes visible
        expect(isFullyVerticallyVisible({ top: 600, bottom: 800 }, 800)).toBe(true);

        // The first pixel of the element's header is still visible
        expect(isFullyVerticallyVisible({ top: 0, bottom: 200 }, 800)).toBe(true);

        // The last pixel of the element's header is not visible anymore
        expect(isFullyVerticallyVisible({ top: -1, bottom: 199 }, 800)).toBe(false);

        // The last pixel of the element's tails is still visible
        expect(isFullyVerticallyVisible({ top: -199, bottom: 1 }, 800)).toBe(false);

        // The element goes off screen
        expect(isFullyVerticallyVisible({ top: -200, bottom: 0 }, 800)).toBe(false);
        expect(isFullyVerticallyVisible({ top: -300, bottom: -100 }, 800)).toBe(false);
        expect(isFullyVerticallyVisible({ top: -808, bottom: -608 }, 800)).toBe(false);
      });
    });
  });

  describe('listeners', () => {
    let attachSpy;
    let detachSpy;
    let updateSpinnerPositionSpy;

    beforeEach(() => {
      attachSpy = jest.spyOn(LoadingContainerAdvanced.prototype, 'attachListeners');
      detachSpy = jest.spyOn(LoadingContainerAdvanced.prototype, 'detachListeners');
      updateSpinnerPositionSpy = jest.spyOn(LoadingContainerAdvanced.prototype, 'updateSpinnerPosition');
    });

    afterEach(() => {
      attachSpy.mockRestore();
      detachSpy.mockRestore();
      updateSpinnerPositionSpy.mockRestore();
    });

    it('should attach the listeners on mount only when loading and there is a target node', () => {
      let target;

      // targetRef returns invalid target
      wrappers.push(mount(
        <LoadingContainerAdvanced targetRef={() => undefined}>
          <Contents />
        </LoadingContainerAdvanced>
      ));
      expect(attachSpy).not.toHaveBeenCalled();

      // Not loading
      wrappers.push(mount(
        <LoadingContainerAdvanced isLoading={false}>
          <Contents />
        </LoadingContainerAdvanced>
      ));
      expect(attachSpy).not.toHaveBeenCalled();

      // Loading and has children
      wrappers.push(mount(
        <LoadingContainerAdvanced>
          <Contents />
        </LoadingContainerAdvanced>
      ));
      expect(attachSpy).toHaveBeenCalledTimes(1);

      // Loading and has a valid target
      wrappers.push(mount(
        <LoadingContainerAdvanced targetRef={() => target}>
          <Contents innerRef={el => (target = el)} />
        </LoadingContainerAdvanced>
      ));
      expect(attachSpy).toHaveBeenCalledTimes(2);
    });

    it('should attach the listeners on props change only when it makes sense', () => {
      let target;

      const wrapper = mount(
        <LoadingContainerAdvanced isLoading={false}>
          <Contents innerRef={el => (target = el)} />
        </LoadingContainerAdvanced>
      );
      wrappers.push(wrapper);

      // Not loading
      expect(attachSpy).toHaveBeenCalledTimes(0);

      // Is loading and has children
      wrapper.setProps({ isLoading: true });
      expect(attachSpy).toHaveBeenCalledTimes(1);

      // Still loading and non-important props were changed
      wrapper.setProps({ spinnerSize: 123, contentsOpacity: 1, targetRef: () => target });
      expect(attachSpy).toHaveBeenCalledTimes(1);

      // Loading is turned off
      wrapper.setProps({ isLoading: false });
      expect(attachSpy).toHaveBeenCalledTimes(1);

      // Loading is back on, but targetRef returns invalid target
      wrapper.setProps({ isLoading: true, targetRef: () => undefined });
      expect(attachSpy).toHaveBeenCalledTimes(1);
    });

    it('should detach the listeners on props change', () => {
      const wrapper = mount(
        <LoadingContainerAdvanced>
          <Contents />
        </LoadingContainerAdvanced>
      );
      wrappers.push(wrapper);

      // Is loading
      expect(detachSpy).toHaveBeenCalledTimes(0);

      // Not loading anymore
      wrapper.setProps({ isLoading: false });
      expect(detachSpy).toHaveBeenCalledTimes(1);
      wrapper.setProps({ isLoading: true });

      // Still loading targetRef return invalid target
      wrapper.setProps({ targetRef: () => undefined });
      expect(detachSpy).toHaveBeenCalledTimes(2);
    });

    it('should detach the listeners on unmount', () => {
      const wrapper = mount(
        <LoadingContainerAdvanced>
          <Contents />
        </LoadingContainerAdvanced>
      );
      wrappers.push(wrapper);
      expect(detachSpy).toHaveBeenCalledTimes(0);
      wrapper.unmount();
      expect(detachSpy).toHaveBeenCalledTimes(1);
    });

    it('should update spinner position on resize', () => {
      wrappers.push(mount(
        <LoadingContainerAdvanced>
          <Contents />
        </LoadingContainerAdvanced>
      ));
      expect(updateSpinnerPositionSpy).toHaveBeenCalledTimes(1);
      window.dispatchEvent(new Event('resize'));
      window.dispatchEvent(new Event('resize'));
      expect(updateSpinnerPositionSpy).toHaveBeenCalledTimes(3);
    });

    it('should update spinner position on scroll', () => {
      wrappers.push(mount(
        <LoadingContainerAdvanced>
          <Contents />
        </LoadingContainerAdvanced>
      ));
      expect(updateSpinnerPositionSpy).toHaveBeenCalledTimes(1);
      window.dispatchEvent(new Event('scroll'));
      window.dispatchEvent(new Event('scroll'));
      expect(updateSpinnerPositionSpy).toHaveBeenCalledTimes(3);
    });
  });
});
