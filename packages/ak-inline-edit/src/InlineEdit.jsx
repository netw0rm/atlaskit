import React, { PureComponent, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import styles from 'style!./styles.less';
import classNames from 'classnames';
import Button from 'ak-button';
import Spinner from 'ak-spinner';
import ConfirmIcon from 'ak-icon/glyph/confirm';
import CancelIcon from 'ak-icon/glyph/cancel';
import EditIcon from 'ak-icon/glyph/edit';
import FieldBase from 'ak-field-base'; // eslint-disable-line

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
     * @description Whether or not inline edit is in loading state.
     *
     * Displays an ak-spinner component to show that is actively waiting for feedback.
     *
     * @memberof InlineEdit
     * @type {boolean}
     * @default false
     */
    isLoading: PropTypes.bool,
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
    isLoading: false,
    isLabelHidden: false,
    areActionButtonsHidden: false,
    isConfirmOnBlurDisabled: false,
  }

  state = {
    wasFocusReceivedSinceLastBlur: false,
  }

  onWrapperClick = () => {
    if (!this.isReadOnly() && !this.props.isEditing) {
      this.props.onEditRequested();
    }
  }

  onWrapperBlur = () => {
    if (this.isReadOnly() || !this.props.isEditing || this.props.isConfirmOnBlurDisabled) {
      return;
    }
    this.setState({ wasFocusReceivedSinceLastBlur: false });
    setTimeout(this.confirmIfUnfocused, 10);
  }

  onWrapperFocus = () => {
    this.setState({ wasFocusReceivedSinceLastBlur: true });
  }

  onConfirmClick = (event) => {
    // eslint-disable-next-line react/no-find-dom-node
    ReactDOM.findDOMNode(this.confirmButtonRef).focus();

    event.preventDefault();
    this.props.onConfirm();
  }

  onCancelClick = (event) => {
    // eslint-disable-next-line react/no-find-dom-node
    ReactDOM.findDOMNode(this.cancelButtonRef).focus();

    event.preventDefault();
    this.props.onCancel();
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

  confirmIfUnfocused = () => {
    if (!this.state.wasFocusReceivedSinceLastBlur) {
      this.props.onConfirm();
    }
  }

  isReadOnly = () =>
    typeof this.props.editView === 'undefined'

  shouldShowEditView = () =>
    this.props.isEditing && !this.isReadOnly()

  shouldRenderEditIcon = () => !this.isReadOnly() && !this.props.isInvalid;

  shouldRenderSpinner = () => this.props.isLoading && this.props.isEditing;

  renderActionButtons = () => (
    <div className={this.getActionButtonClasses()}>
      <Button
        appearance="subtle"
        iconBefore={<ConfirmIcon label="confirm" />}
        onClick={this.onConfirmClick}
        ref={(ref) => { this.confirmButtonRef = ref; }}
      />
      <Button
        appearance="subtle"
        iconBefore={<CancelIcon label="cancel" />}
        onClick={this.onCancelClick}
        ref={(ref) => { this.cancelButtonRef = ref; }}
      />
    </div>
  )

  renderEditIcon = () => (
    <div
      className={classNames({
        [styles.editButtonWrapper]: true,
        [styles.hidden]: !this.shouldRenderEditIcon(),
      })}
    >
      <button className={styles.editButton}>
        <EditIcon label="Edit" size="small" />
      </button>
    </div>
  )

  renderReadView = () => (
    <div className={styles.readViewContentWrapper}>
      {this.props.readView}
      {this.renderEditIcon()}
    </div>
  )

  renderSpinner = () => (
    <div className={styles.spinnerWrapper}>
      <Spinner />
    </div>
  )

  render = () => (
    <div className={styles.root}>
      <div // eslint-disable-line jsx-a11y/no-static-element-interactions
        onClick={this.onWrapperClick}
        onBlur={this.onWrapperBlur}
        onFocus={this.onWrapperFocus}
        className={this.getWrapperClasses()}
      >
        <FieldBase
          label={this.props.label}
          isInvalid={this.props.isInvalid}
          isFocused={this.isReadOnly() ? false : undefined}
          isLabelHidden={this.props.isLabelHidden}
          isReadOnly={this.isReadOnly()}
          isFitContainerWidthEnabled={this.props.isEditing}
          appearance={this.props.isEditing ? 'standard' : 'subtle'}
          isDisabled={this.shouldRenderSpinner()}
          rightGutter={
            this.shouldRenderSpinner() ? this.renderSpinner() : this.renderActionButtons()
          }
        >
          {this.shouldShowEditView() ? this.props.editView : this.renderReadView()}
        </FieldBase>
      </div>
    </div>
  )
}
