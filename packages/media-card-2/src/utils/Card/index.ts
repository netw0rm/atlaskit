/* tslint:disable: variable-name */
import styled from 'styled-components';
import {akFontFamily, akColorN20} from '@atlaskit/util-shared-styles';

export interface CardProps {
  width?: number | string;
  height?: number | string;
}

export const Card = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  font-size: 12px;
  font-family: ${akFontFamily};
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  border-radius: 3px;
  background-color: ${akColorN20};
  box-shadow: 0 1px 1px rgba(9, 30, 66, 0.2), 0 0 1px 0 rgba(9, 30, 66, 0.24); /* akColorN900 */

  ${({width}: CardProps) => {
    if (!width) {
      return '';
    } else {
      return `
        width: ${typeof width === 'number' ? `${width}px` : width};
      `;
    }
  }}

  ${({height}: CardProps) => {
    if (!height) {
      return '';
    } else {
      return `
        height: ${typeof height === 'number' ? `${height}px` : height};
      `;
    }
  }}

`;
