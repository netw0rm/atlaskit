import {
  akColorB500,
  akColorN800,
} from '@atlaskit/util-shared-styles';
import styled from 'styled-components';
import {
    resizeAnimationTime,
    globalOpenWidth,
    globalVerticalPaddingTop,
    globalVerticalPaddingBottom,
} from '../../shared-variables';

const colors = {
  global: {
    background: akColorB500,
  },
  settings: {
    background: akColorN800,
  },
};

export default styled.div`
  align-items: center;
  background-color: ${({ appearance }) => colors[appearance].background};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-bottom: 0;
  padding: ${globalVerticalPaddingTop}px 0 ${globalVerticalPaddingBottom}px 0;
  position: fixed;
  transition: ${({ shouldAnimate }) => (shouldAnimate ? `transform ${resizeAnimationTime}` : 'none')};
  width: ${globalOpenWidth}px;
`;
