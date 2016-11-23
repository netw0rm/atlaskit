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

  render = () => (
    <a
      href={this.props.href}
      target={this.props.target}
      disabled={this.props.isDisabled}
      className={this.props.className}
      onMouseDown={this.onMouseDown}
    >
      {this.props.children}
    </a>
    );
}
