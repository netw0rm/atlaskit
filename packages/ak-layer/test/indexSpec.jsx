import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import sinonChai from 'sinon-chai';
import React from 'react';
import { shallow, mount } from 'enzyme';

import Layer from '../src';


const { expect } = chai;
chai.use(chaiEnzyme());
chai.use(sinonChai);

/* There is a lot in Layer that can not be tested easily in JSDom. Most of it should already be
   tested in Popper itself, but we should really have some sort of sanity checks for things like
   flipping behaviour.

   This file simply unit tests everything that can be unit tested. Browser and sanity checking will
   be done as a part of AK-1098 */


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

    it('CssPosition and transform should be reflected on the popper div', () => {
      const wrapper = shallow(<Layer content={content}>
        <div>Something to align to</div>
      </Layer>);

      wrapper.setState({ CssPosition: 'fixed', transform: 'translate3d(13px, 13px, 0px)' });

      const contentParent = wrapper.find('#content').parent();

      expect(contentParent).to.have.style('position', 'fixed');
      expect(contentParent).to.have.style('transform', 'translate3d(13px, 13px, 0px)');
    });

    it('flipped should cause onFlippedChange callback to be called', () => {
      const spy = sinon.spy();
      const wrapper = mount(<Layer onFlippedChange={spy} content={content}><div>Foo</div></Layer>);
      const state = { flipped: true, actualPosition: 'top left', originalPosition: 'bottom left' };

      expect(wrapper.state('flipped')).to.be.false;
      wrapper.setState(state);

      expect(spy).to.have.been.calledOnce;
      expect(spy).to.have.been.calledWith(state);
    });
  });
});
