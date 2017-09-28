import {
  EditorState,
  EditorView,
  Schema,
  Node,
  Plugin,
  NodeViewDesc,
  Transaction,
} from '../../prosemirror';
import keymapPlugin from './keymap';
import { EditorProps } from '../../editor/types/editor-props';

import stateKey from './plugin-key';
export { stateKey };

export type InlineCommentMarkerStateSubscriber = (state: InlineCommentMarkerState) => any;
export type StateChangeHandler = (state: InlineCommentMarkerState) => any;
export interface InlineCommentMarkerOptions {
  id: string;
}
export type Coordinates = { left: number; right: number; top: number; bottom: number };

export class InlineCommentMarkerState {
  // public state
  id?: string;
  active: boolean = false;
  editorFocused: boolean = false;

  private changeHandlers: StateChangeHandler[] = [];
  private state: EditorState<any>;

  constructor(state: EditorState<any>) {
    this.changeHandlers = [];
  }

  subscribe(cb: InlineCommentMarkerStateSubscriber) {
    this.changeHandlers.push(cb);
    cb(this);
  }

  unsubscribe(cb: InlineCommentMarkerStateSubscriber) {
    this.changeHandlers = this.changeHandlers.filter(ch => ch !== cb);
  }

  private notifySubs() {
    this.changeHandlers.forEach(cb => cb(this));
  }

  update(state: EditorState<any>, docView: NodeViewDesc, dirty: boolean = false) {
    this.active = true;
    this.notifySubs();
  }

  escapeFromMark(editorView: EditorView) {

  }
}

// const hasInlineCommentMarkerMark = (schema: any, node?: Node) => node && schema.marks.inlineCommentMarker.isInSet(node.marks) as Mark | null;

function updateInlineCommentMarkerOnChange(
  transactions: Transaction[], oldState: EditorState<any>, newState: EditorState<any>, isMessageEditor: boolean
): Transaction | undefined {
  if (!transactions) {
    return;
  }
}

export const createPlugin = (schema: Schema<any, any>, editorProps: EditorProps = {}) => new Plugin({
  props: {
    handleTextInput(view: EditorView, from: number, to: number, text: string) {
      const pluginState: InlineCommentMarkerState = stateKey.getState(view.state);
      pluginState.escapeFromMark(view);
      return false;
    },
    handleClick(view: EditorView) {
      const pluginState: InlineCommentMarkerState = stateKey.getState(view.state);
      if (pluginState.active) {
        pluginState.changeHandlers.forEach(cb => cb(pluginState));
      }
      return false;
    },
    onBlur(view: EditorView) {
      const pluginState: InlineCommentMarkerState = stateKey.getState(view.state);

      pluginState.editorFocused = false;
      if (pluginState.active) {
        pluginState.changeHandlers.forEach(cb => cb(pluginState));
      }

      return true;
    },
    onFocus(view: EditorView) {
      const pluginState: InlineCommentMarkerState = stateKey.getState(view.state);
      pluginState.editorFocused = true;

      return true;
    },
  },
  state: {
    init(config, state: EditorState<any>) {
      return new InlineCommentMarkerState(state);
    },
    apply(tr, pluginState: InlineCommentMarkerState, oldState, newState) {
      return pluginState;
    }
  },
  key: stateKey,
  view: (view: EditorView) => {
    const pluginState: InlineCommentMarkerState = stateKey.getState(view.state);
    pluginState.update(view.state, view.docView, true);

    return {
      update: (view: EditorView, prevState: EditorState<any>) => {
        pluginState.update(view.state, view.docView);
      }
    };
  },
  appendTransaction: (transactions, oldState, newState) => {
    return updateInlineCommentMarkerOnChange(transactions, oldState, newState, editorProps.appearance === 'message');
  },
});

const plugins = (schema: Schema<any, any>, props: EditorProps = {}) => {
  return [createPlugin(schema, props), keymapPlugin(schema, props)].filter((plugin) => !!plugin) as Plugin[];
};

export default plugins;
