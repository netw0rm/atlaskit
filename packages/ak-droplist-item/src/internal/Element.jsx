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
  }

  render = () => {
    const { props } = this;
    const { href, target, type, isDisabled, handleKeyDown, handleClick, className } = props;

    if (href && !isDisabled) {
      return (
        <a
          className={className}
          href={href}
          target={target}
          role={ariaRoles.link}
          onKeyDown={handleKeyDown}
          onClick={handleClick}
        >
          {props.children}
        </a>
      );
    }
    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <div
        className={className}
        tabIndex="0"
        role={ariaRoles[type]}
        onKeyDown={handleKeyDown}
        onClick={handleClick}
      >{props.children}</div>
    );
    /* eslint-enable jsx-a11y/no-static-element-interactions */
  }
}
