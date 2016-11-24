import classNames from 'classnames';
import React, { Component, PropTypes } from 'react';
import styles from 'style!../src/style.less';

const APPEARANCE_ENUM = {
  values: ['default', 'success', 'removed', 'inprogress', 'new', 'moved'],
  defaultValue: 'default',
};

/**
 * @description Create instances of the component programmatically, or using markup.
 * @class Lozenge
 * @example @js import Lozenge from 'ak-lozenge';
 * const component = new Lozenge();
 */
class Lozenge extends Component {
  static get propTypes() {
    return {
      /**
       * @description Toggles the bolder appearance.
       * @memberof Lozenge
       * @instance
       * @type {boolean}
       * @default false
       */
      isBold: PropTypes.bool,
      /**
       * @description Affects the visual style of the badge.
       * Allowed values are: 'default', 'success', 'removed', 'inprogress', 'new', 'moved'.
       * @memberof Lozenge
       * @instance
       * @type {string}
       * @default default
       */
      appearance: PropTypes.oneOf(APPEARANCE_ENUM.values),
      /**
       * @description The content passed to the lozenge
       * @memberof Lozenge
       * @instance
       * @type {element}
       */
      children: PropTypes.element,
    };
  }

  static get defaultProps() {
    return {
      isBold: false,
      appearance: APPEARANCE_ENUM.defaultValue,
    };
  }

  // returns the assigned appearance if valid, falling back to the default otherwise
  validAppearance() {
    const { appearance } = this.props;
    const { values, defaultValue } = APPEARANCE_ENUM;
    return values.indexOf(appearance) !== -1 ? appearance : defaultValue;
  }

  render() {
    const { isBold, children } = this.props;
    const classes = classNames([
      { [styles.bold]: isBold },
      styles.lozenge,
      styles[this.validAppearance()],
    ]);
    return (
      <span className={classes}>
        <span className={styles.content}>{children}</span>
      </span>
    );
  }
}

export default Lozenge;
