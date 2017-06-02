/* tslint:disable:variable-name */
import styled from 'styled-components';
import { Root, cardShadow, centerSelf, borderRadius, size } from '../../styles';
import { akColorN20 } from '@atlaskit/util-shared-styles';

export const Card = styled(Root)`
  ${cardShadow}
  background: #fff;
  display: table;
  cursor: pointer;
  line-height: normal;
  position: relative;

  &.small-breakpoint {
    .title {
      font-size: 12px;
    }
    .file-type-icon span {
      // We need to use important here since we can't use the dimensions provided by the Icon component
      ${size('14px !important')}
    }
  }

  &.medium-breakpoint {
    .title {
      font-size: 14px;
    }
    .file-type-icon span {
      ${size('16px !important')}
    }
  }

  &.large-breakpoint {
    .overlay {
      padding: 24px;
    }
    .title {
      font-size: 14px;
    }
    .file-size {
      font-size: 14px;
    }
    .file-type-icon span {
      ${size('18px !important')}
    }
  }

  &.xlarge-breakpoint {
    border-radius: 2px;

    .title {
      font-size: 16px;
    }
    .file-size {
      font-size: 14px;
    }
    .wrapper, .img-wrapper {
      border-radius: 2px;
    }

    .overlay {
      padding: 24px;
    }
    .file-type-icon span {
      ${size('18px !important')}
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
