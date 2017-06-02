import {CardActionType} from '@atlaskit/media-core';
import {action} from '@kadira/storybook';

export const actions = [
  {label: 'Open', type: undefined, handler: () => { action('open')(); }},
  {label: 'Close', type: undefined, handler: () => { action('close')(); }},
  {label: 'Delete', type: CardActionType.delete, handler: () => { action('delete')(); }}
];
