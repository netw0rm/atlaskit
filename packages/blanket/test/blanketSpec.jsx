import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import Blanket from '../src';
import { getOpacity } from '../src/styled/Container';

describe('ak-blanket', () => {
  describe('exports', () => {
    it('should export a base component', () => {
      Blanket.should.be.an.instanceof(Object);
    });
  });

  it('should be possible to create a component', () => {
    expect(mount(<Blanket />)).not.to.equal(undefined);
  });

  describe('props', () => {
    describe('isTinted', () => {
      it('should be false by default', () => {
        mount(<Blanket />).prop('isTinted').should.equal(false);
      });

      it('should get tint styling when prop set', () => {
        const props = { isTinted: true };
        expect(getOpacity(props)).to.equal(0.5);
      });

      it('should not get tint styling when prop set to false', () => {
        const props = { isTinted: false };
        expect(getOpacity(props)).to.equal(0);
      });
    });

    describe('canClickThrough', () => {
      it('should be false by default', () => {
        mount(<Blanket />).prop('canClickThrough').should.equal(false);
      });
      it('when canClickThrough is true, onBlanketClicked should not be triggered', () => {
        const spy = sinon.spy();
        const wrapper = mount(<Blanket canClickThrough onBlanketClicked={spy} />);
        wrapper.simulate('click');
        expect(spy.callCount).to.equal(0);
      });
    });

    describe('onBlanketClicked', () => {
      it('should trigger when blanket clicked', () => {
        const spy = sinon.spy();
        const wrapper = mount(<Blanket onBlanketClicked={spy} />);
        wrapper.simulate('click');
        expect(spy.callCount).to.equal(1);
      });
    });
  });
});
