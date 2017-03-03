/* tslint:disable:variable-name */
import styled from 'styled-components';
import { Root, cardShadow, centerSelf, borderRadius } from '../styles/base';
import { akColorN30 } from '@atlaskit/util-shared-styles';

export const Card = styled(Root)`
  ${cardShadow()}
  ${borderRadius()}
  background: #fff;
  display: table;
  font-family: sans-serif;
  cursor: pointer;
  line-height: normal;
  position: relative;
  
  .wrapper {
    ${borderRadius()}
    background: ${akColorN30};
    display: block;
    height: inherit;
    position: relative;

    .img-wrapper{
      position: relative;
      width: inherit;
      height: inherit;
      display: block;

      img {
        ${centerSelf()}
        max-height: 100%;
        max-width: 100%;
        display: block;
      }
    }
  }
`;
