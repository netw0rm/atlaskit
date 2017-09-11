import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { ThemeProvider } from 'styled-components';
import Size from '../styled/Size';

export const logoColoursThemeKey = '__atlaskit_logo_internal_logo_colours';

export default class Logo extends PureComponent {
  static propTypes = {
    /** If set, the logo will be collapsed down to show only the product icon or product type */
    collapseTo: PropTypes.oneOf(['icon', 'type']),
    /** The image component containing the product icon and logo text. Provided
    by the chosen logo. Should not be passed down. */
    children: PropTypes.node.isRequired,
    /** The size of the icon, uses the same sizing scheme as in @atlaskit/icon */
    size: PropTypes.string,
    /** Internal prop used for collapsing down to the product type. Provied by the
    chosen logo. Should not be passed down. */
    typeOffsetRatio: PropTypes.number,
    /** CSS color to be applied to the wordmark portion of the logo SVG */
    textColor: PropTypes.string,
    /** CSS color to be applied to the non-gradient icon portion of the logo SVG */
    iconColor: PropTypes.string,
    /** CSS color to start the gradient/shadow on the icon */
    iconGradientStart: PropTypes.string,
    /** CSS color to end the gradient/shadow on the icon. Should usually match iconColor to avoid
     * rendering issues in some browsers such as Safari. */
    iconGradientStop: PropTypes.string,
  }

  static defaultProps = {
    size: 'medium',
    typeOffsetRatio: 0,
    textColor: 'currentColor',
    iconColor: 'currentColor',
    iconGradientStart: 'currentColor',
    iconGradientStop: 'rgba(0, 0, 0, 0.2)',
  }

  render() {
    const {
      collapseTo,
      size,
      typeOffsetRatio,
      textColor,
      iconColor,
      iconGradientStart,
      iconGradientStop,
      children,
    } = this.props;
    const logoColors = { textColor, iconColor, iconGradientStart, iconGradientStop };
    return (
      <ThemeProvider theme={{ [logoColoursThemeKey]: logoColors }}>
        <Size
          collapseTo={collapseTo}
          size={size}
          typeOffsetRatio={typeOffsetRatio}
        >
          {children}
        </Size>
      </ThemeProvider>
    );
  }
}
