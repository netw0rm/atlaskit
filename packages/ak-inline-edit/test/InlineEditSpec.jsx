import chai, { expect } from 'chai';
import React from 'react';
import { mount, shallow } from 'enzyme';
import sinonChai from 'sinon-chai';
import ConfirmIcon from 'ak-icon/glyph/confirm';
import CancelIcon from 'ak-icon/glyph/cancel';
import FieldBase, { Label } from 'ak-field-base'; // eslint-disable-line
import Spinner from 'ak-spinner';
import InlineEdit from '../src/InlineEdit';

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

  describe('read-only mode', () => {
    it('should render the read view when "false" is supplied as the edit view', () => {
      const readView = <span>read</span>;
      const wrapper = shallow(
        <InlineEdit
          {...defaultProps}
          isEditing
          readView={readView}
          editView={false}
        />
      );
      expect(wrapper).to.contain(readView);
    });

    it('should render the read view when "null" is supplied as the edit view', () => {
      const readView = <span>read</span>;
      const wrapper = shallow(
        <InlineEdit
          {...defaultProps}
          isEditing
          readView={readView}
          editView={null}
        />
      );
      expect(wrapper).to.contain(readView);
    });

    it('should render the read view when "undefined" is supplied as the edit view', () => {
      const readView = <span>read</span>;
      const wrapper = shallow(
        <InlineEdit
          {...defaultProps}
          isEditing
          readView={readView}
          editView={undefined}
        />
      );
      expect(wrapper).to.contain(readView);
    });
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
      expect(spy.callCount).to.equal(1);
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
      expect(spy.called).to.equal(false);
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
      expect(spy.callCount).to.equal(1);
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
      expect(spy.callCount).to.equal(1);
    })
  );

  describe('label', () => {
    it('should set parameter into FieldBase', () => {
      expect(shallow(<InlineEdit {...defaultProps} label="test" />).find(Label))
        .to.have.prop('label', 'test');
    });

    it('should set both isLabelHidden and label parameter into FieldBase', () => {
      const wrapper = shallow(<InlineEdit {...defaultProps} label="test" isLabelHidden />);
      const fieldBase = wrapper.find(Label);
      expect(fieldBase.prop('label')).to.equal('test');
      expect(fieldBase.prop('isLabelHidden')).to.equal(true);
    });

    it('it should not call onClick if is read only', () => {
      const spy = sinon.spy();
      const wrapper = mount(
        <InlineEdit
          {...defaultProps}
          label="test"
          onEditRequested={spy}
          editView={undefined}
        />
      );
      const label = wrapper.find(Label);
      /**
       * We cannot use simulate here since the node that has the event handler is inside Label.
       *
       * Otherwise we will be exposing implementation details from FieldBase and also
       * we would be coupling this test to the current structure of FieldBase.
       *
       * So instead, we find the first node inside Label that has `onClick` and that it's not
       * the Label itself, and then we simulate the event on that node.
       **/
      const onClickNode = label.findWhere(n => n.prop('onClick') && n.find(Label).isEmpty()).at(0);
      onClickNode.simulate('click');
      expect(spy.called).to.equal(false);
    });
  });

  describe('isWaiting', () => {
    describe('when isEditing is false', () =>
      it('should not render Spinner', () => {
        const wrapper = mount(<InlineEdit {...defaultProps} isWaiting />);
        expect(wrapper).to.not.contain(<Spinner />);
      })
    );

    describe('when isEditing is true', () => {
      let wrapper;

      beforeEach(() => (
        wrapper = shallow(<InlineEdit {...defaultProps} isWaiting isEditing />)
      ));

      it('should render Spinner', () =>
        expect(wrapper).to.contain(<Spinner />)
      );

      it('should disable field base', () =>
        expect(wrapper.find(FieldBase).prop('isDisabled', true)).to.not.equal(undefined)
      );
    });
  });
});
