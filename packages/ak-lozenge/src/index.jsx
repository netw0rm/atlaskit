import classNames from 'classnames';
import React, { Component } from 'react';
import styles from '../src/style.less';

const APPEARANCE_ENUM = {
  values: ['default', 'success', 'removed', 'inprogress', 'new', 'moved'],
  missingDefault: 'default',
  invalidDefault: 'default',
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
       * @memberof AkLozenge
       * @instance
       * @type {boolean}
       * @default false
       */
      bold: React.PropTypes.bool,
      /**
       * @description Affects the visual style of the badge.
       * Allowed values are: 'default', 'success', 'removed', 'inprogress', 'new', 'moved'.
       * @memberof AkLozenge
       * @instance
       * @type {string}
       * @default default
       */
      appearance: React.PropTypes.oneOf(APPEARANCE_ENUM.values),
      /**
       * @description The content passed to the lozenge
       * @memberof AkLozenge
       * @instance
       * @type {element}
       */
      children: React.PropTypes.element,
    };
  }

  static get defaultProps() {
    return {
      bold: false,
      appearance: APPEARANCE_ENUM.missingDefault,
    };
  }

  // returns the assigned appearance if valid, falling back to the default otherwise
  validAppearance() {
    const { appearance } = this.props;
    const { values, invalidDefault } = APPEARANCE_ENUM;
    return values.indexOf(appearance) !== -1 ? appearance : invalidDefault;
  }

  render() {
    const { bold, children } = this.props;
    const classes = classNames([styles.locals.lozenge, styles.locals[this.validAppearance()]]);
    const dataBold = bold ? { 'data-bold': '' } : {};
    return (
      <span className={classes} {...dataBold}>
        <style>{styles.toString()}</style>
        <span className={styles.locals.content}>{children}</span>
      </span>
    );
  }
}

export default Lozenge;
