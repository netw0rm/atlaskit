// @flow
import styled from 'styled-components';
import { borderWidth, borderWidthFocus, fullHeight, fullWidth } from './constants';
import theme from './theme';

const getStyles = (
  { isDisabled, isFocus, isHover, isSelected }:
  { isDisabled: boolean, isFocus: boolean, isHover: boolean, isSelected: boolean }
) => {
  const styles = {
    'background-color': theme.default.background.default,
    'border-width': `${borderWidth}px`,
    'border-style': 'solid',
    'border-color': theme.default.border.default,
    'border-radius': '50%',
    'box-sizing': 'border-box',
    cursor: 'pointer',
    display: 'inline-block',
    height: `${fullHeight}px`,
    margin: '2px',
    opacity: 1,
    position: 'relative',
    'vertical-align': 'middle',
    width: `${fullWidth}px`,
  };

  // Hover (not Disabled)
  if (isHover && !isDisabled) {
    styles['background-color'] = theme.default.background.hover;
    styles['border-color'] = theme.default.border.hover;
  }

  // Focus
  if (isFocus) {
    styles['background-color'] = theme.default.background.focus;
    styles['border-color'] = theme.default.border.focus;
    styles['border-width'] = `${borderWidthFocus}px`;
    styles['box-sizing'] = 'content-box';
    styles.margin = '0';
  }

  // Focus + Hover
  if (isFocus && isHover) {
    styles['background-color'] = theme.default.background.hover;
  }

  // Selected
  if (isSelected) {
    styles['background-color'] = theme.selected.background.default;
    styles['border-color'] = theme.selected.border.default;
  }

  // Selected + Hover (not Disabled)
  if (isSelected && isHover && !isDisabled) {
    styles['background-color'] = theme.selected.background.hover;
    styles['border-color'] = theme.selected.border.hover;
  }

  // Selected + Focus (not Disabled)
  if (isSelected && isFocus && !isDisabled) {
    styles['background-color'] = theme.selected.background.focus;
    styles['border-color'] = theme.selected.border.focus;
  }

  // Selected + Focus + Hover
  if (isSelected && isFocus && isHover) {
    styles['background-color'] = theme.selected.background.hover;
  }

  // Disabled
  if (isDisabled) {
    styles.opacity = 0.5;
    styles.cursor = 'default';
  }

  return styles;
};

const stringifyStyles = styles => Object.keys(styles)
  .reduce((styleString, key) => `${styleString}
    ${key}: ${styles[key]};`, '');

const RadioIcon = styled.span`${props => stringifyStyles(getStyles(props))}`;

RadioIcon.displayName = 'RadioIcon';

export default RadioIcon;
