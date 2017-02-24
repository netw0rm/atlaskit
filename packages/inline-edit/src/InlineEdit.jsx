import React, { PureComponent, PropTypes, cloneElement } from 'react';
import ReactDOM from 'react-dom';
import styles from 'style!./styles.less';
import classNames from 'classnames';
import Button from '@atlaskit/button';
import Spinner from '@atlaskit/spinner';
import ConfirmIcon from '@atlaskit/icon/glyph/confirm';
import CancelIcon from '@atlaskit/icon/glyph/cancel';
import EditIcon from '@atlaskit/icon/glyph/edit';
import FieldBase, { Label } from '@atlaskit/field-base'; // eslint-disable-line

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
     * If this node is undefined/null/false, the component will display in read-only mode.
     *
     * This node will be passed the onConfirm callback passed to InlineEdit.
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
     * @description Whether or not inline edit is on waiting mode.
     *
     * Displays a spinner to the right of the field to indicate that the value
     * is currently being saved/validated.
     *
     * @memberof InlineEdit
     * @type {boolean}
     * @default false
     */
    isWaiting: PropTypes.bool,
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
    /**
     * @description Flag to handle input confirmation automatically when enter is pressed
     *
     * This property assumes that the editView has an `onConfirm` property
     * which is a function to be called
     *
     * @memberof InlineEdit
     * @type {boolean}
     * @default {false}
     */
    shouldConfirmOnEnter: PropTypes.bool,
    labelHtmlFor: PropTypes.string,
  }

  static defaultProps = {
    isInvalid: false,
    isWaiting: false,
    isLabelHidden: false,
    areActionButtonsHidden: false,
    isConfirmOnBlurDisabled: false,
    shouldConfirmOnEnter: false,
  }

  state = {
    wasFocusReceivedSinceLastBlur: false,
    resetFieldBase: false,
    shouldResetFieldBase: false,
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ shouldResetFieldBase: this.props.isEditing && !nextProps.isEditing });
  }

  componentDidUpdate() {
    this.setState({ // eslint-disable-line react/no-did-update-set-state
      shouldResetFieldBase: false,
    });
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

  getRootClasses = () =>
    classNames({
      [styles.root]: true,
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
    !this.props.editView

  shouldShowEditView = () =>
    this.props.isEditing && !this.isReadOnly()

  shouldRenderEditIcon = () => !this.isReadOnly() && !this.props.isInvalid;

  shouldRenderSpinner = () => this.props.isWaiting && this.props.isEditing;

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
      })}
    >
      <button
        className={classNames({
          [styles.editButton]: true,
          [styles.hidden]: !this.shouldRenderEditIcon(),
        })}
      >
        <div
          className={classNames({
            [styles.editIconWrapper]: true,
            [styles.hidden]: !this.shouldRenderEditIcon(),
          })}
        >
          <EditIcon label="Edit" size="small" />
        </div>
      </button>
    </div>
  )

  renderReadView = () => (
    <div className={styles.readViewContentWrapper}>
      {this.props.readView}
      {this.renderEditIcon()}
    </div>
  )

  renderEditView = () => (
    this.props.shouldConfirmOnEnter ?
      cloneElement(this.props.editView, {
        onConfirm: this.props.onConfirm,
      }) :
      this.props.editView
  )

  renderSpinner = () => (
    <div className={styles.spinnerWrapper}>
      <Spinner />
    </div>
  )

  render() {
    return (
      <div className={this.getRootClasses()}>
        <div style={{ position: (this.props.isLabelHidden ? 'absolute' : 'relative') }}>
          <Label
            appearance="inline-edit"
            label={this.props.label}
            isLabelHidden={this.props.isLabelHidden}
            htmlFor={this.isReadOnly() ? undefined : this.props.labelHtmlFor}
            onClick={this.onWrapperClick}
          />
        </div>
        <div
          className={styles.contentWrapper}
          onBlur={this.onWrapperBlur}
          onFocus={this.onWrapperFocus}
        >
          <div // eslint-disable-line jsx-a11y/no-static-element-interactions
            className={styles.fieldBaseWrapper}
            onClick={this.onWrapperClick}
          >
            <FieldBase
              isInvalid={this.props.isInvalid}
              isFocused={this.isReadOnly() ? false : undefined}
              isReadOnly={this.isReadOnly()}
              isFitContainerWidthEnabled={this.props.isEditing}
              appearance={this.props.isEditing ? 'standard' : 'subtle'}
              isDisabled={this.shouldRenderSpinner()}
              shouldReset={this.state.shouldResetFieldBase}
            >
              {this.shouldShowEditView() ? this.renderEditView() : this.renderReadView()}
            </FieldBase>
          </div>
          {this.shouldRenderSpinner() ? this.renderSpinner() : this.renderActionButtons()}
        </div>
      </div>
    );
  }
}
