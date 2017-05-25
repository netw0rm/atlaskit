import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

/* eslint-disable react/no-unused-prop-types, react/prefer-stateless-function */
export default class Link extends PureComponent {
  static propTypes = {
    href: PropTypes.string,
    target: PropTypes.string,
    isDisabled: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node,
    onClick: PropTypes.func,
    tabIndex: PropTypes.number,
  }

  static defaultProps = {
    isDisabled: false,
    onClick: () => {},
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
        onClick={props.onClick}
        onMouseDown={this.onMouseDown}
        tabIndex={props.tabIndex}
      >
        {props.children}
      </a>
    );
  }
}
