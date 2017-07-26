// @flow

import styled, { css } from 'styled-components';
import { akElevationMixins } from '@atlaskit/util-shared-styles';
import { getThemeStyle, themeNamespace } from '../util/theme';

const getItemState = stateName => ({ theme }) => {
  const stateStyles = getThemeStyle(theme[themeNamespace], stateName);
  return css`
    background-color: ${stateStyles.background};
    color: ${stateStyles.text};
    text-decoration: none;
  `;
};

const getPadding = ({ isCompact, theme }) => {
  const paddingKey = isCompact ? 'compact' : 'default';
  const padding = getThemeStyle(theme[themeNamespace], paddingKey, 'padding');

  return css`
    padding: ${padding.y}px ${padding.x}px;
  `;
};

const getHeightStyles = ({ isCompact, theme }) => {
  const heightKey = isCompact ? 'compact' : 'default';
  const height = getThemeStyle(theme[themeNamespace], heightKey, 'height');
  return height ? css`
    height: ${height}px;
  ` : '';
};

const getInteractiveStyles = ({ isDisabled, isDragging }) => {
  if (isDisabled) {
    return css`
      cursor: not-allowed;
      ${getItemState('disabled')}
    `;
  } else if (isDragging) {
    return css`
      ${akElevationMixins.e200}
      ${getItemState('hover')}
    `;
  }

  return css`
    &:hover {
      ${getItemState('hover')}
    }

    &:active {
      ${getItemState('active')}
    }
  `;
};

// This is the main item style. It is defined as a basic style variable so it can
// later be applied to different component types (span / a / custom link component)

// $FlowFixMe
export const ItemBase = ({ isSelected, theme }) => css`
  align-items: center;
  border-radius: ${getThemeStyle(theme[themeNamespace], 'borderRadius')}px;
  box-sizing: border-box;
  cursor: pointer;
  display: ${({ isHidden }) => (isHidden ? 'none' : 'flex')};
  flex: none;
  ${getItemState(isSelected ? 'selected' : 'default')}
  ${getPadding}
  ${getInteractiveStyles}
  ${getHeightStyles}

  &:focus {
    box-shadow: 0 0 0 2px ${getThemeStyle(theme[themeNamespace], 'outline', 'focus')} inset;
    outline: none;
    /* relative position prevents bgcolor of a hovered element from obfuscating focus ring of
       a focused sibling element */
    position: relative;
  }
`;

// Given some optional link-related props, returns the relevant styled
// component. For links, it styles the linkComponent if provided, otherwise
// falling back to a styled <a> tag. If no href is present, a styled <span>
// is returned. When we upgrade to styled-components@2.x we will be able to
// simplify this by taking advantage of the withComponent() functionality.
const styledRootElement = (
  { href, linkComponent }:
  { href?: string, linkComponent?: any }
) => {
  if (href) {
    return linkComponent
      ? styled(linkComponent)`${ItemBase}`
      : styled.a`${ItemBase}`;
  }
  return styled.span`${ItemBase}`;
};

export default styledRootElement;
