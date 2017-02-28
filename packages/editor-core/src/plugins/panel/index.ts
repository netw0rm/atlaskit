import Keymap from 'browserkeymap';
import { analyticsService } from '../../analytics';
import {
  commands,
  DOMFromPos,
  InputRule,
  inputRules,
  Plugin,
  ProseMirror,
  Schema,
  TextSelection
} from '../../prosemirror';
import { isPanelNode, PanelNode, PanelNodeType, ParagraphNodeType } from '../../schema';
import { liftAndSelectSiblingNodes, liftSiblingNodes } from '../../utils';
import panelRules from './input-rules';

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
  private pm: PM;
  private editorFocused: boolean = false;
  private activeNode: PanelNode | undefined;
  private changeHandlers: PanelStateSubscriber[] = [];
  private inputRules: InputRule[] = [];

  toolbarVisible: boolean = false;
  element?: HTMLElement | undefined;
  activePanelType?: string | undefined;

  constructor(pm: PM) {
    this.pm = pm;

    this.inputRules = panelRules;
    const rules = inputRules.ensure(pm);
    this.inputRules.forEach(rule => rules.addRule(rule));

    pm.addKeymap(new Keymap({
      'Enter': () => this.checkEndPanelBlock(),
    }));

    pm.updateScheduler([
      pm.on.selectionChange,
      pm.on.change,
    ], () => this.update());

    pm.on.click.add(() => {
      this.update(true);
    });

    pm.on.focus.add(() => {
      this.editorFocused = true;
    });

    pm.on.blur.add(() => {
      this.editorFocused = false;
      this.update(true);
    });

    this.update();
  }

  changePanelType(panelType: PanelType) {
    analyticsService.trackEvent(`atlassian.editor.format.${panelType}.button`);
    const { pm } = this;
    const { nodes } = pm.schema;
    const { from, to } = pm.selection;
    const tr = liftAndSelectSiblingNodes(pm).applyAndScroll();
    commands.wrapIn(nodes.panel as PanelNodeType, panelType)(pm);
    const originalStartPos = tr.map(from) + 1;
    const originalEndPos = tr.map(to) + 1;
    pm.setSelection(new TextSelection(pm.doc.resolve(originalStartPos), pm.doc.resolve(originalEndPos)));
  }

  removePanelType() {
    const { pm } = this;
    liftSiblingNodes(pm).applyAndScroll();
  }

  checkEndPanelBlock(): boolean {
    const { pm } = this;
    const { $from, $to } = pm.selection;
    const range = $from.blockRange($to);
    const node = range && range.parent;
    if (node) {
      if (isPanelNode(node) && this.lastCharIsNewline(node)) {
        pm.tr.delete($from.pos - 1, $from.pos).applyAndScroll();
      } else if (!node.textContent) {
        pm.tr.typeText('\n').applyAndScroll();
      }
    }
    return false;
  }

  subscribe(cb: PanelStateSubscriber) {
    this.changeHandlers.push(cb);
    cb(this);
  }

  unsubscribe(cb: PanelStateSubscriber) {
    this.changeHandlers = this.changeHandlers.filter(ch => ch !== cb);
  }

  private update(domEvent = false) {
    const newPanel = this.getActivePanel();
    if ((domEvent && newPanel) || this.activeNode !== newPanel) {
      const newElement = newPanel && this.getDomElement();
      this.activeNode = newPanel;
      this.toolbarVisible = this.editorFocused && !!newPanel && (domEvent || this.element !== newElement);
      this.element = newElement;
      this.activePanelType = newPanel && newPanel.attrs['panelType'];
      this.changeHandlers.forEach(cb => cb(this));
    }
  }

  private getActivePanel(): PanelNode | undefined {
    if (this.pm.selection instanceof TextSelection) {
      const { $from } = this.pm.selection;
      const node = $from.node(1);
      if (isPanelNode(node)) {
        return node;
      }
    }
  }

  private getDomElement(): HTMLElement | undefined {
    if (this.pm.selection instanceof TextSelection) {
      const { $from } = this.pm.selection;
      const { node } = DOMFromPos(this.pm, $from.start(1), true);
      let currentNode: Node | null;
      currentNode = node;
      while (currentNode) {
        if (currentNode.attributes && currentNode.attributes['data-panel-type']) {
          return currentNode as HTMLElement;
        }
        currentNode = currentNode.parentNode;
      }
    }
  }

  private lastCharIsNewline(node: PanelNode): boolean {
    if (node && node.textContent) {
      return node.textContent.slice(-1) === '\n';
    }
    return false;
  }
}

export interface S extends Schema {
  nodes: {
    paragraph?: ParagraphNodeType;
    panel?: PanelNodeType;
  };
}

export interface PM extends ProseMirror {
  schema: S;
}

export type PanelStateSubscriber = (state: PanelState) => any;

Object.defineProperty(PanelState, 'name', { value: 'PanelState' });

export default new Plugin(PanelState);
