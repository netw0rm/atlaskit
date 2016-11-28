import React, { PureComponent, PropTypes } from 'react';
import classNames from 'classnames';
import keyCode from 'keycode';
import Radio from 'ak-icon/glyph/radio';
import Checkbox from 'ak-icon/glyph/checkbox';

import styles from 'style!./styles.less';
import { ariaRoles, baseTypes } from './internal/constants';

/* eslint-disable react/no-unused-prop-types */
export default class AkItem extends PureComponent {
  static propTypes = {
    isDisabled: PropTypes.bool,
    isHidden: PropTypes.bool,
    isActive: PropTypes.bool,
    isChecked: PropTypes.bool,
    href: PropTypes.string,
    target: PropTypes.string,
    type: PropTypes.oneOf(baseTypes.values),
    onActivate: PropTypes.func,
    onFocusPrev: PropTypes.func,
    onFocusNext: PropTypes.func,
    onEscapeFrom: PropTypes.func,
    elemBefore: PropTypes.node,
    children: PropTypes.node,
    className: PropTypes.string,
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
    className: '',
  }

  getElement = (props) => {
    const { href, target, type, isDisabled } = props;
    const { getClasses, handleKeyDown, handleClick } = this;

    if (href && !isDisabled) {
      return p => (
        <a
          className={getClasses(props)}
          href={href}
          target={target}
          role={ariaRoles.menu}
          onKeyDown={handleKeyDown}
          onClick={handleClick}
        >
          {p.children}
        </a>
      );
    }
    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return p => (
      <span
        className={getClasses(props)}
        tabIndex="0"
        role={ariaRoles[type]}
        onKeyDown={handleKeyDown}
        onClick={handleClick}
      >{p.children}</span>
    );
    /* eslint-enable jsx-a11y/no-static-element-interactions */
  }

  getClasses = props => classNames(
    [styles.item, {
      [styles.disabled]: props.isDisabled,
      [styles.active]: props.type === 'menu' && props.isActive,
      [styles.checked]: (['checkbox', 'radio'].indexOf(props.type) > -1) && props.isChecked,
      [styles.hidden]: props.isHidden,
    }, props.className]
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
    const { getElement, props } = this;
    const Element = getElement(props);

    return (
      <Element>
        {
          props.type === 'checkbox'
          ? <span className={styles.checkradio}><Checkbox label="test" /></span>
          : null
        }
        {
          props.type === 'radio'
          ? <span className={styles.checkradio}><Radio label="test" /></span>
          : null
        }
        {
          props.elemBefore && props.type === 'menu'
          ? <span className={styles.elemBefore}>{ props.elemBefore }</span>
          : null
        }
        <span className={styles.content}>{ props.children }</span>
      </Element>
    );
  }
}
