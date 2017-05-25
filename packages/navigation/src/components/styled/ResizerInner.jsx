import styled from 'styled-components';
import { akColorB200 } from '@atlaskit/util-shared-styles';

const resizerClickableWidth = 12;
const resizerVisibleWidth = 2;

const ResizerInner = styled.div`
  cursor: ew-resize;
  height: 100%;

  /* position: absolute so that it will not effect the width of the navigation */
  position: absolute;

  right: -${resizerClickableWidth / 2}px;
  width: ${resizerClickableWidth}px;

  &:hover::before {
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

ResizerInner.displayName = 'ResizerInner';
export default ResizerInner;
