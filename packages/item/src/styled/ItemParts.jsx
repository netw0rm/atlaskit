// @flow

import styled, { css } from 'styled-components';
import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';
import { getThemeStyle, themeNamespace, smallFontSize, compactSmallFontSize } from '../util/theme';

const getBeforeSpacing = ({ spacing, theme }) => {
  const space = getThemeStyle(theme[themeNamespace], spacing, 'beforeItemSpacing');

  return spacing ? css`
    margin-right: ${space}px;
  ` : '';
};

// Checkbox/Radio wrapper -- sits left of the children
export const InputWrapper = styled.span`
  display: flex;
  margin: 0 2px;
`;

// Elements injected before/after the children
const BeforeAfterBase = styled.span`
  align-items: center;
  display: flex;
  flex-shrink: 0;
`;

export const Before = styled(BeforeAfterBase)`
  ${getBeforeSpacing};
`;

export const After = styled(BeforeAfterBase)`
  margin-left: ${akGridSizeUnitless}px;
`;

// Alignment and layout for the children
export const ContentWrapper = styled.span`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin: 0;
  overflow: hidden;

  &:first-child { margin: 0; }
`;

export const Content = styled.span`
  display: block;
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: ${({ allowMultiline }) => (allowMultiline ? 'normal' : 'nowrap')};
`;

const getColorStyle = ({ isDisabled, theme }) => {
  if (isDisabled) {
    return css`
      color: ${getThemeStyle(theme[themeNamespace], 'secondaryText', 'disabled')};
    `;
  }

  return css`
    color: ${getThemeStyle(theme[themeNamespace], 'secondaryText', 'default')};

    // This detects hover on the grandparent. Saves us having to maintain isHovered
    // state in the grandparent.
    *:hover > * > & {
      color: ${() => getThemeStyle(theme[themeNamespace], 'secondaryText', 'hover')};
    }

    *:active > * > & {
      color: ${() => getThemeStyle(theme[themeNamespace], 'secondaryText', 'active')};
    }
  `;
};

const getDescriptionFontStyles = ({ isCompact }) => {
  const fontSize = isCompact ? compactSmallFontSize : smallFontSize;
  return css`
    font-size: ${fontSize}px;
    line-height: ${16 / fontSize};
  `;
};

// Description is a block element below the children, like a subtitle
export const Description = styled.span`
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  ${getColorStyle}
  ${getDescriptionFontStyles}
`;
