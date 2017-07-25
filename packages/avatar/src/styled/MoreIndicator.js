import styled from 'styled-components';
import { akColorN40, akColorN500, akColorB200 } from '@atlaskit/util-shared-styles';
import { getBorderRadius, getInnerStyles } from './utils';
import { BORDER_WIDTH, EXCESS_INDICATOR_FONT_SIZE } from './constants';

const ThemeColor = {
  background: akColorN40,
  border: akColorB200,
  text: akColorN500,
};

const getBorderWidth = p => ((p.isFocus && !p.isActive) ? `${BORDER_WIDTH[p.size]}px` : 0);

export const Outer = styled.button`
  ${getInnerStyles}
  background: 0;
`;

export const Inner = styled.span`
  background-color: ${ThemeColor.background};
  border-radius: ${getBorderRadius}
  align-items: center;
  box-shadow: 0 0 0 ${getBorderWidth} ${ThemeColor.border};
  color: ${ThemeColor.text};
  cursor: pointer;
  display: flex;
  flex: 1;
  font-size: ${props => EXCESS_INDICATOR_FONT_SIZE[props.size]}px;
  justify-content: center;
  transition: box-shadow 200ms;
`;
