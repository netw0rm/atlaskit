// @flow
import styled from 'styled-components';
import { BORDER_WIDTH } from './constants';

// set fallbacks for border color/width to protect consumers from invalid values
export const Outer = styled.span`
  align-content: center;
  align-items: center;
  background-color: ${props => props.bgColor};
  border-radius: 50%;
  box-sizing: border-box;
  display: flex;
  overflow: hidden;
  padding: ${({ size }) => BORDER_WIDTH[size] || BORDER_WIDTH.medium}px;
  height: 100%;
  width: 100%;
`;

export const Inner = styled.span`
  align-items: center;
  border-radius: 50%;
  display: flex;
  overflow: hidden;
  height: 100%;
  width: 100%;
`;
