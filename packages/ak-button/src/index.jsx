import React, { Component, PropTypes } from 'react';
import styles from 'style!./less/styles.less';
import classNames from 'classnames';

import { appearance, type, spacing, theme } from './internal/enumerated-properties';
import getClasses from './internal/get-button-classes';
import Span from './Span';
import Button from './Button';
import Link from './Link';

/* eslint-disable react/no-unused-prop-types */
/**
 * @description Create instances of the Button component in a React context.
 * @class Button
 */
export default class AkButton extends Component {
  static propTypes = {
    /**
     * @description Predefined appearances of an ak-button. One of:
     * 'primary', 'default', 'subtle', 'compact'
     * @memberof Button
     * @default 'standard'
     * @type {string}
     */
    appearance: PropTypes.oneOf(appearance.values),
    /**
     * @description Type of the ak-button. One of:
     * 'button', 'submit'.
     * @memberof Button
     * @default button
     * @type {string}
     */
    type: PropTypes.oneOf(type.values),
    /**
     * @description href of the ak-button.
     * If href is set, button will redirect to href url when clicked.
     * @memberof Button
     * @default button
     * @type {string}
     */
    href: PropTypes.string,
    /**
     * @description Standard target attribute for hyperlinks
     * @memberof Button
     * @type {string}
     */
    target: PropTypes.string,
    /**
     * @description Standard HTML5 form attribute for buttons
     * @memberof Button
     * @type {string}
     */
    form: PropTypes.string,
    /**
     * @description Option to disable button and every click event
     * @memberof Button
     * @default false
     * @type {boolean}
     */
    isDisabled: PropTypes.bool,
    /**
     * @description Option to change button's padding. One of:
     * 'none', 'compact', 'default'
     * @memberof Button
     * @default 'default'
     * @type {string}
     */
    spacing: PropTypes.oneOf(spacing.values),
    /**
     * @description Option to make a button selected
     * @memberof Button
     * @default false
     * @type {boolean}
     */
    isSelected: PropTypes.bool,
    /**
     * @description Option to make have a dark look and feel of a button.
     * @memberof Button
     * @default false
     * @type {boolean}
     */
    theme: PropTypes.oneOf(theme.values),
    /**
     * @description iconBefore
     * @memberof Button
     * @type {element}
     */
    iconBefore: PropTypes.element,
    /**
     * @description iconAfter
     * @memberof Button
     * @type {element}
     */
    iconAfter: PropTypes.element,
    /**
     * @description Any additional classes to apply to the wrapper element.
     * @memberof Button
     * @type {string}
     */
    className: PropTypes.string,
    /**
     * @description Generic onClick button handler
     * @memberof Button
     * @type {Function}
     */
    onClick: PropTypes.func,
  }

  static defaultProps = {
    appearance: appearance.default,
    type: type.default,
    isDisabled: false,
    spacing: spacing.default,
    isSelected: false,
    theme: theme.default,
  }

  render() {
    const { props } = this;
    const Icon = p => (<span className={styles.IconWrapper}>{p.source}</span>);
    const Content = p => (<span className={styles.buttonContent}>{p.children}</span>);
    const Element = (p) => {
      if (p.href) {
        if (p.isDisabled) {
          return (<Span {...p}>{p.children}</Span>);
        }
        return (<Link {...p}>{p.children}</Link>);
      }
      return (<Button {...p}>{p.children}</Button>);
    };

    return (
      <Element
        {...props}
        className={classNames(getClasses(styles, props))}
      >
        <span className={styles.buttonWrapper}>
          {props.iconBefore ? <Icon source={props.iconBefore} /> : null}
          {props.children ? <Content>{props.children}</Content> : null}
          {props.iconAfter ? <Icon source={props.iconAfter} /> : null}
        </span>
      </Element>
    );
  }
}
