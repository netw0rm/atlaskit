// @flow

import {
  akColorB200,
  akColorPrimary3,
  akGridSizeUnitless,
  akZIndexBlanket,
  akZIndexNavigation,
} from '@atlaskit/util-shared-styles';

/**
* NOTE: changing the width of the Navigation is considered a breaking change
*/

export const gridSize: number = akGridSizeUnitless;

export const layout = {
  padding: {
    top: gridSize * 2,
    bottom: gridSize * 2,
    side: gridSize,
  },
  width: {
    closed: 64,
  },
};

export const globalItemSizes = {
  small: gridSize * 4,
  medium: gridSize * 5,
  large: gridSize * 6,
};

export const drawerOffset = gridSize * 2;
export const drawerContainerHeaderAnimationSpeed = '220ms';
export const globalOpenWidth = layout.width.closed;
export const containerClosedWidth = globalOpenWidth;
export const containerOpenWidth = 240;
export const containerTitleBottomMargin = gridSize * 2.5;
export const standardOpenWidth = globalOpenWidth + containerOpenWidth;
export const resizeClosedBreakpoint = globalOpenWidth + (containerOpenWidth / 2);
export const collapseBreakpoint = globalOpenWidth + containerClosedWidth;
export const searchIconOffset = 80;
export const createIconOffset = 120;
export const animationTimeUnitless = 200;
export const animationTime = `${animationTimeUnitless}ms`;
export const resizeAnimationTime = animationTime;
export const nestedNavigationAnimationTime: number = 500;
export const zIndex = {
  base: akZIndexNavigation,
  // needs to sit on top of navigation and the drawer
  drawer: akZIndexBlanket + 1,
};

// these are colors that are currently not controllable via theming
export const unthemedColors = {
  resizer: akColorB200,
  presenceIconBg: akColorPrimary3,
  scrollbarBackground: 'rgba(0,0,0,0.2)',
  scrollbarHoverBackground: 'rgba(0,0,0,0.4)',
};

// these colours are for the scrollbars in ContainerNavigationChildren
export const scrollbar = {
  size: gridSize,
  background: unthemedColors.scrollbarBackground,
  hoverBackground: unthemedColors.scrollbarHoverBackground,
};

export const globalPrimaryActions = (() => {
  const itemSizes = {
    medium: gridSize * 5,
  };

  const margin = {
    bottom: gridSize * 2,
  };

  const innerHeight = (itemSizes.medium * 3) + (gridSize * 2);

  const height = {
    inner: innerHeight,
    outer: gridSize + margin.bottom + innerHeight,
  };

  return {
    height,
    margin,
    itemSizes,
  };
})();

export const globalSecondaryActions = (() => {
  const itemSizes = {
    medium: gridSize * 5,
  };

  const margin = {
    bottom: gridSize * 2,
  };

  const height = (actionCount) => {
    const innerHeight = itemSizes.medium * actionCount;
    return {
      inner: innerHeight,
      outer: margin.bottom + innerHeight,
    };
  };

  return {
    height,
    margin,
    itemSizes,
  };
})();

export const search = {
  layout: {
    padding: {
      top: gridSize * 0.5,
      bottom: 0,
      side: gridSize * 3,
    },
    margin: {
      top: 0,
      bottom: gridSize * 3,
      side: 0,
    },
    /**
     * Restore the height setting that was lost due to the ClearButton no longer being there to
     * stretch the box. (this height aligns it nicely with the back button in drawers)
     */
    height: gridSize * 4,
  },
};
