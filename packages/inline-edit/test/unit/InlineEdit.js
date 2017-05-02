import sinon from 'sinon';

import React from 'react';
import { mount, shallow } from 'enzyme';
import ConfirmIcon from '@atlaskit/icon/glyph/confirm';
import CancelIcon from '@atlaskit/icon/glyph/cancel';
import FieldBase, { Label } from '@atlaskit/field-base';

import InlineEdit from '../../src/InlineEdit';

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

describe('@atlaskit/inline-edit', function test() {
  this.timeout(5000);

  it('should render read view inside FieldBase when in read mode', () => {
    const readView = <span>read</span>;
    const wrapper = mount(<InlineEdit {...defaultProps} readView={readView} />);
    expect(wrapper.find(FieldBase).length).to.equal(1);
    const fieldBase = wrapper.find(FieldBase);
    expect(fieldBase.contains(readView)).to.equal(true);
  });

  it('should render edit view inside FieldBase when in editing mode', () => {
    const editView = <span>edit</span>;
    const wrapper = mount(<InlineEdit {...defaultProps} isEditing editView={editView} />);
    expect(wrapper.find(FieldBase).length).to.equal(1);
    const fieldBase = wrapper.find(FieldBase);
    expect(fieldBase.contains(editView)).to.equal(true);
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
      expect(wrapper.contains(readView)).to.equal(true);
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
      expect(wrapper.contains(readView)).to.equal(true);
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
      expect(wrapper.contains(readView)).to.equal(true);
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
          isEditing
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
          isEditing
          onCancel={spy}
        />
      );
      wrapper.find(CancelIcon).simulate('click');
      expect(spy.callCount).to.equal(1);
    })
  );

  describe('label', () => {
    it('should set parameter into FieldBase', () => {
      expect(shallow(<InlineEdit {...defaultProps} label="test" />).find(Label).prop('label'))
        .to.equal('test');
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
      const onClickNode = label.findWhere(n => n.prop('onClick') && !n.find(Label).exists()).at(0);
      onClickNode.simulate('click');
      expect(spy.called).to.equal(false);
    });
  });

  describe('shouldResetFieldBase', () => {
    describe('when switching from isEditing=true to isEditing=false', () =>
      it('should set shouldReset property on FieldBase', () => {
        const wrapper = shallow(<InlineEdit {...defaultProps} isEditing />);
        wrapper.setProps({ isEditing: false });
        expect(wrapper.find(FieldBase).prop('shouldReset')).to.equal(true);
      })
    );

    describe('when switching from isEditing=false to isEditing=true', () =>
      it('should not set shouldReset property on FieldBase', () => {
        const wrapper = shallow(<InlineEdit {...defaultProps} />);
        wrapper.setProps({ isEditing: true });
        expect(wrapper.find(FieldBase).prop('shouldReset')).to.equal(false);
      })
    );
  });

  describe('isWaiting', () => {
    describe('when isEditing is false', () =>
      it('FieldBase should not have isLoading prop', () => {
        const wrapper = mount(<InlineEdit {...defaultProps} isWaiting />);
        expect(wrapper.find(FieldBase).prop('isLoading')).to.equal(false);
      })
    );

    describe('when isEditing is true', () => {
      let wrapper;

      beforeEach(() => (
        wrapper = shallow(<InlineEdit {...defaultProps} isWaiting isEditing />)
      ));

      it('FieldBase should have prop isLoading', () =>
        expect(wrapper.find(FieldBase).prop('isLoading')).to.equal(true)
      );

      it('should disable field base', () =>
        expect(wrapper.find(FieldBase).prop('isDisabled', true)).to.not.equal(undefined)
      );
    });
  });

  describe('disableEditViewFieldBase', () => {
    it('should not wrap editView in a FieldBase when set to true', () => {
      const wrapper = mount(
        <InlineEdit
          {...defaultProps}
          isEditing
          disableEditViewFieldBase
        />
      );

      expect(wrapper.find(FieldBase).length).to.equal(0);
    });

    it('should wrap editView in a FieldBase when set to false', () => {
      const wrapper = mount(
        <InlineEdit
          {...defaultProps}
          isEditing
          disableEditViewFieldBase={false}
        />
      );

      expect(wrapper.find(FieldBase).length).to.equal(1);
    });

    it('should default to false', () => {
      const wrapper = mount(
        <InlineEdit
          {...defaultProps}
          isEditing
        />
      );

      expect(wrapper.prop('disableEditViewFieldBase')).to.equal(false);
    });
  });

  describe('invalidMessage prop', () => {
    it('should be reflected to the FieldBase', () => {
      expect(shallow(<InlineEdit {...defaultProps} invalidMessage="test" />)
        .find(FieldBase).props().invalidMessage).to.equal('test');
    });
  });

  describe('isInvalid prop', () => {
    it('should be reflected to the FieldBase', () => {
      expect(shallow(<InlineEdit {...defaultProps} isInvalid />)
        .find(FieldBase).props().isInvalid).to.equal(true);
    });
  });
});
