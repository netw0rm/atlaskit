import React, { Component, PropTypes } from 'react';

import { type as buttonTypes } from './internal/enumerated-properties';

/* eslint-disable react/no-unused-prop-types, react/prefer-stateless-function */
export default class Button extends Component {
  static propTypes = {
    type: PropTypes.oneOf(buttonTypes.values),
    isDisabled: PropTypes.bool,
    className: PropTypes.string,
    form: PropTypes.string,
    onClick: PropTypes.func,
  }

  static defaultProps = {
    isDisabled: false,
    type: buttonTypes.default,
  }

  onMouseDown = (e) => {
    e.preventDefault();
  }

  render() {
    const { props } = this;

    return (
      <button
        type={props.type}
        disabled={props.isDisabled}
        className={props.className}
        form={props.form}
        onClick={props.onClick}
        onMouseDown={this.onMouseDown}
      >
        {props.children}
      </button>
    );
  }
}
