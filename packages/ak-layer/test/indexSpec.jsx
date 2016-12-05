import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import { shallow } from 'enzyme';

import Layer from '../src';


const { expect } = chai;
chai.use(chaiEnzyme());


describe('ak-layer', () => {
  it('should be possible to create a component', () => {
    const wrapper = shallow(<Layer />);
    expect(wrapper).to.be.defined;
  });

  describe('children', () => {
    const wrapper = shallow(<Layer><div id="target">Target</div></Layer>);

    it('should be rendered by Layer', () => {
      expect(wrapper).to.have.exactly(1).descendants('#target');
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
