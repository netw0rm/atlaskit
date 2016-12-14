import React, { PureComponent, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import styles from 'style!./styles.less';
import classNames from 'classnames';
import Button from 'ak-button';
import ConfirmIcon from 'ak-icon/glyph/confirm';
import CancelIcon from 'ak-icon/glyph/cancel';
import EditIcon from 'ak-icon/glyph/edit';
import FieldBase from 'ak-field-base';

export default class InlineEdit extends PureComponent {
  static propTypes = {
    /**
     * @description The label to be rendered above the inline edit.
     *
     * This prop is still required, even if the hideLabel prop is set as the label is also used to
     * make the field accessible for screen readers.
     *
     * @memberof InlineEdit
     * @type {string}
     */
    label: PropTypes.string.isRequired,
    /**
     * @description The value, element or component to be displayed in read mode.
     *
     * This node should display the value of the field when the user is not editing it.
     *
     * @memberof InlineEdit
     * @type {ReactNode}
     */
    readView: PropTypes.node.isRequired,
    /**
     * @description The element or component to be displayed in edit mode (optional).
     *
     * This node should allow the user to edit the value of the field.
     *
     * If this node is not supplied, the component will display in read-only mode.
     *
     * @memberof InlineEdit
     * @type {ReactNode}
     */
    editView: PropTypes.node,
    /**
     * @description Whether InlineEdit is on Edit mode or Read mode.
     *
     * @memberof InlineEdit
     * @type {boolean}
     */
    isEditing: PropTypes.bool.isRequired,
    /**
     * @description Whether or not a validation error should be displayed.
     *
     * Displays a warning icon and highlights the the input with an orange border.
     * A future release will also allow a custom error message to be displayed.
     *
     * @memberof InlineEdit
     * @type {boolean}
     * @default false
     */
    isInvalid: PropTypes.bool,
    /**
     * @description Whether InlineEdit should display its label.
     *
     * @memberof InlineEdit
     * @type {boolean}
     * @default false
     */
    isLabelHidden: PropTypes.bool,
    /**
     * @description Whether the confirm/cancel buttons are hidden when in edit mode.
     *
     * The confirm/cancel buttons should typically be hidden when an inline dialog
     * (dropdown, calendar, etc) is being displayed in edit mode. The buttons should
     * only be made visible once the user has selected an option from the inline dialog.
     *
     * @memberof InlineEdit
     * @type {boolean}
     * @default false
     */
    areActionButtonsHidden: PropTypes.bool,
    /**
     * @description Allows disabling the default confirm-on-blur behaviour.
     *
     * By default, the 'onConfirm' callback will be called when focus moves
     * outside the inline edit component. This prop allows disabling this
     * behaviour. If this prop is set to 'true', 'onConfirm' will only be
     * called if the user explicitly clicks on the confirm button.
     *
     * @memberof InlineEdit
     * @type {boolean}
     * @default false
     */
    isConfirmOnBlurDisabled: PropTypes.bool,
    /**
     * @description Called when the user requests that edit mode be entered
     *
     * For example, will be called when the user clicks on the input.
     *
     * The parent component would typically set the InlineEdit's 'isEditing'
     * prop true in response to this.
     *
     * @memberof InlineEdit
     * @type {Function}
     */
    onEditRequested: PropTypes.func.isRequired,
    /**
     * @description Called when the user confirms a new value
     *
     * The typical response would be to check if the editing value is valid,
     * and if so, save it and switch 'isEditing' to false.
     *
     * @memberof InlineEdit
     * @type {Function}
     */
    onConfirm: PropTypes.func.isRequired,
    /**
     * @description Called when the user cancels an edit
     *
     * The typical response would be to discard the current editing value and switch
     * 'isEditing' to false.
     *
     * @memberof InlineEdit
     * @type {Function}
     */
    onCancel: PropTypes.func.isRequired,
  }

  static defaultProps = {
    isInvalid: false,
    isLabelHidden: false,
    areActionButtonsHidden: false,
    isConfirmOnBlurDisabled: false,
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
      [styles.readViewWrapper]: !this.props.isEditing,
    })

  getActionButtonClasses = () =>
    classNames({
      [styles.buttonsWrapper]: true,
      [styles.buttonWrapperHidden]: !this.props.isEditing || this.props.areActionButtonsHidden,
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
    <div className={styles.editButtonWrapper}>
      <button className={styles.editButton}>
        <EditIcon label="Edit" size="small" />
      </button>
    </div>
  )

  renderReadView = () => (
    <div className={styles.readViewContentWrapper}>
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
    <div className={styles.root}>
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
          isReadOnly={this.isReadOnly()}
          appearance={this.props.isEditing ? 'standard' : 'subtle'}
          rightGutter={this.renderActionButtons()}
        >
          {this.shouldShowEditView() ? this.renderEditView() : this.renderReadView()}
        </FieldBase>
      </div>
    </div>
  )
}
