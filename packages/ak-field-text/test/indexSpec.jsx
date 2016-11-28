import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import sinonChai from 'sinon-chai';
import React from 'react';
import { shallow, mount } from 'enzyme';
import FieldBase from 'ak-field-base';

import { FieldText } from '../src';
import Input from '../src/Input';

chai.use(chaiEnzyme());
chai.use(sinonChai);

describe('ak-field-text', () => {
  it('defaults', () => {
    const wrapper = shallow(<FieldText />);
    expect(wrapper).to.have.exactly(1).descendants(FieldBase);
    expect(wrapper).to.have.exactly(1).descendants(Input);
  });

  describe('properties', () => {
    [
      { disabled: true },
      { required: true },
      { label: 'test' },
    ].forEach(prop =>
      describe(JSON.stringify(prop), () =>
        it('FieldBase should have attribute defined', () =>
          expect(shallow(<FieldText {...prop} />).find(FieldBase)).to.have.props(prop)
        )
      )
    );

    it('FieldBase should have appearance="compact"', () =>
      expect(shallow(<FieldText compact />).find(FieldBase))
        .to.have.prop('appearance', 'compact')
    );

    [
      { type: 'search' },
      { disabled: true },
      { name: 'test' },
      { placeholder: 'test placeholder' },
      { required: true },
    ].forEach(prop =>
      describe(JSON.stringify(prop), () =>
        it('Input should have attribute defined', () =>
          expect(shallow(<FieldText {...prop} />).find(Input)).to.have.props(prop)
        )
      )
    );

    it('Input should have value="something"', () =>
      expect(shallow(<FieldText value="something" />).find(Input))
        .to.have.prop('value', 'something')
    );

    it('onInputChange should be called when input value changes', () => {
      const spy = sinon.spy();
      const wrapper = mount(<FieldText onInputChange={spy} />);
      wrapper.find(Input).find('input').simulate('change');
      expect(spy).to.be.calledOnce;
    });
  });
});
