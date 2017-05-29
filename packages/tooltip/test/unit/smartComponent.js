import React from 'react';
import { mount, shallow } from 'enzyme';

// Testing the smart component
import AKTooltip from '../../src';

describe('Tooltip (smart)', () => {
  it('should be possible to create a component', () => {
    const wrapper = shallow(<AKTooltip><div>foo</div></AKTooltip>);
    expect(wrapper).not.to.equal(undefined);
  });

  describe('visible state', () => {
    const animStub = window.cancelAnimationFrame;
    beforeEach(() => {
      window.cancelAnimationFrame = () => {};
    });

    afterEach(() => {
      window.cancelAnimationFrame = animStub;
    });

    it('should set visible state to true when mouse enters', () => {
      const wrapper = mount(<AKTooltip><div>foo</div></AKTooltip>);

      expect((wrapper).state('visible')).to.equal(false);
      wrapper.simulate('mouseOver');
      expect((wrapper).state('visible')).to.equal(true);
    });

    it('should set visible state to false when mouse leaves', () => {
      const wrapper = mount(<AKTooltip><div>foo</div></AKTooltip>);

      // set up the negative case first
      wrapper.simulate('mouseOver');
      expect((wrapper).state('visible')).to.equal(true);

      wrapper.simulate('mouseOut');
      expect((wrapper).state('visible')).to.equal(false);
    });
  });
});
