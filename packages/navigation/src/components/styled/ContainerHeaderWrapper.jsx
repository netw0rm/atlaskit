import styled from 'styled-components';
import { gridSize } from '../../shared-variables';
import { whenCollapsed } from '../../theme/util';

const itemSize = 40;
const itemBottomMargin = gridSize;

const ContainerHeaderWrapper = styled.div`
  min-height: ${itemSize + itemBottomMargin}px;
  flex-shrink: 0;
  padding: ${gridSize}px ${gridSize}px ${gridSize / 2}px ${gridSize}px;

  ${whenCollapsed`
    /* centering the icon */
    display: flex;
    justify-content: center;
    flex-shrink: 0;
    flex-direction: column;
  `}
  > * + * { margin-top: 16px; }
`;

ContainerHeaderWrapper.displayName = 'ContainerHeaderWrapper';

export default ContainerHeaderWrapper;
