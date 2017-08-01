import styled from 'styled-components';
import { layout, gridSize, globalItemSizes } from '../../shared-variables';
import { whenCollapsed } from '../../theme/util';

const collapsedMinHeight = (gridSize / 2) + globalItemSizes.medium;

const paddingOpen = {
  top: gridSize,
  right: gridSize,
  bottom: gridSize / 2,
  left: gridSize,
};

const ContainerHeaderWrapper = styled.div`
  transition: flex-basis 220ms;
  flex-basis: ${props => (props.isFullWidth ? 0 : props.iconOffset - paddingOpen.top - paddingOpen.bottom - layout.padding.top)}px;
  flex-shrink: 0;
  padding: ${paddingOpen.top}px ${paddingOpen.right}px ${paddingOpen.bottom}px ${paddingOpen.left}px;

  ${whenCollapsed`
    /* centering the icon */
    display: flex;
    flex-shrink: 0;
    flex-direction: column;
    justify-content: center;
    min-height: ${collapsedMinHeight}px;
  `}
  > * + * { margin-top: 20px; }
`;

ContainerHeaderWrapper.displayName = 'ContainerHeaderWrapper';

export default ContainerHeaderWrapper;
