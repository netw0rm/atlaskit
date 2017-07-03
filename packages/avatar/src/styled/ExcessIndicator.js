// @flow
import styled from 'styled-components';
import { akColorN40, akColorN500, akColorB200 } from '@atlaskit/util-shared-styles';
import { getAvatarDimensions, getBorderRadius } from './utils';
import { BORDER_WIDTH, EXCESS_INDICATOR_FONT_SIZE } from './constants';
import { getStyles } from './Avatar';

export const Outer = styled.button`
  ${getStyles}
  background: 0;
`;

export const Inner = styled.span`
  ${getAvatarDimensions}
  background-color: ${akColorN40};
  border-radius: ${getBorderRadius}
  align-items: center;
  box-shadow: 0 0 0 ${props => ((props.isFocus && !props.isActive) ? `${BORDER_WIDTH[props.size]}px` : 0)} ${akColorB200};
  color: ${akColorN500};
  cursor: pointer;
  display: flex;
  font-size: ${props => EXCESS_INDICATOR_FONT_SIZE[props.size]}px;
  justify-content: center;
  transition: box-shadow 200ms;
`;
