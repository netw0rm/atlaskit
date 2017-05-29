import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';

export const AVATAR_SIZES = {
  xsmall: akGridSizeUnitless * 2,
  small: akGridSizeUnitless * 3,
  medium: akGridSizeUnitless * 4,
  large: akGridSizeUnitless * 6,
  xlarge: akGridSizeUnitless * 12,
};

export const PRESENCE_BORDER_WIDTH = {
  xsmall: 0,
  small: 2,
  medium: 2,
  large: 3,
  xlarge: 3,
};

// use the additive inverse of border values, where XL is a special case
const offsetMap = {};
Object.keys(PRESENCE_BORDER_WIDTH).forEach((size) => {
  offsetMap[size] = PRESENCE_BORDER_WIDTH[size] * -1;
});
export const PRESENCE_OFFSET = {
  ...offsetMap,
  xlarge: 6,
};

export const PRESENCE_SIZES = {
  xsmall: 0,
  small: 12,
  medium: 12,
  large: 18,
  xlarge: 18,
};
