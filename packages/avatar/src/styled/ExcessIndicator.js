// @flow
import styled from 'styled-components';
import { akColorN40, akColorN500 } from '@atlaskit/util-shared-styles';
import { getAvatarDimensions } from './utils';
import { getStyles } from '../styled/Avatar';

export const Outer = styled.button`
  ${getAvatarDimensions}
  background: 0;
  border: 0;
  outline: 0;
  padding: 0;
  position: static;
`;

export const Disc = styled.div`
  ${getStyles}
  align-items: center;
  background-color: ${akColorN40};
  border-radius: 50%;
  color: ${akColorN500};
  cursor: pointer;
  display: flex;
  font-size: 11px;
  justify-content: center;
`;
