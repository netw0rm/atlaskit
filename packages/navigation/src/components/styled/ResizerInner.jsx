import styled from 'styled-components';
import { akColorB200 } from '@atlaskit/util-shared-styles';

const resizerClickableWidth = 12;
const resizerVisibleWidth = 2;

export default styled.div`
  height: 100%;
  width: ${resizerClickableWidth}px;
  position: relative;
  left: -${resizerClickableWidth / 2}px;
  cursor: ew-resize;
  &:hover:before {
    background: ${akColorB200};
  }
  &:before {
    content: '';
    width: ${resizerVisibleWidth}px;
    height: 100%;
    position: absolute;
    left: ${(resizerClickableWidth - resizerVisibleWidth) / 2}px;
  }
`;
