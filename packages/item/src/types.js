// @flow

type Color = string;

type ItemState = {|
  background: Color,
  text: Color,
  secondaryText: Color
|}

type Padding = {|
  bottom: number,
  left: number,
  right: number,
  top: number,
|}

export type ItemTheme = {|
  afterItemSpacing: number,
  beforeItemSpacing: number,
  borderRadius: number,
  height?: {|
    compact: number,
    default: number,
  |},
  focus: {|
    outline: Color,
  |},
  padding: {|
    compact: Padding,
    default: Padding,
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
