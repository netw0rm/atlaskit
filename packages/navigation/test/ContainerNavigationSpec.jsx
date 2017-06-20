// migration eslint issues
/* eslint-disable */
import { shallow, mount } from 'enzyme';
import React from 'react';
import createStub from 'raf-stub';
import styled from 'styled-components';
import ContainerNavigation from '../src/components/js/ContainerNavigation';
import ContainerHeader from '../src/components/js/ContainerHeader';
import Spacer from '../src/components/js/Spacer';
import { layout } from '../src/shared-variables';
import { isCollapsed } from '../src/theme/util';
import * as presets from '../src/theme/presets';

describe('<ContainerNavigation />', () => {
  describe('props', () => {
    it('should default theme to presets.container', () => {
      expect(mount(<ContainerNavigation />).props().theme).to.equal(presets.container);
    });
  });

  describe('behaviour', () => {
    describe('putting isCollapsed on the theme', () => {
      it('should set isCollapsed to false when not collapsed', () => {
        const stub = sinon.stub().returns('');
        const Item = styled.div`
          property: ${({ theme }) => stub(isCollapsed(theme))}
        `

        mount(
          <ContainerNavigation
            isCollapsed={false}
          >
            <Item />
          </ContainerNavigation>
        );

        expect(stub.calledWith(false)).to.equal(true);
      });

      it('should set isCollapsed to true when it is collapsed', () => {
        const stub = sinon.stub().returns('');
        const Item = styled.div`
          property: ${({ theme }) => stub(isCollapsed(theme))}
        `

        mount(
          <ContainerNavigation
            isCollapsed
          >
            <Item />
          </ContainerNavigation>
        );
        expect(stub.calledWith(true)).to.equal(true);
      });
    });

    it('collapses the container header when closed', () => {
      const headerComponent = sinon.spy();
      shallow(<ContainerNavigation isCollapsed headerComponent={headerComponent} />);
      expect(headerComponent.calledWith({ isCollapsed: true })).to.equal(true);
    });
  });

  describe('revealing the global primary actions', () => {
    it('should not animate the global primary actions on initial render', () => {
      const wrapper = shallow(<ContainerNavigation />);
      expect(wrapper.find('Reveal').props().shouldAnimate).to.equal(false);
    });

    it('should animate the global primary actions after any change', () => {
      const wrapper = mount(<ContainerNavigation />);

      wrapper.update();

      expect(wrapper.find('Reveal').props().shouldAnimate).to.equal(true);
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
