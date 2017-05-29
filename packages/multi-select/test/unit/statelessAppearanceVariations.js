import React from 'react';
import { mount } from 'enzyme';
import { FieldBase } from '@atlaskit/field-base';
import { StatelessMultiSelect } from '../../src';

import { name } from '../../package.json';

describe(`${name} - stateless`, () => {
  const animStub = window.cancelAnimationFrame;
  beforeEach(() => {
    window.cancelAnimationFrame = () => {};
  });

  afterEach(() => {
    window.cancelAnimationFrame = animStub;
  });

  describe('appearance variations', () => {
    it('should have appearance prop by default', () => {
      const wrapper = mount(<StatelessMultiSelect />);
      expect(wrapper.prop('appearance')).to.equal('default');
    });

    it('should correctly map appearance prop to FieldBase', () => {
      const defaultMultiSelect = mount(<StatelessMultiSelect />);
      const standardFieldBase = defaultMultiSelect.find(FieldBase);
      const subtleMultiSelect = mount(<StatelessMultiSelect appearance="subtle" />);
      const subtleFieldBase = subtleMultiSelect.find(FieldBase);
      expect(standardFieldBase.prop('appearance')).to.equal('standard');
      expect(subtleFieldBase.prop('appearance')).to.equal('subtle');
    });
  });
});
