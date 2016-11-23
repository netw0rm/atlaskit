import React, { PureComponent, PropTypes } from 'react';

/* eslint-disable react/no-unused-prop-types, react/prefer-stateless-function */
export default class Span extends PureComponent {
  static propTypes ={
    isDisabled: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node,
  }

  static defaultProps = {
    isDisabled: false,
  }

  render = () => (
    <span
      disabled={this.props.isDisabled}
      className={this.props.className}
      onMouseDown={this.onMouseDown}
    >
      {this.props.children}
    </span>
  );
}
