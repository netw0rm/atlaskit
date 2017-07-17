// @flow
const prefix = (key: string): string =>
  `private-drag-drop-key-do-not-use-${key}`;

export const storeKey: string = prefix('store');
export const droppableIdKey: string = prefix('droppableId');
