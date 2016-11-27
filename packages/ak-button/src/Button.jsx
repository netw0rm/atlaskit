import React, { Component, PropTypes } from 'react';

import { type } from './internal/enumerated-properties';

/* eslint-disable react/no-unused-prop-types, react/prefer-stateless-function */
export default class Button extends Component {
  static get propTypes() {
    return {
      type: PropTypes.oneOf(type.values),
      disabled: PropTypes.bool,
      className: PropTypes.string,
      form: PropTypes.string,
    };
  }

  render() {
    const { props } = this;

    return (
      <button
        type={props.type}
        disabled={props.disabled}
        className={props.className}
        form={props.form}
        onMouseDown={e => e.preventDefault()}
      >
        {props.children}
      </button>
    );
  }
}
