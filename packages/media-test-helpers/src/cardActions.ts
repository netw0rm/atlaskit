import { action } from '@kadira/storybook';
import { MediaCollection, MediaCollectionItem, CardActionType, MediaItem } from '@atlaskit/media-core';

// menu
export const menuActions = [
  {label: 'Open', handler: () => { action('open')(); }},
  {label: 'Close', handler: () => { action('close')(); }}
];

export const annotateAction = {
  type: -1,
  label: 'Annotate',
  handler: (item: MediaCollectionItem, collection: MediaCollection, e?: Event) => {
    action('annotate')(item, collection);
  }
};

// TODO: decide which deleteAction is the good one
export const deleteAction = {label: 'Delete', type: CardActionType.delete, handler: () => { action('delete')(); }};
export const deleteAction = ListCardDelete((item: MediaItem, items: Array<{id: string}>, e?: Event) => {
  action('delete')(item, items);
});
export const deleteAction = {type: CardActionType.delete, label: 'Delete', handler: () => {}};

export const anotherAction = {
  type: -2,
  label: 'Some other action',
  handler: (item: MediaCollectionItem, collection: MediaCollection, e?: Event) => {
    action('Some other action')(item, collection);
  }
};
export const actions = [
  {label: 'Open', type: undefined, handler: () => { action('open')(); }},
  {label: 'Close', type: undefined, handler: () => { action('close')(); }},
  deleteAction
];

// TODO: Add CollectionCardDelete into media-core. see: https://jira.atlassian.com/browse/FIL-4004
// const deleteAction = CollectionCardDelete((item: MediaItem, items: Array<{ id: string }>, e?: Event) => {
//   action('delete')(item, items);
// });

// TODO: Add deleteAction back to story. see: https://jira.atlassian.com/browse/FIL-4004
export const cardsActions = [/*deleteAction, */anotherAction, annotateAction];