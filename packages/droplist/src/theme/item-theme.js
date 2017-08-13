// @flow

import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';
import { itemThemeNamespace } from '@atlaskit/item';
import Theme from '../styled/theme';
import type { ItemTheme } from '../types';

const itemHeightWithoutPadding = 17;
const itemVerticalPadding = akGridSizeUnitless;

export const itemHeight = itemHeightWithoutPadding + (itemVerticalPadding * 2);

const dropdownPadding = {
  x: Theme.Item.padding.x,
  y: Theme.Item.padding.y,
};

const droplistItemTheme: ItemTheme = {
  padding: {
    default: dropdownPadding,
    compact: dropdownPadding,
  },
  borderRadius: parseFloat(Theme.$.borderRadius),
  default: {
    background: Theme.Item.background.default,
    text: Theme.Item.primaryText.default,
    secondaryText: Theme.Item.secondaryText.default,
  },
  hover: {
    background: Theme.Item.background.hover,
    text: Theme.Item.primaryText.hover,
    secondaryText: Theme.Item.secondaryText.hover,
  },
  selected: {
    background: Theme.Item.background.selected,
    text: Theme.Item.primaryText.selected,
    secondaryText: Theme.Item.secondaryText.selected,
  },
  disabled: {
    background: Theme.Item.background.disabled,
    text: Theme.Item.primaryText.disabled,
    secondaryText: Theme.Item.secondaryText.disabled,
  },
  active: {
    background: Theme.Item.background.active,
    text: Theme.Item.primaryText.active,
    secondaryText: Theme.Item.secondaryText.active,
  },
  focus: {
    outline: Theme.Item.boxShadow.focus,
  },
};

export default {
  [itemThemeNamespace]: droplistItemTheme,
};
