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
      const wrapper = shallow(<Input onChange={() => {}} />);
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
            expect(shallow(<Input {...prop} onChange={() => {}} />)
              .find('input')).to.have.props(prop)
          )
        )
      );
    });

    describe('onChange', () =>
      it('should call onChange when input value change', () => {
        const spy = sinon.spy();
        const wrapper = shallow(<Input onChange={spy} />);
        wrapper.find('input').simulate('change');
        expect(spy).to.be.calledOnce;
      })
    );
  })
);
