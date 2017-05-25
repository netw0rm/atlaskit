// @flow
export type Color = string;
export type Background = Color;
export type Text = Color;
export type Keyline = Color;

export type ItemTheme = {|
  default: {|
    background: Background
  |},
  hover: {|
    background: Background
  |},
  active: {|
    background: Background
  |},
  focus: {|
    outline: Keyline,
  |},
  selected: {|
    background: Background,
    text?: Text,
  |},
|}

export type Theme = {|
  background: {|
    primary: Background,
    secondary: Background,
    // currently used for drawer
    tertiary: Background,
  |},
  text: Text,
  subText: Text,
  keyline: Keyline,
  item: ItemTheme,
  dropdown: ItemTheme,
  group: {|
    title: Text,
  |}
|}
