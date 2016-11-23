import chai from 'chai';
import { shallow } from 'enzyme';
import React from 'react';

import Lozenge from '../src';
import styles from '../src/style.less';

chai.should();

describe('ak-lozenge', () => {
  describe('isBold property', () => {
    function isBold(wrapper) {
      return wrapper.find('span[data-bold]').length === 1;
    }
    it('should not be the default', () => {
      isBold(shallow(<Lozenge />)).should.equal(false);
    });
    it('should change when toggled', () => {
      const wrapper = shallow(<Lozenge />);
      wrapper.setProps({ isBold: true });
      isBold(wrapper).should.equal(true);
    });
  });
  describe('appearance property', () => {
    function hasClass(wrapper, className) {
      return wrapper.find('span').first().hasClass(className);
    }

    it('should be "default" when not set', () => {
      hasClass(shallow(<Lozenge />), styles.locals.default).should.equal(true);
    });
    it('should change when set to an approved value', () => {
      const lozenge = shallow(<Lozenge />);
      lozenge.setProps({ appearance: 'success' });
      hasClass(lozenge, styles.locals.success).should.equal(true);
    });
    it('should revert to "default" when set to an invalid value', () => {
      const lozenge = shallow(<Lozenge />);
      lozenge.setProps({ appearance: 'foo' });
      hasClass(lozenge, styles.locals.default).should.equal(true);
    });
  });
});
