import React, { PureComponent, PropTypes } from 'react';

/* eslint-disable react/no-unused-prop-types, react/prefer-stateless-function */
export default class Span extends PureComponent {
  static propTypes = {
    isDisabled: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node,
  }

  static defaultProps = {
    isDisabled: false,
  }

  onMouseDown = (e) => {
    e.preventDefault();
  }

  render() {
    const { props } = this;

    return (
      <span
        disabled={props.isDisabled}
        className={props.className}
        onMouseDown={this.onMouseDown}
      >
        {props.children}
      </span>
    );
  }
}
