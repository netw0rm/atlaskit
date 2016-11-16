/* eslint-disable */
import React, { Component, PropTypes } from 'react';
import { appearance, type, spacing, theme } from './internal/enumerated-properties';
import Button from './Button';
import Icon from './Icon';
import styles from './less/styles.less';

const TYPE = type.values;
const SPACING = spacing.values;

export { TYPE, SPACING };

export default class AkButton extends Component {
  static get propTypes() {
    return {
      /**
       * @description Predefined appearances of an ak-button. One of:
       * 'primary', 'standard', 'subtle', 'compact'
       * @memberof Button
       * @default 'standard'
       * @type {string}
       * @example @html <ak-button appearance="primary"></ak-button>
       * @example @js button.appearance = 'primary';
       */
      appearance: PropTypes.oneOf(appearance),
      /**
       * @description Type of the ak-button. One of:
       * 'button', 'submit'.
       * @memberof Button
       * @default button
       * @type {string}
       * @example @html <ak-button type="submit"></ak-button>
       * @example @js button.type = 'submit';
       */
      type: PropTypes.oneOf(type),
      /**
       * @description href of the ak-button.
       * If href is set, button will redirect to href url when clicked.
       * @memberof Button
       * @default button
       * @type {string}
       * @example @html <ak-button href="www.atlassian.com"></ak-button>
       * @example @js button.href = 'www.atlassian.com';
       */
      href: PropTypes.string,
      /**
       * @description Standard target attribute for hyperlinks
       * @memberof Button
       * @type {string}
       * @example @html <ak-button target="_blank"></ak-button>
       * @example @js button.target = '_blank';
       */
      target: PropTypes.string,
      /**
       * @description Option to disable button and every click event
       * @memberof Button
       * @default false
       * @type {boolean}
       * @example @html <ak-button disabled></ak-button>
       * @example @js button.disabled = true;
       */
      disabled: PropTypes.bool,
      /**
       * @description Option to change button's padding. One of:
       * 'none', 'compact'
       * @memberof Button
       * @default 'normal'
       * @type {string}
       * @example @html <ak-button spacing="compact"></ak-button>
       * @example @js button.spacing = 'none';
       */
      spacing: PropTypes.oneOf(spacing),
      /**
       * @description Option to make a button selected
       * @memberof Button
       * @default false
       * @type {boolean}
       * @example @html <ak-button selected></ak-button>
       * @example @js button.selected = true;
       */
      selected: PropTypes.bool,
      /**
       * @description Option to make have a dark look and feel of a button.
       * @memberof Button
       * @default false
       * @type {boolean}
       * @example @html <ak-button dark></ak-button>
       * @example @js button.dark = true;
       */
      theme: PropTypes.oneOf(theme),
      /**
       * @description iconBefore
       * @memberof Button
       * @type {boolean}
       * @example @html <ak-button dark></ak-button>
       * @example @js button.dark = true;
       */
      iconBefore: PropTypes.element,
      /**
       * @description iconAfter
       * @memberof Button
       * @type {boolean}
       * @example @html <ak-button dark></ak-button>
       * @example @js button.dark = true;
       */
      iconAfter: PropTypes.element,
    }
  }

  static get defaultProps() {
    return {
      appearance: 'default',
      type: 'button',
      disabled: false,
      spacing: 'default',
      selected: false,
      theme: 'default',
    }
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
    )
  }
}
