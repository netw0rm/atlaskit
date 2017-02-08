import React from 'react';
import { shallow, mount } from 'enzyme';
import Base from '@atlaskit/field-base';

import FieldTextSmart, { FieldText } from '../src';

describe('ak-field-text', () => {
  it('defaults', () => {
    const wrapper = shallow(<FieldText />);
    expect(wrapper.find(Base).length).to.equal(1);
    expect(wrapper.find('input').length).to.equal(1);
  });

  describe('properties', () => {
    [
      { disabled: true },
      { required: true },
    ].forEach(prop =>
      it('FieldBase should have attribute defined', () => {
        const key = Object.keys(prop)[0];
        const value = prop[key];
        expect(shallow(<FieldText {...prop} />).find(Base).prop(key)).to.equal(value);
      })
    );

    it('FieldBase should have appearance="compact"', () =>
      expect(shallow(<FieldText compact />).find(Base).prop('appearance'))
        .to.equal('compact')
    );

    [
      { type: 'search' },
      { disabled: true },
      { name: 'test' },
      { placeholder: 'test placeholder' },
      { required: true },
    ].forEach(prop =>
      describe(JSON.stringify(prop), () =>
        it('Input should have attribute defined', () => {
          const key = Object.keys(prop)[0];
          const value = prop[key];
          expect(shallow(<FieldText {...prop} />).find('input').prop(key)).to.equal(value);
        })
      )
    );

    it('Input should have value="something"', () =>
      expect(shallow(<FieldText value="something" />).find('input').prop('value'))
        .to.equal('something')
    );

    it('onChange should be called when input value changes', () => {
      const spy = sinon.spy();
      const wrapper = mount(<FieldText onChange={spy} />);
      wrapper.find('input').simulate('change');
      expect(spy.callCount).to.equal(1);
    });
  });

  describe('smart FieldText', () => {
    it('should call onChange when input value changes', () => {
      const spy = sinon.spy();
      const wrapper = mount(<FieldTextSmart onChange={spy} />);
      wrapper.find('input').simulate('change');
      expect(spy.callCount).to.equal(1);
    });
  });
});
