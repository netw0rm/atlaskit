import React, { PureComponent, PropTypes } from 'react';
import FieldBase from 'ak-field-base';

/* eslint-disable react/prefer-stateless-function */
export default class EditView extends PureComponent {
  static propTypes = {
    label: PropTypes.string.isRequired,
    isFocused: PropTypes.bool.isRequired,
    shouldHideLabel: PropTypes.bool,
    children: PropTypes.node.isRequired,
    onEditEntered: PropTypes.func,
  }

  static defaultProps = {
    shouldHideLabel: false,
    onEditEntered: () => {},
  }

  componentDidMount = () =>
    this.props.onEditEntered();

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
