import {action} from '@kadira/storybook';
import {CardAction} from '../../../../src';

export const openAction: CardAction = {content: 'Open', handler: action('open')};
export const closeAction: CardAction = {content: 'Close', handler: action('close')};
export const deleteAction: CardAction = {type: 'delete', content: 'Delete', handler: action('delete')};

export const actions: CardAction[] = [
  openAction,
  closeAction,
  deleteAction
];
