import React from 'react';
import { mount } from 'enzyme';
import { FieldBaseStateless } from '@atlaskit/field-base';
import { MultiSelectStateless } from '../../src';

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
      const wrapper = mount(<MultiSelectStateless />);
      expect(wrapper.prop('appearance')).to.equal('default');
    });

    it('should correctly map appearance prop to FieldBase', () => {
      const defaultMultiSelect = mount(<MultiSelectStateless />);
      const standardFieldBase = defaultMultiSelect.find(FieldBaseStateless);
      const subtleMultiSelect = mount(<MultiSelectStateless appearance="subtle" />);
      const subtleFieldBase = subtleMultiSelect.find(FieldBaseStateless);
      expect(standardFieldBase.prop('appearance')).to.equal('standard');
      expect(subtleFieldBase.prop('appearance')).to.equal('subtle');
    });
  });
});
