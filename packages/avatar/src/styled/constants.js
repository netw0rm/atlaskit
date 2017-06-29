// @flow
import { akColorPrimary3, akGridSizeUnitless } from '@atlaskit/util-shared-styles';

export const DEFAULT_BORDER_COLOR = akColorPrimary3;

export const AVATAR_SIZES = {
  xsmall: akGridSizeUnitless * 2,
  small: akGridSizeUnitless * 3,
  medium: akGridSizeUnitless * 4,
  large: akGridSizeUnitless * 5,
  xlarge: akGridSizeUnitless * 12,
  xxlarge: akGridSizeUnitless * 16,
};

// for "square" avatars
export const AVATAR_RADIUS = {
  xsmall: 2,
  small: 2,
  medium: 3,
  large: 3,
  xlarge: 6,
  xxlarge: 12,
};

// NOTE: sizes xsmall & xxlarge do NOT support presence

export const PRESENCE_BORDER_WIDTH = {
  xsmall: 0,
  small: 2,
  medium: 2,
  large: 3,
  xlarge: 3,
  xxlarge: 0,
};

export const PRESENCE_SIZES = {
  xsmall: 0,
  small: 10,
  medium: 12,
  large: 14,
  xlarge: 18,
  xxlarge: 0,
};

const offsetMap = {};
// use the additive inverse of border values, where XL is a special case
Object.keys(PRESENCE_BORDER_WIDTH).forEach((size) => {
  offsetMap[size] = PRESENCE_BORDER_WIDTH[size] * -1;
});
export const PRESENCE_OFFSET = {
  ...offsetMap,
  xlarge: 6,
};
