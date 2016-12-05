import React, { PureComponent, PropTypes } from 'react';
import FieldBase from 'ak-field-base';

/* eslint-disable react/prefer-stateless-function */
export default class EditView extends PureComponent {
  static propTypes = {
    label: PropTypes.string.isRequired,
    isLabelHidden: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
  }

  render = () => (
    <div>
      <FieldBase
        label={this.props.label}
        isLabelHidden={this.props.isLabelHidden}
      >
        {this.props.children}
      </FieldBase>
    </div>
  )
}
