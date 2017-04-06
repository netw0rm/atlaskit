import { mount } from 'enzyme';
import React from 'react';

import AkBadge from '../../src';
import { APPEARANCE_ENUM } from '../../src/Badge';

describe('ak-badge', () => {
  describe('value property', () => {
    it('should be visibly displayed', () => {
      expect(mount(<AkBadge value={5} />).text()).to.equal('5');
    });
    it('should only accept positive numbers', () => {
      expect(mount(<AkBadge value={-5} />).text()).to.equal('0');
    });
    it('should show Infinity as the ∞ character', () => {
      expect(mount(<AkBadge value={Infinity} max={Infinity} />).text()).to.equal('∞');
    });
    it('should trigger onValueUpdated when value prop changed with a number', (done) => {
      const badge = mount(
        <AkBadge
          value={1}
          onValueUpdated={(detail) => {
            expect(detail.oldValue).to.equal(1);
            expect(detail.newValue).to.equal(20);
            done();
          }}
        />
      );
      badge.setProps({ value: 20 });
    });
  });
  describe('max property', () => {
    it('should constrain to 99+ when not specified', () => {
      expect(mount(<AkBadge value={101} />).text()).to.equal('99+');
    });
    it('should constrain the value when set', () => {
      expect(mount(<AkBadge value={200} max={100} />).text()).to.equal('100+');
    });
    it('should pass the value through when max === 0', () => {
      expect(mount(<AkBadge value={Number.MAX_VALUE} max={0} />).text())
        .to.equal(`${Number.MAX_VALUE}`);
    });
    it('should not constrain if equal to value', () => {
      expect(mount(<AkBadge value={200} max={200} />).text()).to.equal('200');
    });
  });
  describe('appearance property', () => {
    it('should be "default" when not set', () => {
      expect(mount(<AkBadge />).prop('appearance')).to.equal('default');
    });
    it('should change when set to an approved value', () => {
      APPEARANCE_ENUM.values.forEach((value) => {
        expect(mount(<AkBadge appearance={value} />).prop('appearance')).to.equal(value);
      });
    });
    it('should revert to "default" when set to an invalid value', () => {
      expect(mount(<AkBadge appearance="foo" />).getNode().validAppearance()).to.equal('default');
    });
  });
  describe('theme property', () => {
    it('should not have dark theme when not set', () => {
      expect(mount(<AkBadge />).prop('theme')).to.equal('default');
    });
    it('should apply the dark theme class when the theme is dark', () => {
      expect(mount(<AkBadge theme="dark" />).prop('theme')).to.equal('dark');
    });
  });
});
