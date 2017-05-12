import styled from 'styled-components';
import {akColorN30, akFontFamily} from '@atlaskit/util-shared-styles';
import {cardShadow, borderRadius} from '../../styles';

export const Outer = styled.div` // tslint:disable-line:variable-name
  ${cardShadow}
  ${borderRadius}
  background: #fff;
  display: table;
  cursor: pointer;
  line-height: normal;
  position: relative;

    box-sizing: border-box;
  font-family: ${akFontFamily};

  * {
    box-sizing: border-box;
  }

  width: 150px;
  height: 100px;
`;

export const Inner = styled.div` // tslint:disable-line:variable-name
  ${borderRadius}
  background: ${akColorN30};
  display: block;
  height: inherit;
  position: relative;
  overflow: hidden;
`;
