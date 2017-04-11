import {
  akGridSizeUnitless,
} from '@atlaskit/util-shared-styles';

const fullWidth = '100vw';
const narrowWidth = 45 * akGridSizeUnitless;
const wideWidth = 75 * akGridSizeUnitless;

export const boxShadowSpread = akGridSizeUnitless * 4;
export const transformTransition = 'transform 220ms cubic-bezier(0.15, 1, 0.3, 1)';
export const widthTransition = 'width 220ms cubic-bezier(0.15, 1, 0.3, 1)';
export const drawerBackIconSize = akGridSizeUnitless * 5;

export const widths = {
  narrow: {
    width: `${narrowWidth}px`,
    offScreenTranslateX: `${-narrowWidth - boxShadowSpread}px`,
  },
  wide: {
    width: `${wideWidth}px`,
    offScreenTranslateX: `${-wideWidth - boxShadowSpread}px`,
  },
  full: {
    width: fullWidth,
    offScreenTranslateX: `calc(-${fullWidth} - ${boxShadowSpread}px)`,
  },
};
