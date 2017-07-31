// @flow

import type { Provided, GenericItemTheme } from './types';
import { gridSize } from '../shared-variables';

// Converts the top-level 'Provided' container navigation theme into the
// format the @atlaskit/item expects.
const itemThemeFromNavTheme = (
  navTheme: Provided,
  isCollapsed?: boolean = false
): GenericItemTheme => ({
  padding: {
    default: {
      x: gridSize * (isCollapsed ? 1.5 : 2.5),
      y: gridSize * 1,
    },
    compact: {
      x: gridSize * (isCollapsed ? 1 : 2),
      y: gridSize * 1,
    },
  },
  borderRadius: 0,
  height: {
    default: gridSize * 5,
    compact: gridSize * 4.5,
  },
  default: {
    background: navTheme.item.default.background,
    text: navTheme.text,
    secondaryText: navTheme.subText,
  },
  hover: {
    background: navTheme.item.hover.background,
    text: navTheme.text,
    secondaryText: navTheme.subText,
  },
  active: {
    background: navTheme.item.active.background,
    text: navTheme.text,
    secondaryText: navTheme.subText,
  },
  selected: {
    background: navTheme.item.selected.background,
    text: navTheme.item.selected.text || '',
    secondaryText: navTheme.subText,
  },
  focus: {
    outline: navTheme.item.focus.outline,
  },
  dragging: {
    background: navTheme.item.dragging.background,
  },
});

export default itemThemeFromNavTheme;
