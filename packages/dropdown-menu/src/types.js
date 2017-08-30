// @flow
export type ItemId = string;
export type GroupId = string;

export type CachedItem = {|
  id: ItemId,
  groupId: GroupId,
|};

export type FocusItem = {|
  itemId: ItemId,
  itemNode: HTMLElement,
|};

export type Behaviors = 'checkbox' | 'radio' | 'menuitemcheckbox' | 'menuitemradio';

export type OpenChangeObj = {|
  isOpen: boolean,
  event: Event
|};

export type ReactElement = any;

type DeprecatedItem = {
  content?: string,
  elemBefore?: ReactElement,
  href?: string,
  isDisabled?: boolean,
  target?: '_blank' | '_self',
}

type DeprecatedItemGroup = {
  elemAfter?: ReactElement,
  heading?: string,
  items: Array<DeprecatedItem>,
}

type DropdownMenuBaseProps = {
  /**
    * Controls the appearance of the menu.
    * Default menu has scroll after its height exceeds the pre-defined amount.
    * Tall menu has no restrictions.
    */
  appearance: 'default' | 'tall',
  /** Content that will be rendered inside the layer element. Should typically be
    * `DropdownItemGroup` or `DropdownItem`, or checkbox / radio variants of those. */
  children?: ReactElement,
  /** If true, a Spinner is rendered instead of the items */
  isLoading: boolean,
  /** Controls the open state of the dropdown. */
  isOpen: boolean,
  /** Deprecated. An array of groups. Every group must contain an array of items */
  items: Array<DeprecatedItemGroup>,
  /** Deprecated. Called when an item is activated. Receives an object with the activated item. */
  onItemActivated: Function,
  /** Position of the menu. See the documentation of @atlastkit/layer for more details. */
  position: string,
  /** Deprecated. Option to display multiline items when content is too long.
    * Instead of ellipsing the overflown text it causes item to flow over multiple lines.
    */
  shouldAllowMultilineItems: boolean,
  /** Option to fit dropdown menu width to its parent width */
  shouldFitContainer: boolean,
  /** Allows the dropdown menu to be placed on the opposite side of its trigger if it does not
    * fit in the viewport. */
  shouldFlip: boolean,
  /** Content which will trigger the dropdown menu to open and close. Use with `triggerType`
    * to easily get a button trigger. */
  trigger?: ReactElement | string,
  /** Props to pass through to the trigger button. See @atlaskit/button for allowed props. */
  triggerButtonProps: {},
  /** Controls the type of trigger to be used for the dropdown menu. The default trigger allows
    * you to supply your own trigger component. Setting this prop to `button` will render a
    * Button component with an 'expand' icon, and the `trigger` prop contents inside the
    * button. */
  triggerType: 'default' | 'button',
}

export type DropdownMenuStatelessProps = DropdownMenuBaseProps & {
  /** Called when the menu should be open/closed. Received an object with isOpen state. */
  onOpenChange: Function,
}

export type DropdownMenuStatefulProps = DropdownMenuBaseProps & {
  /** Controls the initial open state of the dropdown. */
  defaultOpen: boolean,
  /** Called when the menu is open or closed. Received an object with isOpen state. */
  onOpenChange: Function,
}
