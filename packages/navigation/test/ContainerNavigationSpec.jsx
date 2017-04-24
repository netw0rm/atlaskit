// migration eslint issues
/* eslint-disable */
import { shallow, mount } from 'enzyme';
import React from 'react';
import createStub from 'raf-stub';
import ContainerNavigation from '../src/components/js/ContainerNavigation';
import ContainerHeader from '../src/components/js/ContainerHeader';
import Spacer from '../src/components/js/Spacer';
import { containerNav } from '../src/shared-variables';

describe('<ContainerNavigation />', () => {
  describe('children', () => {
    it('should render a <Spacer />', () => {
      expect(shallow(<ContainerNavigation />).find(Spacer)).to.have.length(1);
    });
  });
  describe('props', () => {
    it('width prop is reflected directly on <Spacer />', () => {
      expect(shallow(<ContainerNavigation width={500} />).find(Spacer).props().width).to.equal(500);
      expect(shallow(<ContainerNavigation width={200} />).find(Spacer).props().width).to.equal(200);
    });
  });
  describe('behaviour', () => {
    it('renders [data-__ak-navigation-container-closed="true"] if and only if it is closed', () => {
      expect(mount(<ContainerNavigation width={containerNav.width.closed} />).getDOMNode().matches('[data-__ak-navigation-container-closed="true"]')).to.equal(true);
      expect(mount(<ContainerNavigation width={200} />).getDOMNode().matches('[data-__ak-navigation-container-closed="true"]')).to.equal(false);
    });
    it('collapses the container header when closed', () => {
      const headerComponent = sinon.spy();
      shallow(<ContainerNavigation width={0} headerComponent={headerComponent} />);
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
