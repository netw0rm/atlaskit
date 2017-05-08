import React, { PureComponent, PropTypes, cloneElement } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import Button from '@atlaskit/button';
import ConfirmIcon from '@atlaskit/icon/glyph/confirm';
import CancelIcon from '@atlaskit/icon/glyph/cancel';
import FieldBase, { Label } from '@atlaskit/field-base'; // eslint-disable-line
import styles from './styles.less';

export default class InlineEdit extends PureComponent {
  static propTypes = {
    label: PropTypes.string.isRequired,
    /** Component to be shown when reading only */
    readView: PropTypes.node.isRequired,
    /** Component to be shown when editing. Should be an @atlaskit/input. */
    editView: PropTypes.node,
    /** Whether the component shows the readView or the editView. */
    isEditing: PropTypes.bool.isRequired,
    /** Greys out text and shows spinner. */
    isWaiting: PropTypes.bool,
    /** Sets yellow border with warning symbol at end of input. */
    isInvalid: PropTypes.bool,
    /** Determine whether the label is shown. */
    isLabelHidden: PropTypes.bool,
    /** Sets whether the checkmark and cross are displayed in the bottom right fo the field. */
    areActionButtonsHidden: PropTypes.bool,
    /** Sets whether the confirm function is called when the input loses focus. */
    isConfirmOnBlurDisabled: PropTypes.bool,
    /** Handler called when the wrapper or the label are clicked. */
    onEditRequested: PropTypes.func.isRequired,
    /** Handler called when checkmark is clicked. Also by default
    called when the input loses focus. */
    onConfirm: PropTypes.func.isRequired,
    /** Handler called when the cross is clicked on. */
    onCancel: PropTypes.func.isRequired,
    /** html to pass down to the label htmlFor prop. */
    labelHtmlFor: PropTypes.string,
    /** Set whether onConfirm is called on pressing enter. */
    shouldConfirmOnEnter: PropTypes.bool,
    /** Set whether default stylings should be disabled when editing. */
    disableEditViewFieldBase: PropTypes.bool,
    /** Component to b shown in an @atlaskit/inline-dialog when edit view is open. */
    invalidMessage: PropTypes.node,
  }

  static defaultProps = {
    isInvalid: false,
    isWaiting: false,
    isLabelHidden: false,
    areActionButtonsHidden: false,
    isConfirmOnBlurDisabled: false,
    shouldConfirmOnEnter: false,
    disableEditViewFieldBase: false,
    invalidMessage: '',
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
    // eslint-disable-next-line react/no-did-update-set-state
    this.setState({
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

  onDialogClick = (event) => {
    event.stopPropagation();
  }

  getRootClasses = () =>
    classNames({
      [styles.root]: true,
      [styles.readViewWrapper]: !this.props.isEditing,
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

  wrapWithFieldBase = children => (
    <FieldBase
      isInvalid={this.props.isInvalid}
      isFocused={this.isReadOnly() ? false : undefined}
      isReadOnly={this.isReadOnly()}
      isFitContainerWidthEnabled={this.props.isEditing}
      appearance={this.props.isEditing ? 'standard' : 'subtle'}
      isDisabled={this.shouldRenderSpinner()}
      isLoading={this.shouldRenderSpinner()}
      shouldReset={this.state.shouldResetFieldBase}
      invalidMessage={this.props.invalidMessage}
      onDialogClick={this.onDialogClick}
    >
      {children}
    </FieldBase>
  )

  renderActionButtons = () => (
    this.props.isEditing && !this.props.areActionButtonsHidden ?
      <div className={styles.buttonsWrapper}>
        <div className={styles.buttonWrapper}>
          <Button
            iconBefore={<ConfirmIcon label="confirm" />}
            onClick={this.onConfirmClick}
            ref={(ref) => { this.confirmButtonRef = ref; }}
            className={styles.button}
          />
        </div>
        <div className={styles.buttonWrapper}>
          <Button
            iconBefore={<CancelIcon label="cancel" />}
            onClick={this.onCancelClick}
            ref={(ref) => { this.cancelButtonRef = ref; }}
            className={styles.button}
          />
        </div>
      </div> :
      null
  )

  renderReadView = () => (
    this.wrapWithFieldBase(
      <div className={styles.readViewContentWrapper}>
        {this.props.readView}
        <button className={styles.editButton} />
      </div>
    )
  )

  renderEditView = () => {
    const editView = this.props.shouldConfirmOnEnter ?
          cloneElement(this.props.editView, {
            onConfirm: this.props.onConfirm,
          }) :
          this.props.editView;

    return this.props.disableEditViewFieldBase ? editView : this.wrapWithFieldBase(editView);
  }

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
            {this.shouldShowEditView() ? this.renderEditView() : this.renderReadView()}
          </div>
          {!this.shouldRenderSpinner() ? this.renderActionButtons() : null}
        </div>
      </div>
    );
  }
}
