/* tslint:disable:variable-name */
import styled from 'styled-components';
import { akColorN30, akColorN70, akColorN300 } from '@atlaskit/util-shared-styles';
import { size, ellipsis, antialiased } from '../../styles';

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

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${size()}

  padding: 16px;
  background: ${akColorN30};
`;

export const ErrorHeader = styled.div`
  color: ${akColorN70};
  ${antialiased}

  font-weight: bold;
  font-size: 12px;
  line-height: 15px;

  ${ellipsis('calc(100% - 24px)')}
`;
