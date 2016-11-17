import React, { Component, PropTypes } from 'react';
import { appearance, type, spacing, theme } from './internal/enumerated-properties';
import Button from './Button';
import Icon from './Icon';
import styles from './less/styles.less';

/* eslint-disable react/no-unused-prop-types */
export default class AkButton extends Component {
  static get propTypes() {
    return {
      /**
       * @description Predefined appearances of an ak-button. One of:
       * 'primary', 'default', 'subtle', 'compact'
       * @memberof Button
       * @default 'standard'
       * @type {string}
       */
      appearance: PropTypes.oneOf(appearance),
      /**
       * @description Type of the ak-button. One of:
       * 'button', 'submit'.
       * @memberof Button
       * @default button
       * @type {string}
       */
      type: PropTypes.oneOf(type),
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
       * @description Option to disable button and every click event
       * @memberof Button
       * @default false
       * @type {boolean}
       */
      disabled: PropTypes.bool,
      /**
       * @description Option to change button's padding. One of:
       * 'none', 'compact', 'default'
       * @memberof Button
       * @default 'default'
       * @type {string}
       */
      spacing: PropTypes.oneOf(spacing),
      /**
       * @description Option to make a button selected
       * @memberof Button
       * @default false
       * @type {boolean}
       */
      selected: PropTypes.bool,
      /**
       * @description Option to make have a dark look and feel of a button.
       * @memberof Button
       * @default false
       * @type {boolean}
       */
      theme: PropTypes.oneOf(theme),
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
    };
  }

  static get defaultProps() {
    return {
      appearance: 'default',
      type: 'button',
      disabled: false,
      spacing: 'default',
      selected: false,
      theme: 'default',
    };
  }

  render() {
    const { props } = this;

    return (
      <Button {...props}>
        <style>{styles.toString()}</style>
        <Icon source={props.iconBefore} />
        <span className={styles.locals.buttonContent}>{props.children}</span>
        <Icon source={props.iconAfter} />
      </Button>
    );
  }
}
