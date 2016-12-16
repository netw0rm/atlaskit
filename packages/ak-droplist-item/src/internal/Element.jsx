import React, { PureComponent, PropTypes } from 'react';
import ReactDOM from 'react-dom';
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
  }

  componentDidMount = () => {
    this.setFocus();
  }

  componentDidUpdate = () => {
    this.setFocus();
  }

  setFocus = () => {
    if (this.props.isFocused) {
      ReactDOM.findDOMNode(this.ref).focus(); // eslint-disable-line react/no-find-dom-node
    }
  }

  // this prevents the focus ring from appearing when the element is clicked.
  // It doesn't interfere with the onClick handler
  handleMouseDown = (e) => {
    e.preventDefault();
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
          onMouseDown={this.handleMouseDown}
          ref={ref => (this.ref = ref)}
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
        onMouseDown={this.handleMouseDown}
        ref={ref => (this.ref = ref)}
      >{props.children}</div>
    );
    /* eslint-enable jsx-a11y/no-static-element-interactions */
  }
}
