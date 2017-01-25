import chai from 'chai';
import React, { Component } from 'react';
import { mount, shallow } from 'enzyme';

import Radio from '../src/Radio';
import { name } from '../package.json';

const { expect } = chai;
describe(name, () => {
  describe('Radio', () => {
    describe('exports', () => {
      it('the Radio component', () => {
        expect(Radio).not.to.equal(undefined);
        expect(new Radio()).to.be.instanceOf(Component);
      });
    });

    describe('construction', () => {
      it('should be able to create a component', () => {
        const wrapper = shallow(<Radio />);
        expect(wrapper).not.to.equal(undefined);
        expect(wrapper.instance()).to.be.instanceOf(Component);
      });

      it('should render an input and the content', () => {
        const content = 'content';
        const wrapper = mount(<Radio>{content}</Radio>);
        expect(wrapper).to.have.exactly(1).descendants('input');
        expect(wrapper).to.have.text(content);
      });

      it('should render content with markup correctly', () => {
        const content = (<div>content</div>);
        const wrapper = mount(<Radio>{content}</Radio>);
        expect(wrapper).to.have.exactly(1).descendants('input');
        expect(wrapper).to.contain(content);
      });
    });

    describe('props', () => {
      function expectPropReflectedToInput(prop, inputProp, val) {
        it('should be reflected to the input', () => {
          const props = { [prop]: val };
          const wrapper = mount(<Radio {...props} />);
          expect(wrapper.find('input')).to.have.prop(inputProp, val);
        });
      }

      describe('isDisabled prop', () => {
        expectPropReflectedToInput('isDisabled', 'disabled', true);
        expectPropReflectedToInput('isDisabled', 'disabled', false);
      });

      describe('isRequired prop', () => {
        expectPropReflectedToInput('isRequired', 'required', true);
        expectPropReflectedToInput('isRequired', 'required', false);
      });

      describe('isSelected prop', () => {
        expectPropReflectedToInput('isSelected', 'checked', true);
        expectPropReflectedToInput('isSelected', 'checked', false);
      });

      describe('name prop', () => {
        expectPropReflectedToInput('name', 'name', 'name-val');
      });

      describe('onChange prop', () => {
        const func = () => {};
        expectPropReflectedToInput('onChange', 'onChange', func);

        it('should be reflected to the input', () => {
          const spy = sinon.spy();
          const wrapper = mount(<Radio onChange={spy} />);
          wrapper.find('input').simulate('change');
          expect(spy.calledOnce).to.equal(true);
        });
      });

      describe('value prop', () => {
        expectPropReflectedToInput('value', 'value', 'value-val');
      });
    });
  });
});
