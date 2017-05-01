// migration eslint issues
/* eslint-disable */
import { shallow, mount } from 'enzyme';
import React from 'react';
import createStub from 'raf-stub';
import ContainerNavigation from '../src/components/js/ContainerNavigation';
import ContainerHeader from '../src/components/js/ContainerHeader';
import Spacer from '../src/components/js/Spacer';
import { layout } from '../src/shared-variables';

describe('<ContainerNavigation />', () => {
  describe('behaviour', () => {
    it('renders [data-__ak-navigation-container-closed="true"] if it is collapsed', () => {
      expect(mount(<ContainerNavigation isCollapsed />).getDOMNode().matches('[data-__ak-navigation-container-closed="true"]')).to.equal(true);
    });
    it('renders [data-__ak-navigation-container-closed="false"] if it is not collapsed', () => {
      expect(mount(<ContainerNavigation isCollapsed={false} />).getDOMNode().matches('[data-__ak-navigation-container-closed="false"]')).to.equal(true);
    });
    it('collapses the container header when closed', () => {
      const headerComponent = sinon.spy();
      shallow(<ContainerNavigation isCollapsed headerComponent={headerComponent} />);
      expect(headerComponent.calledWith({ isCollapsed: true })).to.equal(true);
    });
  });
  describe('is scrolled', () => {
    const raf = createStub();
    const originalRaf = window.requestAnimationFrame;
    const originalCaf = window.cancelAnimationFrame;

    const triggerScroll = (el, scrollTop) => {
      el.scrollTop = scrollTop;
      // currently not working with new CustomEvent() so using an older syntax
      const event = document.createEvent('Event');
      event.initEvent('scroll', true, true);
      el.dispatchEvent(event);
    };

    const isHeaderScrolled = wrapper =>
        wrapper.find(ContainerHeader).props().isContentScrolled;

    before(() => {
      window.requestAnimationFrame = raf.add;
      window.cancelAnimationFrame = raf.remove;
    });

    afterEach(() => {
      raf.reset();
    });

    after(() => {
      window.requestAnimationFrame = originalRaf;
      window.cancelAnimationFrame = originalCaf;
    });

    it('should let the header know when the container scrolls', () => {
      const wrapper = mount(
        <ContainerNavigation
          headerComponent={() => <div />}
        />
      );
      const node = wrapper.find('ContainerNavigationInner').getDOMNode();

      triggerScroll(node, 200);
      raf.step();

      expect(isHeaderScrolled(wrapper)).to.equal(true);
    });
    it('should let the header know when the container is no longer scrolled', () => {
      const wrapper = mount(
        <ContainerNavigation
          headerComponent={() => <div />}
        />
      );
      const node = wrapper.find('ContainerNavigationInner').getDOMNode();

      triggerScroll(node, 200);
      raf.step();

      expect(isHeaderScrolled(wrapper)).to.equal(true);

      triggerScroll(node, 0);
      raf.step();

      expect(isHeaderScrolled(wrapper)).to.equal(false);
    });
  });
});
