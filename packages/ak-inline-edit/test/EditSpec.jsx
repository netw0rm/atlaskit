import chai, { expect } from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinonChai from 'sinon-chai';
import FieldBase from 'ak-field-base';
import EditView from '../src/Edit';

const Input = props => <input {...props} />;

chai.use(chaiEnzyme());
chai.use(sinonChai);

const defaultProps = {
  label: 'test',
  isLabelHidden: false,
  children: <Input value="test" />,
};

describe('ak-inline-edit', () => {
  describe('Edit View', () => {
    describe('defaults', () =>
      it('should render children inside FieldBase', () => {
        const wrapper = shallow(<EditView {...defaultProps} />);
        expect(wrapper).to.have.exactly(1).descendants(FieldBase);
        const fieldBase = wrapper.find(FieldBase);
        expect(fieldBase).to.have.exactly(1).descendants(Input);
        expect(fieldBase.find(Input)).to.have.prop('value', 'test');
      })
    );
  });
});
