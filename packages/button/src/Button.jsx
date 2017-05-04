import React, { Component, PropTypes } from 'react';

import { type as buttonTypes } from './internal/enumerated-properties';

/* eslint-disable react/no-unused-prop-types */
export default class Button extends Component {
  static propTypes = {
    /** The default styling to use for the button. One of primary, default,
    subtle, link, subtle-link. */
    type: PropTypes.oneOf(buttonTypes.values),
    /** When true, the button cannot be clicked or acted upon. */
    isDisabled: PropTypes.bool,
    /** className for the button component, to allow styles to be passed down
    to it. */
    className: PropTypes.string,
    /** Associate the button with a form on the page */
    form: PropTypes.string,
    /** action to be called on click */
    onClick: PropTypes.func,
    tabIndex: PropTypes.number,
    ariaHaspopup: PropTypes.bool,
    ariaExpanded: PropTypes.bool,
    ariaControls: PropTypes.string,
    id: PropTypes.string,
  }

  static defaultProps = {
    isDisabled: false,
    type: buttonTypes.default,
    onClick: () => {},
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
        tabIndex={props.tabIndex}
        aria-haspopup={props.ariaHaspopup}
        aria-expanded={props.ariaExpanded}
        aria-controls={props.ariaControls}
        id={props.id}
      >
        {props.children}
      </button>
    );
  }
}
