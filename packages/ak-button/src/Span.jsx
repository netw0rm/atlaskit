import React, { PureComponent, PropTypes } from 'react';

/* eslint-disable react/no-unused-prop-types */
export default class Span extends PureComponent {
  static propTypes = {
    isDisabled: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node,
    tabIndex: PropTypes.number,
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
        tabIndex={props.tabIndex}
      >
        {props.children}
      </span>
    );
  }
}
