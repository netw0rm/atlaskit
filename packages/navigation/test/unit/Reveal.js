import React, { PureComponent } from 'react';
import { shallow, mount } from 'enzyme';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import Reveal from '../../src/components/js/Reveal';

class Child extends PureComponent {
  render() {
    return <div />;
  }
}

describe('Reveal', () => {
  describe('starting open without animation', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(
        <Reveal
          shouldAnimate={false}
          openHeight={100}
          isOpen
        >
          <Child />
        </Reveal>
      );
    });

    it('should render its children', () => {
      expect(wrapper.find(Child).length).to.equal(1);
    });

    it('should not animate the growth of the children', () => {
      expect(wrapper.find('RevealInner').props().shouldAnimate).to.equal(false);
    });

    it('should open to the open height', () => {
      expect(wrapper.find('RevealInner').props().openHeight).to.equal(100);
    });
  });

  describe('starting open with animation', () => {
    it('should render its children', () => {
      const wrapper = mount(
        <Reveal
          openHeight={100}
          shouldAnimate
          isOpen
        >
          <Child />
        </Reveal>
      );

      expect(wrapper.find(Child).length).to.equal(1);
    });

    it('should start not open', () => {
      const wrapper = shallow(
        <Reveal
          openHeight={100}
          shouldAnimate
          isOpen
        >
          <Child />
        </Reveal>
      );

      expect(wrapper.find('RevealInner').props().isOpen).to.equal(false);
    });

    it('should then open async after mounting', () => {
      // override system clock
      const clock = sinon.useFakeTimers();

      const wrapper = mount(
        <Reveal
          openHeight={100}
          shouldAnimate
          isOpen
        >
          <Child />
        </Reveal>
      );

      expect(wrapper.find('RevealInner').props().isOpen).to.equal(false);

      clock.tick();
      requestAnimationFrame.step();

      expect(wrapper.find('RevealInner').props().isOpen).to.equal(true);

      // restore system clock
      clock.restore();
    });
  });

  describe('closing without animation', () => {
    it('should unmount its children', () => {
      const wrapper = mount(
        <Reveal
          isOpen
          shouldAnimate={false}
          openHeight={100}
        >
          <Child />
        </Reveal>
      );

      expect(wrapper.find(Child).length).to.equal(1);

      wrapper.setProps({
        isOpen: false,
      });

      expect(wrapper.find(Child).length).to.equal(0);
    });
  });

  describe('closing with animation', () => {
    it('should not immediately remove the children', () => {
      const wrapper = shallow(
        <Reveal
          isOpen
          shouldAnimate
          openHeight={200}
        >
          <Child />
        </Reveal>
      );

      wrapper.setProps({
        isOpen: false,
      });

      expect(wrapper.find(Child).length).to.equal(1);
    });

    it('should remove children after closing', () => {
      const wrapper = mount(
        <Reveal
          isOpen
          shouldAnimate
          openHeight={200}
        >
          <Child />
        </Reveal>
      );

      expect(wrapper.find(Child).length).to.equal(1);

      wrapper.setProps({
        isOpen: false,
      });

      // mocking a transition end
      wrapper.find('RevealInner').simulate('transitionEnd');

      expect(wrapper.find(Child).length).to.equal(0);
    });
  });

  describe('starting closed without animation', () => {
    it('should not render its children', () => {
      const wrapper = mount(
        <Reveal
          isOpen={false}
          shouldAnimate={false}
          openHeight={200}
        >
          <Child />
        </Reveal>
      );

      expect(wrapper.find(Child).length).to.equal(0);
    });
  });

  describe('starting closed with animation', () => {
    it('should not render its children', () => {
      const wrapper = mount(
        <Reveal
          isOpen={false}
          shouldAnimate={false}
          openHeight={200}
        >
          <Child />
        </Reveal>
      );

      expect(wrapper.find(Child).length).to.equal(0);
    });
  });
});
