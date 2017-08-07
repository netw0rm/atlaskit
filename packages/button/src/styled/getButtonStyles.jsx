import { css } from 'styled-components';
import { borderRadius, fontSize, gridSize, math } from '@atlaskit/theme';
import themeDefinitions from './themeDefinitions';

const getState = ({
  disabled,
  isActive,
  isFocus,
  isHover,
  isSelected,
}) => {
  if (disabled) return 'disabled';
  if (isSelected) return 'selected';
  if (isActive) return 'active';
  if (isHover) return 'hover';
  if (isFocus) return 'focus';
  return 'default';
};

export const getPropertyAppearance = (property, props = {}, definitions = themeDefinitions) => {
  const { appearance } = props;
  const { fallbacks, theme } = definitions;

  const appearanceStyles = theme[appearance] || theme.default;
  const propertyStyles = appearanceStyles[property];

  if (!propertyStyles) {
    return fallbacks[property] || 'initial';
  }

  const state = getState(props);

  return propertyStyles[state] || propertyStyles.default || fallbacks[property];
};

export default function getButtonStyles(props) {
  const baseSize = fontSize(props);
  const buttonHeight = `${math.divide(math.multiply(gridSize, 4), baseSize)(props)}em`;
  const compactButtonHeight = `${math.divide(math.multiply(gridSize, 3), baseSize)(props)}em`;

  /**
   * Variable styles
   */
  let cursor = 'default';
  let boxShadow = 'none';
  let height = buttonHeight;
  let lineHeight = buttonHeight;
  let outline = 'none';
  let padding = `0 ${gridSize(props)}px`;
  let pointerEvents = 'auto';
  let transitionDuration = '0.1s, 0.15s';
  let transition = 'background 0.1s ease-out, box-shadow 0.15s cubic-bezier(0.47, 0.03, 0.49, 1.38)';
  let verticalAlign = 'middle';
  let width = 'auto';

  /**
   * Appearance + Theme styles
   */
  const background = getPropertyAppearance('background', props);
  const color = getPropertyAppearance('color', props);
  const boxShadowColor = getPropertyAppearance('boxShadowColor', props);
  const textDecoration = getPropertyAppearance('textDecoration', props);

  // Spacing: Compact
  if (props.spacing === 'compact') {
    height = compactButtonHeight;
    lineHeight = compactButtonHeight;
  }

  // Spacing: None
  if (props.spacing === 'none') {
    height = 'auto';
    lineHeight = 'inherit';
    padding = '0';
    verticalAlign = 'baseline';
  }

  // Interaction: Hover
  if (props.isHover) {
    cursor = 'pointer';
    transition = 'background 0s ease-out, box-shadow 0.15s cubic-bezier(0.47, 0.03, 0.49, 1.38)';
  }

  // Interaction: Active
  if (props.isActive) {
    transitionDuration = '0s';
  }

  // Interaction: Focus
  if (props.isFocus) {
    boxShadow = `0 0 0 2px ${boxShadowColor}`;
    outline = 'none';
    transitionDuration = '0s, 0.2s';
  }

  // Disabled
  if (props.disabled) {
    pointerEvents = 'none';
    cursor = 'not-allowed';
  }

  // Fit to parent width
  if (props.fit) {
    width = '100%';
  }

  /* Note use of !important to override the ThemeReset on anchor tag styles */

  return css`
    align-items: baseline;
    background: ${background};
    box-sizing: border-box;
    box-shadow: ${boxShadow};
    border-radius: ${borderRadius}px;
    border-width: 0;
    width: ${width};
    color: ${color} !important;
    cursor: ${cursor};
    display: inline-flex;
    font-style: normal;
    font-size: inherit;
    height: ${height};
    line-height: ${lineHeight};
    margin: 0;
    outline: ${outline} !important;
    padding: ${padding};
    pointer-events: ${pointerEvents};
    text-align: center;
    text-decoration: ${textDecoration};
    transition-duration: ${transitionDuration};
    transition: ${transition};
    user-select: none;
    vertical-align: ${verticalAlign};
    white-space: nowrap;

    &::-moz-focus-inner {
      border: 0;
      margin: 0;
      padding: 0;
    }
  `;
}
