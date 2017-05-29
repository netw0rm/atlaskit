import { mount } from 'enzyme';
import React from 'react';
import chai from 'chai';

import PrettyPropType from '../../src/PrettyPropType';

const expect = chai.expect;

describe('PrettyPropType', () => {
  it('skips simple prop types', () => {
    const el = mount(<PrettyPropType type={{ name: 'string' }} />);
    expect(el.children()).to.have.length(0);
  });

  it('enumerates complex proptypes', () => {
    const wrapper = mount(<PrettyPropType
      type={{
        name: 'enum',
        value: [
          { value: "'default'" },
          { value: "'primary'" },
          { value: "'important'" },
          { value: "'added'" },
          { value: "'removed'" },
        ],
      }}
    />);
    expect(wrapper.text()).to.contain("One of ('default''primary''important''added''removed')");
  });
});
