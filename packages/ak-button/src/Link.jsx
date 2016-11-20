import React, { Component, PropTypes } from 'react';

/* eslint-disable react/no-unused-prop-types, react/prefer-stateless-function */
export default class Link extends Component {
  static get propTypes() {
    return {
      href: PropTypes.string,
      target: PropTypes.string,
      disabled: PropTypes.bool,
      className: PropTypes.string,
    };
  }

  render() {
    const { props } = this;

    return (
      <a
        href={props.href}
        target={props.target}
        disabled={props.disabled}
        className={props.className}
        onMouseDown={e => e.preventDefault()}
      >
        {props.children}
      </a>
    );
  }
}
