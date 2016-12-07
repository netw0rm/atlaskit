import chai, { expect } from 'chai';
import React from 'react';
import { shallow, mount } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinonChai from 'sinon-chai';
import FieldBase from 'ak-field-base';
import ConfirmIcon from 'ak-icon/glyph/confirm';
import CancelIcon from 'ak-icon/glyph/cancel';
import EditView from '../src/Edit';

chai.use(chaiEnzyme());
chai.use(sinonChai);

const noop = () => {};
const Input = props =>
  <input
    {...props}
    onChange={noop}
  />;

const defaultProps = {
  label: 'test',
  isLabelHidden: false,
  isConfirmOnBlurDisabled: false,
  onConfirm: noop,
  onCancel: noop,
  content: <Input value="test" />,
};

describe('ak-inline-edit', () => {
  describe('Edit View', () => {
    describe('defaults', () =>
      it('should render contentc inside FieldBase', () => {
        const wrapper = shallow(<EditView {...defaultProps} />);
        expect(wrapper).to.have.exactly(1).descendants(FieldBase);
        const fieldBase = wrapper.find(FieldBase);
        expect(fieldBase).to.have.exactly(1).descendants(Input);
        expect(fieldBase.find(Input)).to.have.prop('value', 'test');
      })
    );

    describe('onConfirm', () =>
      it('should be called when confirmation button is clicked', () => {
        const spy = sinon.spy();
        const wrapper = mount(
          <EditView
            {...defaultProps}
            onConfirm={spy}
          />
        );
        wrapper.find(ConfirmIcon).simulate('click');
        expect(spy).to.have.been.calledOnce;
      })
    );

    describe('onCancel', () =>
      it('should be called when cancellation button is clicked', () => {
        const spy = sinon.spy();
        const wrapper = mount(
          <EditView
            {...defaultProps}
            onCancel={spy}
          />
        );
        wrapper.find(CancelIcon).simulate('click');
        expect(spy).to.have.been.calledOnce;
      })
    );
  });
});
