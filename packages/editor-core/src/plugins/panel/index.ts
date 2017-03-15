import { analyticsService } from '../../analytics';
import {
  EditorState,
  PluginKey,
  EditorView,
  NodeViewDesc,
  TextSelection,
  Plugin,
  Node,
} from '../../prosemirror';
import { liftAndSelectSiblingNodes, liftSiblingNodes } from '../../utils';

export interface PanelType {
  panelType: 'info' | 'note' | 'tip' | 'warning';
}

export const availablePanelType = [
  { panelType: 'info' },
  { panelType: 'note' },
  { panelType: 'tip' },
  { panelType: 'warning' }
];

export class PanelState {
  private state: EditorState<any>;
  private editorFocused: boolean = false;
  private activeNode: Node | undefined;
  private changeHandlers: PanelStateSubscriber[] = [];

  element?: HTMLElement | undefined;
  activePanelType?: string | undefined;
  toolbarVisible?: boolean | undefined;

  constructor(state: EditorState<any>) {
    this.changeHandlers = [];
    this.state = state;
  }

  updateEditorFocused(editorFocused: boolean) {
    this.editorFocused = editorFocused;
  }

  // changePanelType(panelType: PanelType) {
  //   analyticsService.trackEvent(`atlassian.editor.format.${panelType}.button`);
  //   const { pm } = this;
  //   const { nodes } = pm.schema;
  //   const { from, to } = pm.selection;
  //   const tr = liftAndSelectSiblingNodes(pm).applyAndScroll();
  //   commands.wrapIn(nodes.panel as PanelNodeType, panelType)(pm);
  //   const originalStartPos = tr.map(from) + 1;
  //   const originalEndPos = tr.map(to) + 1;
  //   pm.setSelection(new TextSelection(pm.doc.resolve(originalStartPos), pm.doc.resolve(originalEndPos)));
  // }

  removePanelType(view: EditorView) {
    liftSiblingNodes(view);
  }

  // checkEndPanelBlock(): boolean {
  //   const { pm } = this;
  //   const { $from, $to } = pm.selection;
  //   const range = $from.blockRange($to);
  //   const node = range && range.parent;
  //   if (node) {
  //     if (isPanelNode(node) && this.lastCharIsNewline(node)) {
  //       pm.tr.delete($from.pos - 1, $from.pos).applyAndScroll();
  //     } else if (!node.textContent) {
  //       pm.tr.typeText('\n').applyAndScroll();
  //     }
  //   }
  //   return false;
  // }

  subscribe(cb: PanelStateSubscriber) {
    this.changeHandlers.push(cb);
    cb(this);
  }

  unsubscribe(cb: PanelStateSubscriber) {
    this.changeHandlers = this.changeHandlers.filter(ch => ch !== cb);
  }

  update(state: EditorState<any>, docView: NodeViewDesc, domEvent: boolean = false) {
    this.state = state;
    const newPanel = this.getActivePanel(docView);
    if ((domEvent && newPanel) || this.activeNode !== newPanel) {
      const newElement = newPanel && this.getDomElement(docView);
      this.activeNode = newPanel;
      this.toolbarVisible = this.editorFocused && !!newPanel && (domEvent || this.element !== newElement);
      this.element = newElement;
      this.activePanelType = newPanel && newPanel.attrs['panelType'];
      this.changeHandlers.forEach(cb => cb(this));
    }
  }

  private getActivePanel(docView: NodeViewDesc): Node | undefined {
    const { state } = this;
    if (state.selection instanceof TextSelection) {
      const { $from } = state.selection;
      const node = $from.node(1);
      if (node.type === state.schema.nodes.panel) {
        return node;
      }
    }
  }

  private getDomElement(docView: NodeViewDesc): HTMLElement | undefined {
    const { state } = this;
    if (state.selection instanceof TextSelection) {
      const { node } = docView.domFromPos(1);
      let currentNode = node;
      while (currentNode) {
        if (currentNode.attributes && currentNode.attributes['data-panel-type']) {
          return currentNode as HTMLElement;
        }
        currentNode = currentNode.parentNode!;
      }
    }
  }

  // private lastCharIsNewline(node: PanelNode): boolean {
  //   if (node && node.textContent) {
  //     return node.textContent.slice(-1) === '\n';
  //   }
  //   return false;
  // }
}

export type PanelStateSubscriber = (state: PanelState) => any;

export const stateKey = new PluginKey('panelPlugin');

const plugin = new Plugin({
  state: {
    init(config, state: EditorState<any>) {
      return new PanelState(state);
    },
    apply(tr, pluginState: PanelState, oldState, newState) {
      const stored = tr.getMeta(stateKey);
      if (stored) {
        pluginState.update(newState, stored.docView, stored.clicked);
      }
      return pluginState;
    }
  },
  key: stateKey,
  view: (editorView: EditorView) => {
    // reconfigure(view, [keymapPlugin(view.state.schema), inputRulePlugin(view.state.schema)]);
    return {
      update: (view: EditorView, prevState: EditorState<any>) => {
        stateKey.getState(view.state).update(view.state, view.docView);
      }
    };
  },
  props: {
    handleClick(view: EditorView, event) {
      view.dispatch(view.state.tr.setMeta(stateKey, { docView: view.docView, domEvent: true }));
      return false;
    },
    onFocus(view: EditorView, event) {
      stateKey.getState(view.state).updateEditorFocused(true);
    },
    onBlur(view: EditorView, event) {
      stateKey.getState(view.state).updateEditorFocused(false);
      view.dispatch(view.state.tr.setMeta(stateKey, { docView: view.docView, domEvent: true }));
    },
  },
});

export default plugin;

// add key-maps
// add input-rules
