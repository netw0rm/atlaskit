import React from 'react';
import { shallow } from 'enzyme';
import Tooltip from '../../src';

describe('Tooltip (smart)', () => {
  it('should be possible to create a component', () => {
    const wrapper = shallow(<Tooltip><div>foo</div></Tooltip>);
    expect(wrapper).not.to.equal(undefined);
  });

  describe('isVisible state', () => {
    const animStub = window.cancelAnimationFrame;
    beforeEach(() => {
      window.cancelAnimationFrame = () => {};
    });

    afterEach(() => {
      window.cancelAnimationFrame = animStub;
    });

    it('should be set to true when mouse enters', () => {
      const wrapper = shallow(<Tooltip><div>foo</div></Tooltip>);

      expect((wrapper).state('isVisible')).to.equal(false);

      wrapper.simulate('mouseOver');
      expect((wrapper).state('isVisible')).to.equal(true);
    });

    it('should be set to false when mouse leaves', () => {
      const wrapper = shallow(<Tooltip><div>foo</div></Tooltip>);

      // set up the negative case first
      wrapper.simulate('mouseOver');
      expect((wrapper).state('isVisible')).to.equal(true);

      wrapper.simulate('mouseOut');
      expect((wrapper).state('isVisible')).to.equal(false);
    });
  });
});
