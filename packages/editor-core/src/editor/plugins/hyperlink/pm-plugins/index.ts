import {
  EditorState,
  EditorView,
  Schema,
  Mark,
  Node,
  Plugin,
  NodeViewDesc,
  Slice,
  Step,
  ReplaceStep,
  Transaction,
} from '../../../../prosemirror';
import * as commands from '../../../../commands';
import inputRulePlugin from './input-rule';
import keymapPlugin from './keymap';
import {
  Match, getLinkMatch,
  normalizeUrl, linkifyContent,
  getActiveLinkNodeInfo,
} from './utils';

import { addLink, escapeFromMark } from './commands';
import stateKey from './plugin-key';
export { stateKey };

export type HyperlinkStateSubscriber = (state: HyperlinkState) => any;
export type StateChangeHandler = (state: HyperlinkState) => any;
export interface HyperlinkOptions {
  href: string;
  text?: string;
}

export class HyperlinkState {
  // public state
  href?: string;
  text?: string;
  active = false;
  linkable = false;
  editorFocused = false;
  element?: HTMLElement;
  activeElement?: HTMLElement;
  showToolbarPanel = false;
  activeLinkNode?: Node;
  activeLinkMark?: Mark;
  activeLinkStartPos?: number;

  private changeHandlers: StateChangeHandler[] = [];
  private state: EditorState<any>;

  constructor(state: EditorState<any>) {
    this.changeHandlers = [];
  }

  subscribe(cb: HyperlinkStateSubscriber) {
    this.changeHandlers.push(cb);
    cb(this);
  }

  unsubscribe(cb: HyperlinkStateSubscriber) {
    this.changeHandlers = this.changeHandlers.filter(ch => ch !== cb);
  }

  update(state: EditorState<any>, docView: NodeViewDesc, dirty: boolean = false) {
    this.state = state;

    const nodeInfo = getActiveLinkNodeInfo(state);
    const canAddLink = this.isActiveNodeLinkable();

    if (canAddLink !== this.linkable) {
      this.linkable = canAddLink;
      dirty = true;
    }

    if ((nodeInfo && nodeInfo.node) !== this.activeLinkNode) {
      this.activeLinkNode = nodeInfo && nodeInfo.node;
      this.activeLinkStartPos = nodeInfo && nodeInfo.startPos;
      this.activeLinkMark = nodeInfo && this.getActiveLinkMark(nodeInfo.node);
      this.text = nodeInfo && nodeInfo.node.textContent;
      this.href = this.activeLinkMark && this.activeLinkMark.attrs.href;
      this.active = !!nodeInfo;
      dirty = true;
    }
    this.element = this.getDomElement(docView);
    this.activeElement = this.getActiveDomElement(state.selection, docView);

    if (dirty) {
      this.triggerOnChange();
    }
  }
  showLinkPanel(editorView: EditorView) {
    if (!(this.showToolbarPanel || editorView.hasFocus())) {
      editorView.focus();
    }
    const { selection } = editorView.state;
    if (selection.empty && !this.active) {
      this.showToolbarPanel = !this.showToolbarPanel;
      this.changeHandlers.forEach(cb => cb(this));
    } else {
      addLink({ href: '' }, this.linkable, this.active)(editorView.state, editorView.dispatch);
      this.update(editorView.state, editorView.docView);
    }
  }

  hideLinkPanel() {
    this.showToolbarPanel = false;
    this.changeHandlers.forEach(cb => cb(this));
  }

  private triggerOnChange() {
    this.changeHandlers.forEach(cb => cb(this));
  }

  private getActiveLinkMark(activeLinkNode: Node): Mark | undefined {
    const linkMarks = activeLinkNode.marks.filter((mark) => {
      return mark.type === this.state.schema.marks.link;
    });

    return (linkMarks as Mark[])[0];
  }

  private getDomElement(docView: NodeViewDesc): HTMLElement | undefined {
    if (this.activeLinkStartPos) {
      const { node, offset } = docView.domFromPos(this.activeLinkStartPos);

      if (node.childNodes.length === 0) {
        return node.parentNode as HTMLElement;
      }

      return node.childNodes[offset] as HTMLElement;
    }
  }

  /**
   * Returns active dom element for current selection.
   * Used by Hyperlink edit popup to position relative to cursor.
   */
  private getActiveDomElement(selection, docView: NodeViewDesc): HTMLElement | undefined {
    if (selection.$from.pos !== selection.$to.pos) {
      return;
    }

    const { node } = docView.domFromPos(selection.$from.pos);

    return node as HTMLElement;
  }

  private isActiveNodeLinkable(): boolean {
    const { link } = this.state.schema.marks;
    return !!link && commands.toggleMark(link)(this.state);
  }
}

