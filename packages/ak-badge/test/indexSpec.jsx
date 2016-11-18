import chai from 'chai';
import { shallow } from 'enzyme';
import React from 'react';

import AkBadge from '../src';
import styles from '../src/style.less';

chai.should();

describe('ak-badge', () => {
  describe('value property', () => {
    it('should be visibly displayed', () => {
      shallow(<AkBadge value={5} />).find('span > span').text().should.equal('5');
    });
    it('should only accept positive numbers', () => {
      shallow(<AkBadge value={-5} />).find('span > span').text().should.equal('0');
    });
    it('should show show Infinity as the ∞ character', () => {
      shallow(<AkBadge value={Infinity} max={Infinity} />).find('span > span').text().should.equal('∞');
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
      shallow(<AkBadge value={101} />).find('span > span').text().should.equal('99+');
    });
    it('should constrain the value when set', () => {
      shallow(<AkBadge value={200} max={100} />).find('span > span').text().should.equal('100+');
      shallow(<AkBadge value={Number.MAX_VALUE} />).find('span > span').text().should.equal('99+');
    });
    it('should not constrain if equal to value', () => {
      shallow(<AkBadge value={200} max={200} />).find('span > span').text().should.equal('200');
    });
  });
  describe('appearance property', () => {
    it('should be "default" when not set', () => {
      shallow(<AkBadge />).find('span > span').hasClass(styles.locals.default).should.equal(true);
    });
    it('should change when set to an approved value', () => {
      shallow(<AkBadge appearance="removed" />).find('span > span').hasClass(styles.locals.removed).should.equal(true);
    });
    it('should revert to "default" when set to an invalid value', () => {
      shallow(<AkBadge appearance="foo" />).find('span > span').hasClass(styles.locals.default).should.equal(true);
    });
  });
});
