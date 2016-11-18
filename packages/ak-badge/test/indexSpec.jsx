import chai from 'chai';
import { shallow } from 'enzyme';
import React from 'react';

import AkBadge from '../src';
import styles from '../src/style.less';

chai.should();

describe('ak-badge', () => {
  function valueSpan(element) {
    return element.find(`.${styles.locals.value}`);
  }

  describe('value property', () => {
    it('should be visibly displayed', () => {
      valueSpan(shallow(<AkBadge value={5} />)).text().should.equal('5');
    });
    it('should only accept positive numbers', () => {
      valueSpan(shallow(<AkBadge value={-5} />)).text().should.equal('0');
    });
    it('should show show Infinity as the ∞ character', () => {
      valueSpan(shallow(<AkBadge value={Infinity} max={Infinity} />)).text().should.equal('∞');
    });
    it('should trigger onValueUpdated when value prop changed with a number', (done) => {
      const badge = shallow(
        <AkBadge
          value={1}
          onValueUpdated={(detail) => {
            detail.oldValue.should.equal(1);
            detail.newValue.should.equal(20);
            done();
          }}
        />
      );
      badge.setProps({ value: 20 });
    });
  });
  describe('max property', () => {
    it('should constrain to 99+ when not specified', () => {
      valueSpan(shallow(<AkBadge value={101} />)).text().should.equal('99+');
    });
    it('should constrain the value when set', () => {
      valueSpan(shallow(<AkBadge value={200} max={100} />)).text().should.equal('100+');
    });
    it('should pass the value through when max === 0', () => {
      valueSpan(
        shallow(<AkBadge value={Number.MAX_VALUE} max={0} />)
      ).text().should.equal(`${Number.MAX_VALUE}`);
    });
    it('should not constrain if equal to value', () => {
      valueSpan(shallow(<AkBadge value={200} max={200} />)).text().should.equal('200');
    });
  });
  describe('appearance property', () => {
    it('should be "default" when not set', () => {
      valueSpan(shallow(<AkBadge />)).hasClass(styles.locals.default).should.equal(true);
    });
    it('should change when set to an approved value', () => {
      valueSpan(
        shallow(<AkBadge appearance="removed" />)
      ).hasClass(styles.locals.removed).should.equal(true);
    });
    it('should revert to "default" when set to an invalid value', () => {
      valueSpan(
        shallow(<AkBadge appearance="foo" />)
      ).hasClass(styles.locals.default).should.equal(true);
    });
  });
});
