import { mount, shallow } from 'enzyme';
import React from 'react';

import Lozenge, { APPEARANCE_ENUM } from '../src/Lozenge';

describe('Lozenge', () => {
  describe('isBold property', () => {
    it('should not be the default', () => {
      shallow(<Lozenge />).prop('isBold').should.equal(false);
    });
    it('should change when toggled', () => {
      shallow(<Lozenge isBold />).prop('isBold').should.equal(true);
    });
  });
  describe('appearance property', () => {
    it('should be "default" when not set', () => {
      shallow(<Lozenge />).prop('appearance').should.equal('default');
    });
    it('should change when set to an approved value', () => {
      APPEARANCE_ENUM.values.forEach((value) => {
        shallow(<Lozenge appearance={value} />).prop('appearance').should.equal(value);
      });
    });
    it('should revert to "default" when set to an invalid value', () => {
      const wrapper = mount(<Lozenge appearance="foo" />);
      expect(wrapper.getNode().validAppearance()).to.equal('default');
      wrapper.unmount();
    });
  });
});
