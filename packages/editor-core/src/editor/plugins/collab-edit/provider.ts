import { EventEmitter } from 'events';
import {
  Transaction,
  EditorState,
} from '../../../prosemirror';

export type CollabEvent = 'init' | 'data' | 'error';

export interface CollabEditProvider {
  initialize(getState: () => any): this;
  send(tr: Transaction, oldState: EditorState<any>, newState: EditorState<any>): void;
  on(evt: CollabEvent, handler: (...args) => void): this;
}

export class AbstractCollabEditProvider implements CollabEditProvider {
  protected getState = () => {};
  protected eventBus: EventEmitter = new EventEmitter();

  initialize(getState: () => any) {
    this.getState = getState;
    return this;
  }

  send(tr: Transaction, oldState: EditorState<any>, newState: EditorState<any>) {
  }

  on(evt: CollabEvent, handler: (...args) => void) {
    this.eventBus.on(evt, handler);
    return this;
  }
}
