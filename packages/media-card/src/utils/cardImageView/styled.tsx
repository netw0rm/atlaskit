/* tslint:disable:variable-name */
import styled from 'styled-components';
import { Root, cardShadow, centerSelf, borderRadius } from '../../styles';
import { akColorN20 } from '@atlaskit/util-shared-styles';

export const Card = styled(Root)`
  ${cardShadow}
  ${borderRadius}
  background: #fff;
  display: table;
  cursor: pointer;
  line-height: normal;
  position: relative;

  &.small-breakpoint {
    .top-row {
      padding-top: 16px;
      padding-left: 16px;
    }
  }

  .wrapper {
    ${borderRadius}
    background: ${akColorN20};
    display: block;
    height: inherit;
    position: relative;

    .img-wrapper{
      ${borderRadius}
      position: relative;
      width: inherit;
      height: inherit;
      display: block;

      img {
        ${centerSelf}
        max-height: 100%;
        max-width: 100%;
        display: block;
      }
    }
  }
`;
