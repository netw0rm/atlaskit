// @flow
export type Color = string | () => string;
export type Background = Color;
export type Text = Color;
export type Line = Color;

export type ItemTheme = {|
  default: {|
    background: Background
  |},
  hover: {|
    background: Background
  |},
  active: {|
    background: Background,
    text?: Text,
  |},
  focus: {|
    outline?: Line,
  |},
  selected: {|
    background: Background,
    text?: Text,
  |},
  dragging: {|
    background: Background,
  |}
|}

export type ScrollTheme = {|
  default: {|
    background: Background
  |},
  hover: {|
    background: Background
  |}
|}

export type Provided = {|
  background: {|
    primary: Background,
    secondary: Background,
    // currently used for drawer
    tertiary: Background,
  |},
  scrollbar: ScrollTheme,
  text: Text,
  subText: Text,
  keyline: Line,
  item: ItemTheme,
  dropdown: ItemTheme,
  hasDarkmode?: boolean,
|}

export type RootTheme = {|
  provided: Provided,
  isCollapsed: bool,
|}

// Ideally GenericItemTheme would be imported from @atlaskit/item.
// I've tried it locally and not working at the moment, can revisit
// once Flow is fully supported and documented in the repo.
type GenericItemState = {|
  background: Color,
  text?: Color,
  secondaryText?: Color
|}

type GenericItemPadding = {|
  bottom: number,
  left: number,
  right: number,
  top: number,
|}

export type GenericItemTheme = {|
  borderRadius: number,
  height?: {|
    compact: number,
    default: number,
  |},
  focus: {|
    outline: Color,
  |},
  padding: {|
    compact: GenericItemPadding,
    default: GenericItemPadding,
  |},
  beforeItemSpacing: {|
    compact: number,
    default: number,
  |},
  default: GenericItemState,
  selected: GenericItemState,
  hover: GenericItemState,
  active: GenericItemState,
  dragging?: GenericItemState,
  disabled?: GenericItemState,
|};
