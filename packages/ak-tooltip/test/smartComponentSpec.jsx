import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import { mount, shallow } from 'enzyme';

// Testing the smart component
import AKTooltip from '../src';


const { expect } = chai;
chai.use(chaiEnzyme());


describe('ak-tooltip (smart)', () => {
  it('should be possible to create a component', () => {
    const wrapper = shallow(<AKTooltip><div>foo</div></AKTooltip>);
    expect(wrapper).to.be.defined;
  });

  describe('visible state', () => {
    it('should set visible state to true when mouse enters', () => {
      const wrapper = mount(<AKTooltip><div>foo</div></AKTooltip>);

      expect(wrapper.state('visible')).to.be.false;
      wrapper.simulate('mouseOver');
      expect(wrapper.state('visible')).to.be.true;
    });

    it('should set visible state to false when mouse leaves', () => {
      const wrapper = mount(<AKTooltip><div>foo</div></AKTooltip>);

      // set up the negative case first
      wrapper.simulate('mouseOver');
      expect(wrapper.state('visible')).to.be.true;

      wrapper.simulate('mouseOut');
      expect(wrapper.state('visible')).to.be.false;
    });
  });
});
