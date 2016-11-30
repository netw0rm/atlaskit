import React, { PureComponent, PropTypes } from 'react';
import classNames from 'classnames';
import keyCode from 'keycode';
import Radio from 'ak-icon/glyph/radio';
import Checkbox from 'ak-icon/glyph/checkbox';
import styles from 'style!./styles.less';

import Element from './internal/Element';
import { baseTypes } from './internal/constants';

/* eslint-disable react/no-unused-prop-types */
/**
 * @description This is a basic building block of a dropdown's list.
 * @class Item
 */
export default class Item extends PureComponent {
  static propTypes = {
    /**
     * @description Disabled state of an item
     * @memberof Item
     * @default false
     * @type {Boolean}
     */
    isDisabled: PropTypes.bool,
    /**
     * @description Hidden state of an item. This is achieved via 'display:none' style,
     * which means that the item is still rendered, only invisible
     * @memberof Item
     * @default false
     * @type {Boolean}
     */
    isHidden: PropTypes.bool,
    /**
     * @description Highlights the Item when set to 'true'. Only applicable to the 'link' type.
     * Use it when you want to highlight the active route in the navigation menu for example.
     * @memberof Item
     * @default false
     * @type {Boolean}
     */
    isActive: PropTypes.bool,
    /**
     * @description Controls the 'checked' state of the 'checkbox' and 'radio' type of items.
     * @memberof Item
     * @default false
     * @type {Boolean}
     */
    isChecked: PropTypes.bool,
    /**
     * @description Link's 'href' attribute. Only applicable to the 'link' type of items.
     * @memberof Item
     * @type {String}
     */
    href: PropTypes.string,
    /**
     * @description Link's 'target' attribute. Only applicable to the 'link' type of items.
     * @memberof Item
     * @type {String}
     */
    target: PropTypes.string,
    /**
     * @description The item's type. Available values: 'link', 'checkbox', 'radio'
     * @memberof Item
     * @default link
     * @type {String}
     */
    type: PropTypes.oneOf(baseTypes.values),
    /**
     * @description Handler function to be called when the item is activated.
     * It will happen when the item was clicked, or 'space'/'enter' keys were pressed.
     * @memberof Item
     * @type {function}
     */
    onActivate: PropTypes.func,
    /**
     * @description Handler function to be called when the focus should be moved to the previous
     * item. It happens when the 'up' key is pressed.
     * @memberof Item
     * @type {function}
     */
    onFocusPrev: PropTypes.func,
    /**
     * @description Handler function to be called when the focus should be moved to the previou item
     * It happens when the 'down' key is pressed.
     * @memberof Item
     * @type {function}
     */
    onFocusNext: PropTypes.func,
    /**
     * @description Handler function to be called when the focus should be moved outside of the item
     * It happens when the 'tab' key is pressed.
     * @memberof Item
     * @type {function}
     */
    onEscapeFrom: PropTypes.func,
    /**
     * @description HTML content to display before item's main content. Only applicable to the
     * 'link' item.
     * @memberof Item
     * @default false
     * @type {ReactElement}
     */
    elemBefore: PropTypes.node,
    children: PropTypes.node,
  }

  static defaultProps = {
    isDisabled: false,
    isHidden: false,
    isActive: false,
    isChecked: false,
    href: null,
    target: null,
    type: baseTypes.default,
    onActivate: () => {},
    onFocusPrev: () => {},
    onFocusNext: () => {},
    onEscapeFrom: () => {},
    elemBefore: null,
    children: null,
  }

  getClasses = props => classNames(
    [styles.item, {
      [styles.disabled]: props.isDisabled,
      [styles.active]: props.type === 'link' && props.isActive,
      [styles.checked]: (['checkbox', 'radio'].indexOf(props.type) > -1) && props.isChecked,
      [styles.hidden]: props.isHidden,
    }]
  )

  handleKeyDown = (event) => {
    const { props } = this;
    switch (event.keyCode) {
      case keyCode('up'):
        event.preventDefault();
        props.onFocusPrev();
        break;
      case keyCode('down'):
        event.preventDefault();
        props.onFocusNext();
        break;
      case keyCode('tab'):
        event.preventDefault();
        props.onEscapeFrom();
        break;
      case keyCode('space'):
      case keyCode('enter'):
        props.onActivate();
        break;
      default:
        break;
    }
  }

  handleClick = () => {
    // disabled item can't be activated
    if (!this.props.isDisabled) {
      this.props.onActivate();
    }
  }

  render = () => {
    const { props } = this;

    return (
      <Element
        isDisabled={props.isDisabled}
        href={props.href}
        target={props.target}
        type={props.type}
        handleClick={this.handleClick}
        handleKeyDown={this.handleKeyDown}
        className={this.getClasses(props)}
      >
        {
          props.type === 'checkbox'
          ? <div className={styles.checkradio}><Checkbox label="test" /></div>
          : null
        }
        {
          props.type === 'radio'
          ? <div className={styles.checkradio}><Radio label="test" /></div>
          : null
        }
        {
          props.elemBefore && props.type === 'link'
          ? <div className={styles.elemBefore}>{ props.elemBefore }</div>
          : null
        }
        <div className={styles.content}>{ props.children }</div>
      </Element>
    );
  }
}
