import styled, { css } from 'styled-components';
import { akGridSizeUnitless, akFontFamily, akColorN20, akColorN500 } from '@atlaskit/util-shared-styles';
import { AVATAR_SIZES } from './constants';

const borderWidth = 3;
const overlapWidth = (akGridSizeUnitless / 2) + borderWidth;

export const StackWrapper = styled.div`
  display: inline-flex;
  flex-direction: row-reverse;
`;

export const ItemWrapper = styled.div`
  background-color: ${({ borderColor }) => borderColor};
  border-radius: 100%;
  display: flex;
  padding: ${borderWidth}px;
  position: relative;

  /* overlap the avatars */
  & + & {
    margin-right: -${overlapWidth}px;
  }

`;

export const MoreAvatar = styled.div`
  align-items: center;
  background-color: ${akColorN20};
  border-radius: 100%;
  color: ${akColorN500};
  display: flex;
  font-family: ${akFontFamily};
  font-size: 11px; /* as per spec */
  justify-content: center;
  margin-right: -${overlapWidth}px;

  ${({ avatarSize }) => css`
    height: ${AVATAR_SIZES[avatarSize]}px;
    width: ${AVATAR_SIZES[avatarSize]}px;
  `}

`;
