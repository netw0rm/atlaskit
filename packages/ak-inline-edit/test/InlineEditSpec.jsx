import chai, { expect } from 'chai';
import React from 'react';
import { mount, shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinonChai from 'sinon-chai';
import ConfirmIcon from 'ak-icon/glyph/confirm';
import CancelIcon from 'ak-icon/glyph/cancel';
import FieldBase from 'ak-field-base'; // eslint-disable-line
import Spinner from 'ak-spinner';
import InlineEdit from '../src/InlineEdit';

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
  isEditing: false,
  isInvalid: false,
  areActionButtonsHidden: false,
  isConfirmOnBlurDisabled: false,
  onConfirm: noop,
  onCancel: noop,
  onEditRequested: noop,
  readView: 'readView',
  editView: <Input value="test" />,
};

describe('ak-inline-edit', () => {
  it('should render read view inside FieldBase when in read mode', () => {
    const readView = <span>read</span>;
    const wrapper = mount(<InlineEdit {...defaultProps} readView={readView} />);
    expect(wrapper).to.have.exactly(1).descendants(FieldBase);
    const fieldBase = wrapper.find(FieldBase);
    expect(fieldBase).to.contain(readView);
  });

  it('should render edit view inside FieldBase when in editing mode', () => {
    const editView = <span>edit</span>;
    const wrapper = mount(<InlineEdit {...defaultProps} isEditing editView={editView} />);
    expect(wrapper).to.have.exactly(1).descendants(FieldBase);
    const fieldBase = wrapper.find(FieldBase);
    expect(fieldBase).to.contain(editView);
  });

  it('should render read view when in read-only mode', () => {
    const readView = <span>read</span>;
    expect(shallow(
      <InlineEdit
        {...defaultProps}
        isEditing
        readView={readView}
        editView={undefined}
      />))
        .to.contain(readView);
  });

  describe('onEditRequested', () => {
    it('should be called when the read view is clicked', () => {
      const spy = sinon.spy();
      const wrapper = mount(
        <InlineEdit
          {...defaultProps}
          onEditRequested={spy}
        />
      );
      wrapper.find(FieldBase).simulate('click');
      expect(spy).to.have.been.calledOnce;
    });

    it('should not be called when the edit view is clicked', () => {
      const spy = sinon.spy();
      const wrapper = mount(
        <InlineEdit
          {...defaultProps}
          isEditing
          onEditRequested={spy}
        />
      );
      wrapper.find(FieldBase).simulate('click');
      expect(spy).to.have.been.notCalled;
    });
  });

  describe('onConfirm', () =>
    it('should be called when confirmation button is clicked', () => {
      const spy = sinon.spy();
      const wrapper = mount(
        <InlineEdit
          {...defaultProps}
          onConfirm={spy}
        />
      );
      wrapper.find(ConfirmIcon).simulate('click');
      expect(spy).to.have.been.calledOnce;
    })
  );

  describe('onCancel', () =>
    it('should be called when cancel button is clicked', () => {
      const spy = sinon.spy();
      const wrapper = mount(
        <InlineEdit
          {...defaultProps}
          onCancel={spy}
        />
      );
      wrapper.find(CancelIcon).simulate('click');
      expect(spy).to.have.been.calledOnce;
    })
  );

  describe('label', () => {
    it('should set parameter into FieldBase', () => {
      expect(shallow(<InlineEdit {...defaultProps} label="test" />).find(FieldBase))
        .to.have.prop('label', 'test');
    });

    it('should set both isLabelHidden and label parameter into FieldBase', () => {
      const wrapper = shallow(<InlineEdit {...defaultProps} label="test" isLabelHidden />);
      const fieldBase = wrapper.find(FieldBase);
      expect(fieldBase).to.have.prop('label', 'test');
      expect(fieldBase).to.have.prop('isLabelHidden', true);
    });
  });

  describe('isWaiting', () => {
    describe('when isEditing is false', () =>
      it('should not render Spinner', () => {
        const fieldBase = mount(<InlineEdit {...defaultProps} isWaiting />).find(FieldBase);
        expect(shallow(fieldBase.prop('rightGutter'))).to.not.contain(<Spinner />);
      })
    );

    describe('when isEditing is true', () => {
      let wrapper;

      beforeEach(() => (
        wrapper = shallow(<InlineEdit {...defaultProps} isWaiting isEditing />)
      ));

      it('should render Spinner', () =>
        expect(shallow(wrapper.find(FieldBase).prop('rightGutter'))).to.contain(<Spinner />)
      );

      it('should disable field base', () =>
        expect(wrapper.find(FieldBase)).to.have.prop('isDisabled', true)
      );
    });
  });
});
