/* tslint:disable:variable-name */
import styled from 'styled-components';
import { Root } from '../styles/base';
import { akColorN50, akColorN900 } from '@atlaskit/util-shared-styles';

export const LinkCardViewHorizontalWrapper = styled(Root)`
  display: flex;


  border-radius: 3px;
  box-shadow: 0 1px 1px rgba(9, 30, 66, 0.2), 0 0 1px 0 rgba(9, 30, 66, 0.24);
`;

export const Details = styled.div`
  flex-grow: 1;
  background-color: ${akColorN50};
`;
