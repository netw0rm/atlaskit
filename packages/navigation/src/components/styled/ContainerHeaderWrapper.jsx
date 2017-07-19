import styled from 'styled-components';
import { layout, gridSize } from '../../shared-variables';
import { whenCollapsed } from '../../theme/util';

const paddingOpen = (() => {
  const paddingTop = gridSize;
  const paddingLeft = layout.padding.side + (gridSize * 1.75);
  const paddingRight = layout.padding.side + (gridSize * 1.5);
  const paddingBottom = (gridSize * 1.5);

  return `${paddingTop}px ${paddingLeft}px ${paddingBottom}px ${paddingRight}px`;
})();

const ContainerHeaderWrapper = styled.div`
  padding: ${paddingOpen};

  ${whenCollapsed`
    /* centering the icon */
    display: flex;
    justify-content: center;
    flex-shrink: 0;
  `}
`;

ContainerHeaderWrapper.displayName = 'ContainerHeaderWrapper';

export default ContainerHeaderWrapper;
