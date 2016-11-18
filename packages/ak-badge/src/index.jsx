import classNames from 'classnames';
import React, { Component } from 'react';
import styles from 'style!./style.less';

const APPEARANCE_ENUM = {
  values: ['default', 'primary', 'important', 'added', 'removed'],
  missingDefault: 'default',
  invalidDefault: 'default',
};

/**
 * @description Return React class reference for the Badge component.
 * @class AkBadge
 * @example @js import AkBadge from 'ak-badge';
 * ReactDOM.render(<ReactComponent />, container);
 */
class Badge extends Component {
  static get propTypes() {
    return {
      /**
       * @description The value displayed within the badge.
       * @memberof AkBadge
       * @instance
       * @type {number}
       * @default 0
       */
      value: React.PropTypes.number,
      /**
       * @description The max value to display.
       * If value is 100, and max is 50, "50+" will be displayed
       * @memberof AkBadge
       * @instance
       * @type {number}
       * @default 99
       */
      max: React.PropTypes.number,
      /**
       * @description Affects the visual style of the badge.
       * Allowed values are: 'default', 'primary', 'important', 'added', 'removed'.
       * @memberof AkBadge
       * @instance
       * @type {string}
       * @default default
       */
      appearance: React.PropTypes.oneOf(APPEARANCE_ENUM.values),
      /**
       * @description Handler function to be called when the 'updated' prop is changed.
       * @memberof AkBadge
       * @instance
       * @type {function}
       */
      onValueUpdated: React.PropTypes.func,
    };
  }

  static get defaultProps() {
    return {
      value: 0,
      max: 99,
      appearance: APPEARANCE_ENUM.missingDefault,
    };
  }

  // triggered on prop/state change, but not on first render
  componentWillUpdate(nextProps) {
    if (this.props.onValueUpdated && nextProps.value !== this.props.value) {
      this.props.onValueUpdated({
        oldValue: this.props.value,
        newValue: nextProps.value,
      });
    }
  }

  displayValue() {
    const { value, max } = this.props;
    if (value < 0) {
      return 0;
    }
    if (max > 0 && value > max) {
      return `${max}+`;
    }
    if (value === Infinity) {
      return '\u221E';
    }
    return value;
  }

  // returns the assigned appearance if valid, falling back to the default otherwise
  validAppearance() {
    const { appearance } = this.props;
    const { values, invalidDefault } = APPEARANCE_ENUM;
    return values.indexOf(appearance) !== -1 ? appearance : invalidDefault;
  }

  render() {
    return (
      <span className={styles.root}>
        <span
          className={classNames(
            [styles.value, styles[this.validAppearance()]]
          )}
        >{this.displayValue()}</span>
      </span>
    );
  }

}

export default Badge;
