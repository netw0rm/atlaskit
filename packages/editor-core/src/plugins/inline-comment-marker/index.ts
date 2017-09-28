import {
  EditorState,
  EditorView,
  Mark,
  Node,
  Plugin,
  NodeViewDesc,
  Schema,
  TextSelection,
} from '../../prosemirror';
import keymapPlugin from './keymap';
import { EditorProps } from '../../editor/types/editor-props';

import stateKey from './plugin-key';
export { stateKey };

export type InlineCommentMarkerStateSubscriber = (state: InlineCommentMarkerState) => any;
export type StateChangeHandler = (state: InlineCommentMarkerState) => any;
interface NodeInfo {
  node: Node;
  startPos: number;
}

export class InlineCommentMarkerState {
  // public state
  activeID?: string;
  editorFocused: boolean = false;

  private changeHandlers: StateChangeHandler[] = [];
  private state: EditorState<any>;

  constructor(state: EditorState<any>) {
    this.changeHandlers = [];
    this.state = state;
  }

  subscribe(cb: InlineCommentMarkerStateSubscriber) {
    this.changeHandlers.push(cb);
    cb(this);
  }

  unsubscribe(cb: InlineCommentMarkerStateSubscriber) {
    this.changeHandlers = this.changeHandlers.filter(ch => ch !== cb);
  }

  notifySubscribers() {
    this.changeHandlers.forEach(cb => cb(this));
  }

  update(state: EditorState<any>, docView: NodeViewDesc, dirty: boolean = false) {
    this.state = state;

    const nodeInfo = this.getActiveNodeInfo();
    const activeMark = nodeInfo && this.getActiveMark(nodeInfo.node);
    const activeID = activeMark && activeMark.attrs.reference;
    const hasChanged = activeID !== this.activeID;

    this.activeID = activeID;

    if (hasChanged) {
      this.notifySubscribers();
    }
  }

  escapeFromMark(editorView: EditorView) {
    const nodeInfo = this.getActiveNodeInfo();
    const shouldEscape = this.shouldEscapeFromMark(nodeInfo);
    if (nodeInfo && shouldEscape) {
      // what should we do here?
    }
  }

  private shouldEscapeFromMark(nodeInfo: NodeInfo | undefined) {
    const parentOffset = this.state.selection.$from.parentOffset;
    return nodeInfo && parentOffset === 1 && nodeInfo.node.nodeSize > parentOffset;
  }

  private getActiveMark(activeNode: Node): Mark | undefined {
    const marks = activeNode.marks.filter((mark) => {
      return mark.type === this.state.schema.marks.inlineCommentMarker;
    });

    return (marks as Mark[])[0];
  }

  private getActiveNodeInfo(): NodeInfo | undefined {
    const { state } = this;
    const { inlineCommentMarker } = state.schema.marks;
    const { $from, empty } = state.selection as TextSelection;

    if (inlineCommentMarker && $from) {
      const { node, offset } = $from.parent.childAfter($from.parentOffset);
      const parentNodeStartPos = $from.start($from.depth);

      // offset is the end position of previous node
      // This is to check whether the cursor is at the beginning of current node
      if (empty && offset + 1 === $from.pos) {
        return;
      }

      if (node && node.isText && inlineCommentMarker.isInSet(node.marks)) {
        return {
          node,
          startPos: parentNodeStartPos + offset
        };
      }
    }
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
      if (pluginState.activeID) {
        pluginState.notifySubscribers();
      }
      return false;
    },
    onBlur(view: EditorView) {
      const pluginState: InlineCommentMarkerState = stateKey.getState(view.state);
      pluginState.editorFocused = false;
      if (pluginState.activeID) {
        pluginState.notifySubscribers();
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
});

const plugins = (schema: Schema<any, any>, props: EditorProps = {}) => {
  return [createPlugin(schema, props), keymapPlugin(schema, props)].filter((plugin) => !!plugin) as Plugin[];
};

export default plugins;
