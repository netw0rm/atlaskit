import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import { shallow, mount } from 'enzyme';

import Layer from '../src';
import { POSITION_ATTRIBUTE_ENUM } from '../src/internal/helpers';


const { expect } = chai;
chai.use(chaiEnzyme());


describe('ak-layer', () => {
  it('should be possible to create a component', () => {
    const wrapper = shallow(<Layer />);
    expect(wrapper).to.be.defined;
  });

  describe('props', () => {
    it('should expose all the expected default props', () => {
      const wrapper = mount(<Layer />);

      expect(wrapper).to.have.props({ position: POSITION_ATTRIBUTE_ENUM.default });
      expect(wrapper).to.have.props({ boundariesElement: 'viewport' });
      expect(wrapper).to.have.props({ autoPosition: true });
      expect(wrapper).to.have.props({ offset: '0 0' });
      expect(wrapper).to.have.props({ content: null });
      expect(wrapper).to.have.props({ children: null });
    });
  });

  describe('children', () => {
    let wrapper;

    beforeEach(() => (wrapper = shallow(<Layer><div id="target">Target</div></Layer>)));

    it('should be rendered by Layer', () => {
      expect(wrapper).to.have.exactly(1).descendants('#target');
    });

    // rendering a target with display block can lead to positioning issues
    it('should be rendered inside an inline-block parent', () => {
      const target = wrapper.find('#target').first();
      expect(target.parent()).to.have.style('display', 'inline-block');
    });
  });

  describe('content prop', () => {
    const content = (<div id="content">Some Content</div>);

    it('should be rendered by Layer', () => {
      const wrapper = shallow(<Layer content={content} />);
      expect(wrapper).to.have.exactly(1).descendants('#content');
    });
  });

  describe('state', () => {
    const content = (<div id="content">Some Content</div>);

    it('should be reflected on the popper div', () => {
      const wrapper = shallow(<Layer content={content}>
        <div>Something to align to</div>
      </Layer>);

      wrapper.setState({ position: 'fixed', transform: 'translate3d(13px, 13px, 0px)' });

      const contentParent = wrapper.find('#content').parent();

      expect(contentParent).to.have.style('position', 'fixed');
      expect(contentParent).to.have.style('transform', 'translate3d(13px, 13px, 0px)');
    });
  });
});
