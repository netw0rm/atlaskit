import {
  EditorState,
  EditorView,
  Schema,
  Plugin,
  PluginKey,
} from '../../prosemirror';
import keymapPlugin from './keymaps';

export type CodeMirrorFocusSubscriber = (uniqueId: string) => any;

export class CodeMirrorState {
  private focusHandlers: CodeMirrorFocusSubscriber[] = [];

  constructor(state: EditorState<any>) {
    this.focusHandlers = [];
  }

  subscribe(cb: CodeMirrorFocusSubscriber) {
    this.focusHandlers.push(cb);
  }

  unsubscribe(cb: CodeMirrorFocusSubscriber) {
    this.focusHandlers = this.focusHandlers.filter(ch => ch !== cb);
  }

  triggerFocus(uniqueId) {
    this.focusHandlers.forEach(cb => cb(uniqueId));
  }
}

export const stateKey = new PluginKey('codeMirrorPlugin');

const plugin = new Plugin({
  state: {
    init(config, state: EditorState<any>) {
      return new CodeMirrorState(state);
    },
    apply(tr, pluginState: CodeMirrorState) {
      return pluginState;
    }
  },
  key: stateKey,
  props: {
    onFocus:(view: EditorView) => {
      const pluginState = stateKey.getState(view.state);
      const node = view.state.selection.$from.node(view.state.selection.$from.depth);
      if (node.type.name === 'codeBlock') {
        pluginState.triggerFocus(node.attrs['uniqueId']);
      }
      return true;
    },
  },
});

const plugins = (schema: Schema<any, any>) => {
  return [plugin, keymapPlugin()] as Plugin[];
};

export default plugins;
