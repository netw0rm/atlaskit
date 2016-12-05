import React, { PureComponent, PropTypes } from 'react';
import FieldBase from 'ak-field-base';

/* eslint-disable react/prefer-stateless-function */
export default class EditView extends PureComponent {
  static propTypes = {
    label: PropTypes.string.isRequired,
    isFocusedInitially: PropTypes.bool.isRequired,
    isLabelHidden: PropTypes.bool,
    children: PropTypes.node.isRequired,
  }

  static defaultProps = {
    isLabelHidden: false,
  }

  render = () =>
    <div>
      <FieldBase
        label={this.props.label}
        focused={this.props.isFocusedInitially}
        hideLabel={this.props.isLabelHidden}
      >
        {this.props.children}
      </FieldBase>
    </div>
}
