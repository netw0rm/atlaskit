import styled, { css } from 'styled-components';
import { gridSize, fontSize, link, linkHover } from '@atlaskit/theme';
import { buttonWidthUnitless, maxTextWidth, maxTextWidthUnitless } from './constants';

// Common styles for Text & Link
const COMMON_STYLES = css`
  font-size: ${`${fontSize()}px`};
  font-weight: normal;
  line-height: 1;
  margin-left: ${gridSize() / 2}px;
  margin-right: ${gridSize() / 2}px;
  padding: 2px 0;
  max-width: ${({ isRemovable }) => (isRemovable
    ? `${maxTextWidthUnitless - buttonWidthUnitless}px`
    : maxTextWidth
  )};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
export const Text = styled.span`
  ${COMMON_STYLES}
`;

// Styles exclusive to Link

const getFocusedStyles = ({ isFocused }) => (isFocused ? `color: ${link}` : null);
export const Link = styled.a`
  ${COMMON_STYLES}
  ${getFocusedStyles}
  text-decoration: none;

  &:hover {
    color: ${linkHover};
  }
`;
