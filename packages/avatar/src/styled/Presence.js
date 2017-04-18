import styled from 'styled-components';
import { akColorPrimary3 } from '@atlaskit/util-shared-styles';
import { PRESENCE_BORDER_WIDTH } from './constants';

// set fallbacks for border color/width to protect consumers from invalid values
export default styled.div`
  align-content: center;
  align-items: middle;
  border-color: ${akColorPrimary3};
  border-radius: 100%;
  border-style: solid;
  border-width: ${({ size }) => PRESENCE_BORDER_WIDTH[size] || PRESENCE_BORDER_WIDTH.medium}px;
  box-sizing: border-box;
  display: flex;
  height: 100%;
  overflow: hidden;
  width: 100%;

  &:empty {
    display: none;
  }
`;
