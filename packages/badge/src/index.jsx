import classNames from 'classnames';
import React, { PropTypes, PureComponent } from 'react';
import styles from 'style!./style.less';

const APPEARANCE_ENUM = {
  values: ['default', 'primary', 'important', 'added', 'removed'],
  defaultValue: 'default',
};

const THEME_ENUM = {
  values: ['default', 'dark'],
  defaultValue: 'default',
};

class Badge extends PureComponent {
  static propTypes = {
    /** The value displayed within the badge */
    value: PropTypes.number,
    /** The max value to display. If value is 100, and max is 50, "50+" will be displayed */
    max: PropTypes.number,
    /** Affects the visual style of the badge */
    appearance: PropTypes.oneOf(APPEARANCE_ENUM.values),
    /** Handler function to be called when the 'value' prop is changed */
    onValueUpdated: PropTypes.func,
    /** Modifier used to change the badge colors for use with different color themes */
    theme: PropTypes.oneOf(THEME_ENUM.values),
  }

  static defaultProps = {
    value: 0,
    max: 99,
    appearance: APPEARANCE_ENUM.defaultValue,
    theme: THEME_ENUM.defaultValue,
  }

  // triggered on prop/state change, but not on first render
  componentWillUpdate(nextProps) {
    const { onValueUpdated, value: oldValue } = this.props;
    const { value: newValue } = nextProps;
    if (onValueUpdated && newValue !== oldValue) {
      onValueUpdated({ oldValue, newValue });
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
      return '\u221E'; // ∞ inifinity character
    }
    return value;
  }

  // returns the assigned appearance if valid, falling back to the default otherwise
  validAppearance() {
    const { appearance } = this.props;
    const { values, defaultValue } = APPEARANCE_ENUM;
    return values.indexOf(appearance) !== -1 ? appearance : defaultValue;
  }

  render() {
    return (
      <span className={styles.root}>
        <span
          className={classNames(
            [styles.value, styles[this.validAppearance()]],
            {
              [styles.isDarkTheme]: this.props.theme === 'dark',
            }
          )}
        >{this.displayValue().toString()}</span>
      </span>
    );
  }

}

export default Badge;
