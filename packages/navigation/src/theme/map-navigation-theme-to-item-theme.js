// @flow

import type { NavigationTheme, GenericItemTheme } from './types';
import { gridSize } from '../shared-variables';

// Converts the top-level 'Provided' container navigation theme into the
// format the @atlaskit/item expects.
const itemThemeFromNavTheme = (
  navigationTheme: NavigationTheme
): GenericItemTheme => ({
  padding: {
    compact: {
      x: gridSize,
      y: gridSize,
    },
    default: {
      x: gridSize * 1.5,
      y: gridSize,
    },
  },
  borderRadius: 0,
  height: {
    compact: gridSize * 4.5,
    default: gridSize * 5,
  },
  beforeItemSpacing: {
    compact: gridSize * 2,
    default: gridSize * 2,
  },
  default: {
    background: navigationTheme.item.default.background,
    text: navigationTheme.text,
    secondaryText: navigationTheme.subText,
  },
  hover: {
    background: navigationTheme.item.hover.background,
    text: navigationTheme.text,
    secondaryText: navigationTheme.subText,
  },
  active: {
    background: navigationTheme.item.active.background,
    text: navigationTheme.text,
    secondaryText: navigationTheme.subText,
  },
  selected: {
    background: navigationTheme.item.selected.background,
    text: navigationTheme.item.selected.text || '',
    secondaryText: navigationTheme.subText,
  },
  focus: {
    outline: navigationTheme.item.focus.outline,
  },
  dragging: {
    background: navigationTheme.item.dragging.background,
  },
});

export default itemThemeFromNavTheme;
