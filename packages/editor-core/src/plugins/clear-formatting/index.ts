import {
  EditorState,
  EditorView,
  Schema,
  MarkType,
  Plugin,
  PluginKey,
} from '../../prosemirror';
import { clearFormatting, FORMATTING_MARK_TYPES, FORMATTING_NODE_TYPES } from './commands';
import keymapPlugin from './keymap';

export type StateChangeHandler = (state: ClearFormattingState) => any;

export class ClearFormattingState {
  formattingIsPresent: boolean = false;

  private state: EditorState<any>;
  private activeMarkTypes: string[];
  private changeHandlers: StateChangeHandler[] = [];

  constructor(state: EditorState<any>) {
    this.changeHandlers = [];
    this.update(state);
  }

  subscribe(cb: StateChangeHandler) {
    this.changeHandlers.push(cb);
    cb(this);
  }

  unsubscribe(cb: StateChangeHandler) {
    this.changeHandlers = this.changeHandlers.filter(ch => ch !== cb);
  }

  update(newEditorState: EditorState<any>) {
    this.state = newEditorState;
    const { state } = this;

    this.activeMarkTypes = FORMATTING_MARK_TYPES.filter(
      mark => state.schema.marks[mark] && this.markIsActive(state.schema.marks[mark])
    );
    const formattingIsPresent = this.activeMarkTypes.length > 0 || this.blockStylingIsPresent();
    if (formattingIsPresent !== this.formattingIsPresent) {
      this.formattingIsPresent = formattingIsPresent;
      this.triggerOnChange();
    }
  }

  clearFormatting(view: EditorView) {
    clearFormatting()(view.state, view.dispatch);
  }

  private triggerOnChange() {
    this.changeHandlers.forEach(cb => cb(this));
  }

  private markIsActive(mark: MarkType): boolean {
    const { state } = this;
    const { from, to, empty } = state.selection;
    if (empty) {
      return !!mark.isInSet(state.selection.$from.marks());
    }
    return state.doc.rangeHasMark(from, to, mark);
  }

  private blockStylingIsPresent = (): boolean => {
    const { state } = this;
    let { from, to } = state.selection;
    let isBlockStyling = false;
    state.doc.nodesBetween(from, to, (node, pos) => {
      if (FORMATTING_NODE_TYPES.indexOf(node.type.name) !== -1) {
        isBlockStyling = true;
        return false;
      }
      return true;
    });
    return isBlockStyling;
  }
}

export const stateKey = new PluginKey('clearFormattingPlugin');

export const plugin = new Plugin({
  state: {
    init(config, state: EditorState<any>) {
      return new ClearFormattingState(state);
    },
    apply(tr, pluginState: ClearFormattingState, oldState, newState) {
      pluginState.update(newState);
      return pluginState;
    }
  },
  key: stateKey
});

const plugins = (schema: Schema<any, any>) => {
  return [plugin, keymapPlugin(schema)].filter((plugin) => !!plugin) as Plugin[];
};

export default plugins;
