import {
  Transaction,
  EditorState,
} from '../../../prosemirror';

export type CollabEvent = 'init' | 'connected' | 'data' | 'telepointer' | 'presence' | 'error';

export interface CollabEditProvider {
  initialize(getState: () => any): this;
  send(tr: Transaction, oldState: EditorState<any>, newState: EditorState<any>): void;
  on(evt: CollabEvent, handler: (...args) => void): this;
}
