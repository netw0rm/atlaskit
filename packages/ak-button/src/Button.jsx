import React, { PureComponent, PropTypes } from 'react';

import { type as buttonTypes } from './internal/enumerated-properties';

export default class Button extends PureComponent {
  static propTypes = {
    type: PropTypes.oneOf(buttonTypes.values),
    isDisabled: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node,
  }

  static defaultProps = {
    isDisabled: false,
    type: buttonTypes.default,
  }

  onMouseDown = (e) => {
    e.preventDefault();
  }

  render = () => (
    <button
      type={this.props.type}
      disabled={this.props.isDisabled}
      className={this.props.className}
      onMouseDown={this.onMouseDown}
    >
      {this.props.children}
    </button>
  )
}
