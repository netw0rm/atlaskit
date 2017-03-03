import React, { PureComponent, PropTypes } from 'react';
import keyCode from 'keycode';
import classNames from 'classnames';

import { locals as styles } from '../styles.less';

/* eslint-disable react/no-unused-prop-types */
export default class Trigger extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    isDisabled: PropTypes.bool,
    isFocused: PropTypes.bool,
    isOpened: PropTypes.bool,
    isTabbable: PropTypes.bool,
    onActivate: PropTypes.func,
    shouldFitContainer: PropTypes.bool,
    style: PropTypes.object,  // eslint-disable-line react/forbid-prop-types
  }

  static defaultProps = {
    children: null,
    isDisabled: false,
    isFocused: false,
    isOpened: false,
    onActivate: () => {},
  }

  componentDidMount = () => {
    this.setFocus();
  }

  componentDidUpdate = () => {
    this.setFocus();
  }

  setFocus = () => {
    if (this.props.isFocused) {
      this.ref.firstChild.focus();
    }
  }

  handleKeyDown = (event) => {
    const { props } = this;
    if (!this.props.isDisabled) {
      switch (event.keyCode) {
        case keyCode('down'):
        case keyCode('space'):
        case keyCode('enter'):
          event.preventDefault();
          props.onActivate({ source: 'keydown', event });
          break;
        default:
          break;
      }
    }
  }

  handleClick = (event) => {
    if (!this.props.isDisabled) {
      this.props.onActivate({ source: 'click', event });
    }
  }

  render() {
    const { props } = this;

    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <div
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
        className={classNames(styles.triggerContainer, props.className, {
          [styles.triggerFitContainer]: props.shouldFitContainer,
        })}
        style={props.style}
        ref={ref => (this.ref = ref)}
      >
        <div
          tabIndex={props.isDisabled || !props.isTabbable ? null : 0}
          className={styles.trigger}
        >{props.children}</div>
      </div>
    );
    /* eslint-enable jsx-a11y/no-static-element-interactions */
  }
}
