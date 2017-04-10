import { mount } from 'enzyme';
import React from 'react';

import Lozenge, { APPEARANCE_ENUM } from '../src/Lozenge';

describe('Lozenge', () => {
  describe('isBold property', () => {
    it('should not be the default', () => {
      const wrapper = mount(<Lozenge />);
      wrapper.prop('isBold').should.equal(false);
      wrapper.unmount();
    });
    it('should change when toggled', () => {
      const wrapper = mount(<Lozenge isBold />);
      wrapper.prop('isBold').should.equal(true);
      wrapper.unmount();
    });
  });
  describe('appearance property', () => {
    it('should be "default" when not set', () => {
      const wrapper = mount(<Lozenge />);
      wrapper.prop('appearance').should.equal('default');
      wrapper.unmount();
    });
    it('should change when set to an approved value', () => {
      APPEARANCE_ENUM.values.forEach((value) => {
        const wrapper = mount(<Lozenge appearance={value} />);
        wrapper.prop('appearance').should.equal(value);
        wrapper.unmount();
      });
    });
    it('should revert to "default" when set to an invalid value', () => {
      const wrapper = mount(<Lozenge appearance="foo" />);
      wrapper.getNode().validAppearance().should.equal('default');
      wrapper.unmount();
    });
  });
});
