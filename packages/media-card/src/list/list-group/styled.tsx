/* tslint:disable:variable-name */
import styled from 'styled-components';
import { akColorN100 } from '@atlaskit/util-shared-styles';

export const Wrapper = styled.div`
  margin: 20px 0;

  &:first-child {
    margin: 0 0 20px 0;
  }
`;

export const Title = styled.div`
  text-transform: uppercase;
  color: ${akColorN100};
  margin-bottom: 5px;
`;
