import React, { PureComponent, PropTypes, cloneElement } from 'react';
import ReactDOM from 'react-dom';
import styles from 'style!./styles.less';
import classNames from 'classnames';
import Button from '@atlaskit/button';
import ConfirmIcon from '@atlaskit/icon/glyph/confirm';
import CancelIcon from '@atlaskit/icon/glyph/cancel';
import FieldBase, { Label } from '@atlaskit/field-base'; // eslint-disable-line

export default class InlineEdit extends PureComponent {
  static propTypes = {
    label: PropTypes.string.isRequired,
    readView: PropTypes.node.isRequired,
    editView: PropTypes.node,
    isEditing: PropTypes.bool.isRequired,
    isWaiting: PropTypes.bool,
    isInvalid: PropTypes.bool,
    isLabelHidden: PropTypes.bool,
    areActionButtonsHidden: PropTypes.bool,
    isConfirmOnBlurDisabled: PropTypes.bool,
    onEditRequested: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    labelHtmlFor: PropTypes.string,
    shouldConfirmOnEnter: PropTypes.bool,
    shouldWrapEditViewWithFieldBase: PropTypes.bool,
  }

  static defaultProps = {
    isInvalid: false,
    isWaiting: false,
    isLabelHidden: false,
    areActionButtonsHidden: false,
    isConfirmOnBlurDisabled: false,
    shouldConfirmOnEnter: false,
    shouldWrapEditViewWithFieldBase: true,
  }

  state = {
    wasFocusReceivedSinceLastBlur: false,
    resetFieldBase: false,
  }

  componentWillReceiveProps(nextProps) {
    this.shouldResetFieldBase = this.props.isEditing && !nextProps.isEditing;
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

  isReadOnly = () =>
    !this.props.editView

  shouldShowEditView = () =>
    this.props.isEditing && !this.isReadOnly()

  shouldRenderEditIcon = () => !this.isReadOnly() && !this.props.isInvalid;

  shouldRenderSpinner = () => this.props.isWaiting && this.props.isEditing;

  confirmIfUnfocused = () => {
    if (!this.state.wasFocusReceivedSinceLastBlur) {
      this.props.onConfirm();
    }
  }

  wrapWithFieldBase = children => (
    <FieldBase
      isInvalid={this.props.isInvalid}
      isFocused={this.isReadOnly() ? false : undefined}
      isReadOnly={this.isReadOnly()}
      isFitContainerWidthEnabled={this.props.isEditing}
      appearance={this.props.isEditing ? 'standard' : 'subtle'}
      isDisabled={this.shouldRenderSpinner()}
      isLoading={this.shouldRenderSpinner()}
      shouldReset={this.shouldResetFieldBase}
    >
      {children}
    </FieldBase>
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

    return this.props.shouldWrapEditViewWithFieldBase ?
      this.wrapWithFieldBase(editView) : (
        <div className={styles.noFieldBaseEditWrapper}>{editView}</div>
      );
  }

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
