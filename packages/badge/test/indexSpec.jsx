import { mount } from 'enzyme';
import React from 'react';

import AkBadge from '../src';
import { APPEARANCE_ENUM } from '../src/Badge';

describe('ak-badge', () => {
  describe('value property', () => {
    it('should be visibly displayed', () => {
      mount(<AkBadge value={5} />).text().should.equal('5');
    });
    it('should only accept positive numbers', () => {
      mount(<AkBadge value={-5} />).text().should.equal('0');
    });
    it('should show Infinity as the ∞ character', () => {
      mount(<AkBadge value={Infinity} max={Infinity} />).text().should.equal('∞');
    });
    it('should trigger onValueUpdated when value prop changed with a number', (done) => {
      const badge = mount(
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
      mount(<AkBadge value={101} />).text().should.equal('99+');
    });
    it('should constrain the value when set', () => {
      mount(<AkBadge value={200} max={100} />).text().should.equal('100+');
    });
    it('should pass the value through when max === 0', () => {
      mount(<AkBadge value={Number.MAX_VALUE} max={0} />)
      .text().should.equal(`${Number.MAX_VALUE}`);
    });
    it('should not constrain if equal to value', () => {
      mount(<AkBadge value={200} max={200} />).text().should.equal('200');
    });
  });
  describe('appearance property', () => {
    it('should be "default" when not set', () => {
      mount(<AkBadge />).prop('appearance').should.equal('default');
    });
    it('should change when set to an approved value', () => {
      APPEARANCE_ENUM.values.forEach((value) => {
        mount(<AkBadge appearance={value} />).prop('appearance').should.equal(value);
      });
    });
    it('should revert to "default" when set to an invalid value', () => {
      mount(<AkBadge appearance="foo" />).getNode().validAppearance()
        .should.equal('default');
    });
  });
  describe('theme property', () => {
    it('should not have dark theme when not set', () => {
      mount(<AkBadge />).prop('theme').should.equal('default');
    });
    it('should apply the dark theme class when the theme is dark', () => {
      mount(<AkBadge theme="dark" />).prop('theme').should.equal('dark');
    });
  });
});
