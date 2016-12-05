import React, { PureComponent, PropTypes } from 'react';
import keyCode from 'keycode';
import styles from 'style!./styles.less';
import Button from 'ak-button';
import ExpandIcon from 'ak-icon/glyph/expand';
import classNames from 'classnames';

const Icon = <ExpandIcon label="trigger button" />;
const baseTypes = {
  values: ['default', 'button'],
  default: 'default',
};

/* eslint-disable react/no-unused-prop-types */
/**
 * @description This is one of the building blocks of the droplist which should be used to open/hide
 * the dropdown when activated
 * @class Trigger
 */
export default class Trigger extends PureComponent {
  static propTypes = {
    /**
     * @description disabled state of the trigger
     * @memberof Trigger
     * @default false
     * @type {Boolean}
     */
    isDisabled: PropTypes.bool,
    /**
     * @description opened state of the trigger
     * @memberof Trigger
     * @default false
     * @type {Boolean}
     */
    isOpened: PropTypes.bool,
    /**
     * @description The trigger's type. Available values: 'default', 'button'
     * @memberof Trigger
     * @default default
     * @type {String}
     */
    type: PropTypes.oneOf(baseTypes.values),
    /**
     * @description Handler function to be called when the trigger is activated.
     * It will happen when the trigger was clicked, or 'space'/'enter'/'down' keys were pressed.
     * @memberof Trigger
     * @type {function}
     */
    onActivate: PropTypes.func,
    children: PropTypes.node,
    style: PropTypes.object,  // eslint-disable-line react/forbid-prop-types
    className: PropTypes.string,
  }

  static defaultProps = {
    isDisabled: false,
    isOpened: false,
    type: baseTypes.default,
    children: null,
    onActivate: () => {},
  }

  handleKeyDown = (event) => {
    const { props } = this;
    if (!this.props.isDisabled) {
      switch (event.keyCode) {
        case keyCode('down'):
        case keyCode('space'):
        case keyCode('enter'):
          event.preventDefault();
          props.onActivate({ source: 'keypress' });
          break;
        default:
          break;
      }
    }
  }

  handleClick = () => {
    if (!this.props.isDisabled) {
      this.props.onActivate({ source: 'click' });
    }
  }

  handleMouseDown = (e) => {
    e.preventDefault();
  }

  render = () => {
    const { props } = this;

    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <div
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
        onMouseDown={this.handleMouseDown}
        className={classNames(styles.triggerContainer, props.className)}
        style={props.style}
        role="button"
        aria-haspopup="true"
      >
        { props.type === 'button' ?
          (<Button
            selected={props.isOpened}
            disabled={props.isDisabled}
            iconAfter={Icon}
          >{props.children}</Button>) :
          (<div
            tabIndex={props.isDisabled ? null : 0}
            className={styles.trigger}
          >{props.children}</div>)
        }
      </div>
    );
    /* eslint-enable jsx-a11y/no-static-element-interactions */
  }
}
