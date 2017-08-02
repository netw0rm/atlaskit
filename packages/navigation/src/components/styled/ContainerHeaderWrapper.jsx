import styled, { css } from 'styled-components';
import { layout, containerTitleBottomMargin, drawerContainerHeaderAnimationSpeed, gridSize, globalItemSizes } from '../../shared-variables';
import { whenCollapsed } from '../../theme/util';

const minHeight = (props) => {
  if (props.isInDrawer) {
    // the header content isn't rendered in a full-width Drawer
    return 0;
  }
  // the height of the container icon and the margin below it
  return `${(gridSize / 2) + globalItemSizes.medium}px`;
};

const padding = {
  top: gridSize,
  right: gridSize,
  bottom: gridSize / 2,
  left: gridSize,
};

const flexBasis = (props) => {
  if (props.isFullWidth) {
    return 0;
  } else if (props.isInDrawer) {
    return css`${props.iconOffset - padding.top - padding.bottom - layout.padding.top}px`;
  }
  return 'auto';
};

const ContainerHeaderWrapper = styled.div`
  flex-basis: ${flexBasis};
  flex-shrink: 0;
  min-height: ${minHeight};
  padding: ${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px;
  transition: flex-basis ${drawerContainerHeaderAnimationSpeed};

  ${whenCollapsed`
    /* centering the icon */
    display: flex;
    flex-basis: auto;
    flex-direction: column;
    justify-content: center;
  `}

  /* the gap between the container title and the next item like a dropdown */
  > *:first-child + * { margin-top: ${containerTitleBottomMargin}; }
`;

ContainerHeaderWrapper.displayName = 'ContainerHeaderWrapper';

export default ContainerHeaderWrapper;
