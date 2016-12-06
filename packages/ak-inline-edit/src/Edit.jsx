import React, { PureComponent, PropTypes } from 'react';
import Button from 'ak-button';
import ConfirmIcon from 'ak-icon/glyph/confirm';
import CancelIcon from 'ak-icon/glyph/cancel';
import FieldBase from 'ak-field-base';

/* eslint-disable react/prefer-stateless-function */
export default class EditView extends PureComponent {
  static propTypes = {
    label: PropTypes.string.isRequired,
    isLabelHidden: PropTypes.bool.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  }

  renderActionButtons = () => (
    <div>
      <Button
        appearance="subtle"
        iconBefore={<ConfirmIcon />}
        onClick={this.props.onConfirm}
      />
      <Button
        appearance="subtle"
        iconBefore={<CancelIcon />}
        onClick={this.props.onCancel}
      />
    </div>
  )

  render = () => (
    <div>
      <FieldBase
        label={this.props.label}
        isLabelHidden={this.props.isLabelHidden}
        rightGutter={this.renderActionButtons()}
      >
        {this.props.children}
      </FieldBase>
    </div>
  )
}
