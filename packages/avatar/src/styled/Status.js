// @flow
import styled from 'styled-components';
import { PRESENCE_BORDER_WIDTH } from './constants';

// set fallbacks for border color/width to protect consumers from invalid values
export default styled.div`
  align-content: center;
  align-items: center;
  background-color: ${props => props.bgColor};
  border-radius: 50%;
  box-sizing: border-box;
  display: flex;
  height: 100%;
  overflow: hidden;
  padding: ${({ size }) => PRESENCE_BORDER_WIDTH[size] || PRESENCE_BORDER_WIDTH.medium}px;
  width: 100%;
`;
