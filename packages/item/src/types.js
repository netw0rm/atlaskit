// @flow

type Color = string;

type ItemState = {|
  background: Color,
  text: Color,
  secondaryText: Color
|}

type Padding = {|
  x: number,
  y: number,
|}

export type ItemTheme = {|
  borderRadius: number,
  height?: {|
    compact: number,
    default: number,
    title: number,
  |},
  beforeItemSpacing: {|
    compact: number,
    default: number,
    title: number,
  |},
  focus: {|
    outline: Color,
  |},
  padding: {|
    compact: Padding,
    default: Padding,
    title: Padding,
  |},
  default: ItemState,
  selected: ItemState,
  hover: ItemState,
  active: ItemState,
  disabled: ItemState,
  dragging?: ItemState,
|}

export type ReactElement = any;
export type HTMLElement = any;
