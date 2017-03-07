import {
  EditorState,
  EditorView,
  Node,
  Plugin,
  PluginKey,
  NodeViewDesc,
} from '../../prosemirror';
import * as keymaps from '../keymaps';
import { bind as bindKeymap } from '../keymaps/buildKeymap';
import * as commands from '../../commands';

export type CodeBlockStateSubscriber = (state: CodeBlockState) => any;
export type StateChangeHandler = (state: CodeBlockState) => any;

export class CodeBlockState {
  element?: HTMLElement;
  language: string | undefined;
  clicked: boolean = false;

  private changeHandlers: CodeBlockStateSubscriber[] = [];
  private activeCodeBlock?: Node;
  private state: EditorState<any>;

  constructor(state: EditorState<any>) {
    this.changeHandlers = [];
    this.state = state;
  }

  subscribe(cb: CodeBlockStateSubscriber) {
    this.changeHandlers.push(cb);
    cb(this);
  }

  unsubscribe(cb: CodeBlockStateSubscriber) {
    this.changeHandlers = this.changeHandlers.filter(ch => ch !== cb);
  }

  updateLanguage(language: string| undefined, view: EditorView): void {
    if (this.activeCodeBlock) {
      commands.setBlockType(view.state.schema.nodes.codeBlock, { language: language })(view.state, view.dispatch);
    }
  }

  update(state: EditorState<any>, docView: NodeViewDesc, clicked: boolean = false) {
    this.state = state;
    const codeBlockNode = this.activeCodeBlockNode();

    if (clicked && codeBlockNode || codeBlockNode !== this.activeCodeBlock) {
      this.clicked = clicked;
      this.activeCodeBlock = codeBlockNode;
      this.language = codeBlockNode && codeBlockNode.attrs['language'] || undefined;
      this.element = codeBlockNode && this.activeCodeBlockElement(docView);
      this.triggerOnChange();
    }
  }

  private triggerOnChange() {
    this.changeHandlers.forEach(cb => cb(this));
  }

  private activeCodeBlockElement(docView: NodeViewDesc): HTMLElement {
    const offset = this.nodeStartPos();
    const { node } = docView.domFromPos(offset, 1);

    return node as HTMLElement;
  }

  private nodeStartPos(): number {
    const { $from } = this.state.selection;
    return $from.start($from.depth);
  }

  private activeCodeBlockNode(): Node | undefined {
    const { state } = this;
    const { $from } = state.selection;
    const node = $from.parent;
    if (node.type === state.schema.nodes.codeBlock) {
      return node;
    }

    return undefined;
  }
}
export const stateKey = new PluginKey('codeBlockPlugin');

bindKeymap(keymaps.splitCodeBlock.common, commands.newlineInCode);

const plugin = new Plugin({
  state: {
    init(config, state: EditorState<any>) {
      return new CodeBlockState(state);
    },
    apply(tr, pluginState: CodeBlockState, oldState, newState) {
      const stored = tr.getMeta(stateKey);
      if (stored) {
        pluginState.update(newState, stored.docView, stored.clicked);
      }
      return pluginState;
    }
  },
  key: stateKey,
  view: (editorView: EditorView) => {
    return {
      update: (view: EditorView, prevState: EditorState<any>) => {
        stateKey.getState(view.state).update(view.state, view.docView);
      }
    };
  },
  props: {
    handleClick(view, event) {
      view.dispatch(view.state.tr.setMeta(stateKey, { docView: view.docView, clicked: true }));
      return false;
    }
  }
});

export default plugin;
