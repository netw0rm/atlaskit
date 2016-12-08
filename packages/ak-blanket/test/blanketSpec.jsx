import React from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow, mount } from 'enzyme';

import Blanket from '../src';
import styles from '../src/style.less';

chai.should();
const expect = chai.expect;
chai.use(chaiEnzyme());

describe('ak-blanket', () => {
  describe('exports', () => {
    it('should export a base component', () => {
      Blanket.should.be.an.instanceof(Object);
    });
  });

  it('should be possible to create a component', () => {
    shallow(<Blanket />).find('div').hasClass(styles.locals.blanket).should.equal(true);
  });

  describe('props', () => {
    describe('isTinted', () => {
      it('should be false by default', () => {
        shallow(<Blanket />).find('div').hasClass(styles.locals.tinted).should.equal(false);
      });

      it('should get tint styling when prop set', () => {
        shallow(<Blanket isTinted />).find('div').hasClass(styles.locals.tinted).should.equal(true);
      });

      it('should not get tint styling when prop set to false', () => {
        shallow(<Blanket isTinted={false} />).find('div').hasClass(styles.locals.tinted).should.equal(false);
      });
    });

    describe('onBlanketClicked', () => {
      it('should trigger when blanket clicked', () => {
        const spy = sinon.spy();
        const wrapper = mount(<Blanket onBlanketClicked={spy} />);
        wrapper.find(`.${styles.locals.blanket}`).simulate('click');
        expect(spy).to.have.been.calledOnce;
      });
    });
  });
});
