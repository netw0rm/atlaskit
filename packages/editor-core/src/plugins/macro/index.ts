import {
  EditorState,
  PluginKey,
  EditorView,
  Schema,
  NodeViewDesc,
  TextSelection,
  Plugin,
  Node,
} from '../../prosemirror';

export class MacroState {
  private state: EditorState<any>;
  private editorFocused: boolean = false;
  private activeNode: Node | undefined;
  private changeHandlers: MacroStateSubscriber[] = [];

  element?: HTMLElement | undefined;
  toolbarVisible?: boolean | undefined;

  constructor(state: EditorState<any>) {
    this.changeHandlers = [];
    this.state = state;
    this.toolbarVisible = false;
  }

  updateEditorFocused(editorFocused: boolean) {
    this.editorFocused = editorFocused;
  }

  removeMacro(view: EditorView) {
    const { dispatch, state } = view;
    const { tr } = state;
    const { $from, $to } = state.selection;
    const newFrom = tr.doc.resolve($from.start($from.depth - 1));
    const newTo = tr.doc.resolve($to.end($to.depth - 1));
    const range = newFrom.blockRange(newTo)!;
    dispatch(tr.lift(range, $from.depth - 2));
  }

  subscribe(cb: MacroStateSubscriber) {
    this.changeHandlers.push(cb);
    cb(this);
  }

  unsubscribe(cb: MacroStateSubscriber) {
    this.changeHandlers = this.changeHandlers.filter(ch => ch !== cb);
  }

  update(state: EditorState<any>, docView: NodeViewDesc, domEvent: boolean = false) {
    this.state = state;
    const newMacro = this.getActiveMacro(docView);
    if ((domEvent && newMacro) || this.activeNode !== newMacro) {
      const newElement = newMacro && this.getDomElement(docView);
      this.activeNode = newMacro;
      this.toolbarVisible = this.editorFocused && !!newMacro && (domEvent || this.element !== newElement);
      this.element = newElement;
      this.changeHandlers.forEach(cb => cb(this));
    }
  }

  private getActiveMacro(docView: NodeViewDesc): Node | undefined {
    const { state } = this;
    if (state.selection instanceof TextSelection) {
      const { $from } = state.selection;
      const node = $from.node($from.depth - 1);
      if (node && node.type === state.schema.nodes.richTextBlockMacro) {
        return node;
      }
    }
  }

  private getDomElement(docView: NodeViewDesc): HTMLElement | undefined {
    const { state: { selection } } = this;
    if (selection instanceof TextSelection) {
      const { node } = docView.domFromPos(selection.$from.pos);
      let currentNode = node;
      while (currentNode) {
        if (currentNode.attributes && currentNode.attributes['data-macro-id']) {
          return currentNode as HTMLElement;
        }
        currentNode = currentNode.parentNode!;
      }
    }
  }
}

export type MacroStateSubscriber = (state: MacroState) => any;

export const stateKey = new PluginKey('macroPlugin');

const plugin = new Plugin({
  state: {
    init(config, state: EditorState<any>) {
      return new MacroState(state);
    },
    apply(tr, pluginState: MacroState, oldState, newState) {
      const stored = tr.getMeta(stateKey);
      if (stored) {
        pluginState.update(newState, stored.docView, stored.domEvent);
      }
      return pluginState;
    }
  },
  key: stateKey,
  view: (view: EditorView) => {
    return {
      update: (view: EditorView, prevState: EditorState<any>) => {
        stateKey.getState(view.state).update(view.state, view.docView);
      }
    };
  },
  props: {
    handleClick(view: EditorView, event) {
      stateKey.getState(view.state).update(view.state, view.docView, true);
      return false;
    },
    onFocus(view: EditorView, event) {
      stateKey.getState(view.state).updateEditorFocused(true);
    },
    onBlur(view: EditorView, event) {
      const pluginState = stateKey.getState(view.state);
      pluginState.updateEditorFocused(false);
      pluginState.update(view.state, view.docView, true);
    },
  },
});

const plugins = (schema: Schema<any, any>) => {
  return [plugin];
};

export default plugins;
