/* tslint:disable: variable-name */
import styled from 'styled-components';
import {akColorN0, akColorN900} from '@atlaskit/util-shared-styles';
import {colorWithAlpha} from '../../src/utils/colorWithAlpha';

interface BoxProps {
  theme?: 'default' | 'dark';
  fgColor?: string;
  bgColor?: string;
}

 export const Flex = styled.div`
  display: flex;
  wrap: no-wrap;
 `;

export const Box = styled.div`
  flex-grow: 1;
  flex-basis: 0;
  padding: 1em;
  color: ${(props: BoxProps) => {
    if (props.theme === 'dark') {
      return akColorN0;
    }
    return props.fgColor || 'currentColor';
  }};
  background-color: ${(props: BoxProps) => {
    if (props.theme === 'dark') {
      return colorWithAlpha(akColorN900, 0.75);
    }
    return props.bgColor || 'transparent';
  }};
`;
