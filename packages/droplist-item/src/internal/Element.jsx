import React, { PureComponent, PropTypes } from 'react';
import { ariaRoles, baseTypes } from './constants';

/* eslint-disable react/no-unused-prop-types, react/prefer-stateless-function */
export default class Element extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    isDisabled: PropTypes.bool,
    isHidden: PropTypes.bool,
    isChecked: PropTypes.bool,
    isSelected: PropTypes.bool,
    handleClick: PropTypes.func,
    handleKeyPress: PropTypes.func,
    href: PropTypes.string,
    target: PropTypes.string,
    type: PropTypes.oneOf(baseTypes.values),
  }

  // this prevents the focus ring from appearing when the element is clicked.
  // It doesn't interfere with the onClick handler
  handleMouseDown = (e) => {
    e.preventDefault();
  }

  render() {
    const { props } = this;
    const { href, target, type, isDisabled, handleKeyPress, handleClick, className } = props;
    const ariaAttributes = {};
    const commonAttributes = {
      className,
      role: ariaRoles[type],
      onKeyPress: handleKeyPress,
      onClick: handleClick,
      onMouseDown: this.handleMouseDown,
      'data-role': 'droplistItem',
    };

    if (props.isDisabled) {
      ariaAttributes['aria-disabled'] = true;
    }
    if (props.isHidden) {
      ariaAttributes['aria-hidden'] = true;
    }
    if (props.isChecked) {
      ariaAttributes['aria-checked'] = true;
    }
    if (props.type === 'option') {
      ariaAttributes['aria-selected'] = props.isSelected;
    }

    if (href && !isDisabled) {
      return (
        <a
          href={href}
          target={target}
          {...commonAttributes}
          {...ariaAttributes}
        >
          {props.children}
        </a>
      );
    }
    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <span
        tabIndex="0"
        {...commonAttributes}
        {...ariaAttributes}
      >{props.children}</span>
    );
    /* eslint-enable jsx-a11y/no-static-element-interactions */
  }
}
