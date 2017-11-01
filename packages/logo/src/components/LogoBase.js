import PropTypes from 'prop-types';
import { Component } from 'react';

export default class LogoBase extends Component {
  static propTypes = {
    /** If set, the logo will be collapsed down to show only the product icon or product type */
    collapseTo: PropTypes.oneOf(['icon', 'type']),
    /** The size of the icon, uses the same sizing scheme as in @atlaskit/icon */
    size: PropTypes.string,
    /** CSS color to be applied to the wordmark portion of the logo SVG */
    textColor: PropTypes.string,
    /** CSS color to be applied to the non-gradient icon portion of the logo SVG */
    iconColor: PropTypes.string,
    /** CSS color to start the gradient/shadow on the icon */
    iconGradientStart: PropTypes.string,
    /** CSS color to end the gradient/shadow on the icon. Should usually match iconColor to avoid
     * rendering issues in some browsers such as Safari. */
    iconGradientStop: PropTypes.string,
    /** Accessible text to be used for screen readers */
    label: PropTypes.string,
  }

  static defaultProps = {
    iconColor: 'inherit',
    textColor: 'inherit',
    iconGradientStart: 'inherit',
    iconGradientStop: 'inherit',
    size: 'medium',
  }

  render() {
    return null;
  }
}
