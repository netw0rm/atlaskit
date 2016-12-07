import React, { PureComponent, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Button from 'ak-button';
import ConfirmIcon from 'ak-icon/glyph/confirm';
import CancelIcon from 'ak-icon/glyph/cancel';
import FieldBase from 'ak-field-base';
import { locals } from './styles.less';

/* eslint-disable react/prefer-stateless-function */
export default class EditView extends PureComponent {
  static propTypes = {
    label: PropTypes.string.isRequired,
    isLabelHidden: PropTypes.bool.isRequired,
    isConfirmOnBlurDisabled: PropTypes.bool.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    content: PropTypes.node.isRequired,
  }

  onBlur = (event) => {
    if (this.props.isConfirmOnBlurDisabled) {
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

  getDOMNode = ref =>
    // eslint-disable-next-line react/no-find-dom-node
    ReactDOM.findDOMNode(ref)

  didFocusLeaveInlineEdit = domNodeReceivingFocus =>
    domNodeReceivingFocus !== this.getDOMNode(this.confirmButtonRef) &&
    domNodeReceivingFocus !== this.getDOMNode(this.cancelButtonRef) &&
    domNodeReceivingFocus !== this.getDOMNode(this.contentRef)

  renderActionButtons = () => (
    <div className={locals.buttonsWrapper}>
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

  render = () => (
    <div onBlur={this.onBlur}>
      <FieldBase
        label={this.props.label}
        isLabelHidden={this.props.isLabelHidden}
        rightGutter={this.renderActionButtons()}
      >
        <div>
          {React.cloneElement(this.props.content,
            { ref: (contentRef) => { this.contentRef = contentRef; } }
          )}
        </div>
      </FieldBase>
    </div>
  )
}
