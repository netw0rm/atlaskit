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
