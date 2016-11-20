import React, { Component, PropTypes } from 'react';

/* eslint-disable react/no-unused-prop-types, react/prefer-stateless-function */
export default class Span extends Component {
  static get propTypes() {
    return {
      disabled: PropTypes.bool,
      className: PropTypes.string,
    };
  }

  render() {
    const { props } = this;

    return (
      <span
        disabled={props.disabled}
        className={props.className}
        onMouseDown={e => e.preventDefault()}
      >
        {props.children}
      </span>
    );
  }
}
