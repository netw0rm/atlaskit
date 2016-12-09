import React, { PureComponent, PropTypes } from 'react';

/* eslint-disable react/no-unused-prop-types, react/prefer-stateless-function */
export default class Link extends PureComponent {
  static propTypes = {
    href: PropTypes.string,
    target: PropTypes.string,
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
      <a
        href={props.href}
        target={props.target}
        disabled={props.isDisabled}
        className={props.className}
        onMouseDown={this.onMouseDown}
      >
        {props.children}
      </a>
    );
  }
}
