import React from 'react';
import { shallow, mount } from 'enzyme';
import Base from '@atlaskit/field-base';

import FieldTextSmart, { FieldText } from '../src';

describe('ak-field-text', () => {
  // Stub window.cancelAnimationFrame, so Popper (used in Layer) doesn't error when accessing it.
  const animStub = window.cancelAnimationFrame;
  beforeEach(() => {
    window.cancelAnimationFrame = () => {};
  });

  afterEach(() => {
    window.cancelAnimationFrame = animStub;
  });

  it('defaults', () => {
    const wrapper = shallow(<FieldText />);
    expect(wrapper.find(Base).length).to.equal(1);
    expect(wrapper.find('input').length).to.equal(1);
  });

  describe('properties', () => {
    describe('compact prop', () => {
      it('should reflect its value to the FieldBase', () => {
        expect(shallow(<FieldText compact />).find(Base).props().isCompact).to.equal(true);
      });
    });

    describe('disabled prop', () => {
      it('should reflect its value to the FieldBase', () => {
        expect(shallow(<FieldText disabled />).find(Base).props().isDisabled).to.equal(true);
      });
    });

    describe('required prop', () => {
      it('should reflect its value to the FieldBase', () => {
        expect(shallow(<FieldText required />).find(Base).props().isRequired).to.equal(true);
      });
    });

    describe('isInvalid prop', () => {
      it('should reflect its value to the FieldBase', () => {
        expect(shallow(<FieldText isInvalid />).find(Base).props().isInvalid).to.equal(true);
      });
    });

    describe('invalidMessage prop', () => {
      it('should reflect its value to the FieldBase', () => {
        expect(shallow(<FieldText invalidMessage="test" />).find(Base).props().invalidMessage).to.equal('test');
      });
    });

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
