import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import { shallow } from 'enzyme';
import styles from '../src/styles.less';

import Input from '../src/Input';

chai.use(chaiEnzyme());

describe('ak-field-text', () =>
  describe('Input', () => {
    it('defaults', () => {
      const wrapper = shallow(<Input />);
      expect(wrapper).to.have.exactly(1).descendants('input');
      expect(wrapper).to.have.className(styles.locals.input);
    });

    describe('properties', () => {
      [
        { type: 'email' },
        { required: true },
        { name: 'test' },
        { placeholder: 'test' },
        { value: 'test' },
      ].forEach(prop =>
        describe(JSON.stringify(prop), () =>
          it('input should have attribute defined', () =>
            expect(shallow(<Input {...prop} />).find('input')).to.have.props(prop)
          )
        )
      );
    });

    describe('value state', () => {
      it('should update input value', () => {
        const wrapper = shallow(<Input value="test" />);
        expect(wrapper.find('input')).to.have.prop('value', 'test');
        wrapper.setState({ value: 'something' });
        expect(wrapper.find('input')).to.have.prop('value', 'something');
      });
    });
  })
);
