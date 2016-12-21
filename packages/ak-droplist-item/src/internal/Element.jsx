import React, { PureComponent, PropTypes } from 'react';
import { ariaRoles, baseTypes } from './constants';

/* eslint-disable react/no-unused-prop-types, react/prefer-stateless-function */
export default class Element extends PureComponent {
  static propTypes = {
    href: PropTypes.string,
    target: PropTypes.string,
    type: PropTypes.oneOf(baseTypes.values),
    handleClick: PropTypes.func,
    handleKeyDown: PropTypes.func,
    children: PropTypes.node,
    className: PropTypes.string,
    isDisabled: PropTypes.bool,
    isFocused: PropTypes.bool,
    isHidden: PropTypes.bool,
    isChecked: PropTypes.bool,
  }

  componentDidMount = () => {
    this.setFocus();
  }

  componentDidUpdate = () => {
    this.setFocus();
  }

  setFocus = () => {
    if (this.props.isFocused) {
      this.ref.focus();
    }
  }

  // this prevents the focus ring from appearing when the element is clicked.
  // It doesn't interfere with the onClick handler
  handleMouseDown = (e) => {
    e.preventDefault();
  }

  render = () => {
    const { props } = this;
    const { href, target, type, isDisabled, isHidden, isChecked,
      handleKeyDown, handleClick, className } = props;

    if (href && !isDisabled) {
      return (
        <a
          className={className}
          href={href}
          target={target}
          role={ariaRoles.link}
          onKeyDown={handleKeyDown}
          onClick={handleClick}
          onMouseDown={this.handleMouseDown}
          ref={ref => (this.ref = ref)}
        >
          {props.children}
        </a>
      );
    }
    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <span
        className={className}
        tabIndex="0"
        onKeyDown={handleKeyDown}
        onClick={handleClick}
        onMouseDown={this.handleMouseDown}
        ref={ref => (this.ref = ref)}
        role={ariaRoles[type]}
        aria-disabled={isDisabled}
        aria-hidden={isHidden}
        aria-checked={isChecked}
      >{props.children}</span>
    );
    /* eslint-enable jsx-a11y/no-static-element-interactions */
  }
}
