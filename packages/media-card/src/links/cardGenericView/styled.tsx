/* tslint:disable:variable-name */
import styled from 'styled-components';
import { akColorN300 } from '@atlaskit/util-shared-styles';
import { size, ellipsis } from '../../styles';

export const Title = styled.div`
  ${ellipsis('100%')}

  user-select: text;
  font-size: 14px;
`;

export const Description = styled.div`
  user-select: text;
  overflow: hidden;

  .ellipsed-text {
    font-size: 12px;
    white-space: initial;
  }
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Link = styled.div`
  display: flex;
  align-items: center;
  width: calc(100% - 40px);

  img {
    ${size(16)}
    margin-right: 5px;
  }

  a {
    user-select: text;
    display: block;
    font-size: 12px;
    color: ${akColorN300};

    ${ellipsis(230)}
  }
`;

