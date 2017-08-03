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
|}

export type ReactElement = any;
