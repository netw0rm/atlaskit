import React, { PureComponent, PropTypes } from 'react';
import FieldBase from 'ak-field-base';

/* eslint-disable react/prefer-stateless-function */
export default class EditView extends PureComponent {
  static propTypes = {
    label: PropTypes.string.isRequired,
    isFocused: PropTypes.bool.isRequired,
    shouldHideLabel: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
  }

  render = () =>
    <div>
      <FieldBase
        label={this.props.label}
        focused={this.props.isFocused}
        hideLabel={this.props.shouldHideLabel}
      >
        {this.props.children}
      </FieldBase>
    </div>
}
