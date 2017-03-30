import React, { PropTypes, PureComponent } from 'react';
import BadgeElement from './styled/BadgeElement';

export const APPEARANCE_ENUM = {
  values: ['default', 'primary', 'important', 'added', 'removed'],
  defaultValue: 'default',
};

export const THEME_ENUM = {
  values: ['default', 'dark'],
  defaultValue: 'default',
};

export default class Badge extends PureComponent {
  static propTypes = {
    /** The value displayed within the badge. */
    appearance: PropTypes.oneOf(APPEARANCE_ENUM.values),
    /** The max value to display. If value is 100, and max is 50, "50+" will be displayed */
    max: PropTypes.number,
    /**
      Affects the visual style of the badge.
      Allowed values are: default, primary, important, added, removed.
    */
    onValueUpdated: PropTypes.func,
    /** Handler function to be called when the updated prop is changed. */
    theme: PropTypes.oneOf(THEME_ENUM.values),
    /**
      Modifier used to change the badge colors for use with different color themes.
      Allowed values are: default, dark
    */
    value: PropTypes.number,
  }

  static defaultProps = {
    appearance: APPEARANCE_ENUM.defaultValue,
    max: 99,
    theme: THEME_ENUM.defaultValue,
    value: 0,
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
    const { theme } = this.props;

    return (
      <BadgeElement appearance={this.validAppearance()} theme={theme}>
        {this.displayValue().toString()}
      </BadgeElement>
    );
  }
}
