import React from 'react';
import { shallow, mount } from 'enzyme';

import Layer from '../src';

/* There is a lot in Layer that can not be tested easily in JSDom. Most of it should already be
   tested in Popper itself, but we should really have some sort of sanity checks for things like
   flipping behaviour.

   This file simply unit tests everything that can be unit tested. Browser and sanity checking will
   be done as a part of AK-1098 */

describe('Layer', () => {
  const animStub = window.cancelAnimationFrame;
  beforeEach(() => {
    window.cancelAnimationFrame = () => {};
  });

  afterEach(() => {
    window.cancelAnimationFrame = animStub;
  });

  it('should be possible to create a component', () => {
    const wrapper = shallow(<Layer />);
    expect(wrapper).not.to.equal(undefined);
  });

  describe('children', () => {
    const wrapper = shallow(<Layer><div id="target">Target</div></Layer>);

    it('should be rendered by Layer', () => {
      expect(wrapper.find('#target').length).to.equal(1);
    });
  });

  describe('content prop', () => {
    const content = (<div id="content">Some Content</div>);

    it('should be rendered by Layer', () => {
      const wrapper = shallow(<Layer content={content} />);
      expect(wrapper.find('#content').length).to.equal(1);
    });
  });

  describe('shouldAppendToBody prop', () => {
    it('if it`s true, layer element should have body as parentNode', () => {
      const text = 'Some Content';
      const content = (<div id="content">{text}</div>);
      const wrapper = mount(<Layer content={content} shouldAppendToBody>test</Layer>);
      expect(wrapper.instance().contentRef.parentNode).to.equal(document.body);
      expect(document.body.lastChild.textContent).to.equal(text);
      wrapper.unmount();
      expect(document.body.lastChild.textContent).not.to.equal(text);
    });
  });

  describe('state', () => {
    const content = (<div id="content">Some Content</div>);

    it('cssPosition and transform should be reflected on the popper div', () => {
      const wrapper = shallow(<Layer content={content}>
        <div>Something to align to</div>
      </Layer>);

      wrapper.setState({ cssPosition: 'fixed', transform: 'translate3d(13px, 13px, 0px)' });

      const contentParent = wrapper.find('#content').parent();

      expect(contentParent.prop('style').position).to.equal('fixed');
      expect(contentParent.prop('style').transform).to.equal('translate3d(13px, 13px, 0px)');
    });

    it('flipped should cause onFlippedChange callback to be called', () => {
      const spy = sinon.spy();
      const wrapper = mount(<Layer onFlippedChange={spy} content={content}><div>Foo</div></Layer>);
      const state = { flipped: true, actualPosition: 'top left', originalPosition: 'bottom left' };

      expect(wrapper.state('flipped')).to.equal(false);
      wrapper.setState(state);

      expect(spy.callCount).to.equal(1);
      expect(spy.calledWith(state)).to.equal(true);
    });
  });
});
