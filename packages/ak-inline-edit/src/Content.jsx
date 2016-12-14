import React, { PureComponent, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import Button from 'ak-button';
import ConfirmIcon from 'ak-icon/glyph/confirm';
import CancelIcon from 'ak-icon/glyph/cancel';
import EditIcon from 'ak-icon/glyph/edit';
import FieldBase from 'ak-field-base';
import { locals } from './styles.less';

/* eslint-disable react/prefer-stateless-function */
export default class Content extends PureComponent {
  static propTypes = {
    label: PropTypes.string.isRequired,
    isEditing: PropTypes.bool.isRequired,
    isInvalid: PropTypes.bool.isRequired,
    isLabelHidden: PropTypes.bool.isRequired,
    areActionButtonsHidden: PropTypes.bool.isRequired,
    isConfirmOnBlurDisabled: PropTypes.bool.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onEditRequested: PropTypes.func.isRequired,
    readView: PropTypes.node.isRequired,
    editView: PropTypes.node,
  }

  onWrapperClick = () => {
    if (!this.isReadOnly() && !this.props.isEditing) {
      this.props.onEditRequested();
    }
  }

  onWrapperBlur = (event) => {
    if (this.isReadOnly() || !this.props.isEditing || this.props.isConfirmOnBlurDisabled) {
      return;
    }

    const domNodeReceivingFocus = event.relatedTarget;

    // We receive 'blur' events even when focus moves from one
    // inline edit subcomponent to another, so we must ensure
    // that focus has entirely left the component before we
    // trigger 'onConfirm'.
    if (this.didFocusLeaveInlineEdit(domNodeReceivingFocus)) {
      this.props.onConfirm();
    }
  }

  getWrapperClasses = () =>
    classNames({
      [locals.readViewWrapper]: !this.props.isEditing,
    })

  getActionButtonClasses = () =>
    classNames({
      [locals.buttonsWrapper]: true,
      [locals.buttonWrapperHidden]: !this.props.isEditing,
    })

  getDOMNode = ref =>
    // eslint-disable-next-line react/no-find-dom-node
    ReactDOM.findDOMNode(ref)

  didFocusLeaveInlineEdit = domNodeReceivingFocus =>
    domNodeReceivingFocus !== this.getDOMNode(this.confirmButtonRef) &&
    domNodeReceivingFocus !== this.getDOMNode(this.cancelButtonRef) &&
    domNodeReceivingFocus !== this.getDOMNode(this.editViewRef)

  isReadOnly = () =>
    typeof this.props.editView === 'undefined'

  shouldShowEditView = () =>
    this.props.isEditing && !this.isReadOnly()

  renderActionButtons = () => (
    <div className={this.getActionButtonClasses()}>
      <Button
        appearance="subtle"
        iconBefore={<ConfirmIcon label="confirm" />}
        onClick={this.props.onConfirm}
        ref={(confirmButtonRef) => { this.confirmButtonRef = confirmButtonRef; }}
      />
      <Button
        appearance="subtle"
        iconBefore={<CancelIcon label="cancel" />}
        onClick={this.props.onCancel}
        ref={(cancelButtonRef) => { this.cancelButtonRef = cancelButtonRef; }}
      />
    </div>
  )

  renderEditIcon = () => (
    <div className={locals.editButtonWrapper}>
      <button className={locals.editButton}>
        <EditIcon label="Edit" size="small" />
      </button>
    </div>
  )

  renderReadView = () => (
    <div className={locals.readViewContentWrapper}>
      {this.props.readView}
      {(this.isReadOnly() || this.props.isInvalid) ? null : this.renderEditIcon()}
    </div>
  )

  renderEditView = () => (
    React.cloneElement(this.props.editView,
        { ref: (editViewRef) => { this.editViewRef = editViewRef; } }
    )
  )

  render = () => (
    <div // eslint-disable-line jsx-a11y/no-static-element-interactions
      onClick={this.onWrapperClick}
      onBlur={this.onWrapperBlur}
      className={this.getWrapperClasses()}
    >
      <FieldBase
        label={this.props.label}
        isInvalid={this.props.isInvalid}
        isFocused={this.isReadOnly() ? false : undefined}
        isLabelHidden={this.props.isLabelHidden}
        isReadOnly={typeof this.props.editView === 'undefined'}
        appearance={this.props.isEditing ? 'standard' : 'subtle'}
        rightGutter={this.props.areActionButtonsHidden ? null : this.renderActionButtons()}
      >
        {this.shouldShowEditView() ? this.renderEditView() : this.renderReadView()}
      </FieldBase>
    </div>
  )
}