function isReplaceStep(step?: Step): step is ReplaceStep {
  return !!step && step instanceof ReplaceStep;
}

const hasLinkMark = (schema: any, node?: Node) => node && schema.marks.link.isInSet(node.marks) as Mark | null;

function updateLinkOnChange(
  transactions: Transaction[], oldState: EditorState<any>, newState: EditorState<any>
): Transaction | undefined {
  if (!transactions) {
    return;
  }

  if (transactions.some(tr => tr.steps.some(isReplaceStep))) {
    const { schema } = newState;

    const { nodeAfter: oldNodeAfter, nodeBefore: oldNodeBefore } = oldState.selection.$from;
    const oldLinkMarkAfter = hasLinkMark(schema, oldNodeAfter);
    const oldLinkMarkBefore = hasLinkMark(schema, oldNodeBefore);

    const { $from } = newState.selection;
    const { nodeAfter: newNodeAfter, nodeBefore: newNodeBefore } = $from;
    const newLinkMarkAfter = hasLinkMark(schema, newNodeAfter);
    const newLinkMarkBefore = hasLinkMark(schema, newNodeBefore);

    if (!(oldNodeBefore && oldLinkMarkBefore && newNodeBefore && newLinkMarkBefore)) {
      return;
    }

    let href;
    let end = $from.pos;
    const start = end - newNodeBefore.nodeSize;

    if (
      oldNodeAfter && oldLinkMarkAfter &&
      oldLinkMarkBefore.attrs.href === normalizeUrl(`${oldNodeBefore.text}${oldNodeAfter.text}`)
    ) {
      if (newNodeAfter && newLinkMarkAfter) {
        // Middle of a link https://goo<|>gle.com/
        end += newNodeAfter.nodeSize;
        href = `${newNodeBefore.text}${newNodeAfter.text}`;
      } else {
        // Replace end of a link https://goo<|gle.com/|>
        href = newNodeBefore.text;
      }
    } else if (oldLinkMarkBefore.attrs.href === normalizeUrl(oldNodeBefore.text || '')) {
      // End of a link https://google.com/<|>
      if (newNodeBefore.text !== oldNodeBefore.text) {
        href = newNodeBefore.text;
      }
    }

    const match: Match | null = getLinkMatch(href);
    if (match || /^[a-z]+:\/\//i.test(href)) {
      const tr = newState.tr.removeMark(start, end, schema.marks.link);
      if (match) {
        const markType = schema.mark('link', { href: match.url });
        tr.addMark(start, end, markType);
      }
      return tr;
    }
  }
}

export const plugin = new Plugin({
  props: {
    handleTextInput(view: EditorView, from: number, to: number, text: string) {
      escapeFromMark()(view.state, view.dispatch);
      return false;
    },
    handleClick(view: EditorView) {
      const pluginState = stateKey.getState(view.state);
      if (pluginState.active) {
        pluginState.changeHandlers.forEach(cb => cb(pluginState));
      }
      return false;
    },
    onBlur(view: EditorView) {
      const pluginState = stateKey.getState(view.state);

      pluginState.editorFocused = false;
      if (pluginState.active) {
        pluginState.changeHandlers.forEach(cb => cb(pluginState));
      }

      return true;
    },
    onFocus(view: EditorView) {
      const pluginState = stateKey.getState(view.state);
      pluginState.editorFocused = true;

      return true;
    },
    /**
     * As we are adding linkifyContent, linkifyText can in fact be removed.
     * But leaving it there so that later it can be enhanced to include markdown parsing.
     */
    handlePaste(view: EditorView, event: any, slice: Slice) {
      const { clipboardData } = event;
      const html = clipboardData && clipboardData.getData('text/html');
      if (html) {
        const contentSlices = linkifyContent(view.state.schema, slice);
        if (contentSlices) {
          const { dispatch, state: { tr } } = view;
          dispatch(tr.replaceSelection(contentSlices));
          return true;
        }
      }
      return false;
    }
  },
  state: {
    init(config, state: EditorState<any>) {
      return new HyperlinkState(state);
    },
    apply(tr, pluginState: HyperlinkState, oldState, newState) {
      return pluginState;
    }
  },
  key: stateKey,
  view: (view: EditorView) => {
    const pluginState = stateKey.getState(view.state);
    pluginState.update(view.state, view.docView, true);

    return {
      update: (view: EditorView, prevState: EditorState<any>) => {
        pluginState.update(view.state, view.docView);
      }
    };
  },
  appendTransaction: (transactions, oldState, newState) => {
    return updateLinkOnChange(transactions, oldState, newState);
  },
});

const plugins = (schema: Schema<any, any>) => {
  return [plugin, inputRulePlugin(schema), keymapPlugin(schema)].filter((plugin) => !!plugin) as Plugin[];
};

export default plugins;
