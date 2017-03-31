import { mount } from 'enzyme';
import React from 'react';

import AkBadge from '../src';
import { APPEARANCE_ENUM } from '../src/Badge';

describe('ak-badge', () => {
  let wrapper;
  describe('value property', () => {
    it('should be visibly displayed', () => {
      wrapper = mount(<AkBadge value={5} />);
      expect(wrapper.text()).to.equal('5');
    });
    it('should only accept positive numbers', () => {
      wrapper = mount(<AkBadge value={-5} />);
      expect(wrapper.text()).to.equal('0');
    });
    it('should show Infinity as the ∞ character', () => {
      wrapper = mount(<AkBadge value={Infinity} max={Infinity} />);
      expect(wrapper.text()).to.equal('∞');
    });
    it('should trigger onValueUpdated when value prop changed with a number', (done) => {
      wrapper = mount(
        <AkBadge
          value={1}
          onValueUpdated={(detail) => {
            detail.oldValue.should.equal(1);
            detail.newValue.should.equal(20);
            done();
          }}
        />
      );
      wrapper.setProps({ value: 20 });
    });
  });
  describe('max property', () => {
    it('should constrain to 99+ when not specified', () => {
      wrapper = mount(<AkBadge value={101} />);
      expect(wrapper.text()).to.equal('99+');
    });
    it('should constrain the value when set', () => {
      wrapper = mount(<AkBadge value={200} max={100} />);
      expect(wrapper.text()).to.equal('100+');
    });
    it('should pass the value through when max === 0', () => {
      wrapper = mount(<AkBadge value={Number.MAX_VALUE} max={0} />);
      expect(wrapper.text()).to.equal(`${Number.MAX_VALUE}`);
    });
    it('should not constrain if equal to value', () => {
      wrapper = mount(<AkBadge value={200} max={200} />);
      expect(wrapper.text()).to.equal('200');
    });
  });
  describe('appearance property', () => {
    it('should be "default" when not set', () => {
      wrapper = mount(<AkBadge />);
      expect(wrapper.prop('appearance')).to.equal('default');
    });
    it('should change when set to an approved value', () => {
      APPEARANCE_ENUM.values.forEach((value) => {
        describe(value, () => {
          wrapper = mount(<AkBadge appearance={value} />);
          expect(wrapper.prop('appearance')).to.equal(value);
        });
      });
    });
    it('should revert to "default" when set to an invalid value', () => {
      wrapper = mount(<AkBadge appearance="foo" />);
      expect(wrapper.getNode().validAppearance()).to.equal('default');
    });
  });
  describe('theme property', () => {
    it('should not have dark theme when not set', () => {
      wrapper = mount(<AkBadge />);
      expect(wrapper.prop('theme')).to.equal('default');
    });
    it('should apply the dark theme class when the theme is dark', () => {
      wrapper = mount(<AkBadge theme="dark" />);
      expect(wrapper.prop('theme')).to.equal('dark');
    });
  });
});
