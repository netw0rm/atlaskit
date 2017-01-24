import {
  commands,
  DOMFromPos,
  InputRule,
  inputRules,
  Node,
  Plugin,
  ProseMirror,
  Schema,
  TextSelection
} from '../../prosemirror';
import { LinkMark, LinkMarkType } from '../../schema';
import hyperlinkRule from './input-rule';
import pasteTransformer from './paste-transformer';

export type StateChangeHandler = (state: HyperlinkState) => void;

export class HyperlinkState {
  // public state
  href?: string;
  text?: string;
  active = false;
  canAddLink = false;
  element?: HTMLElement;

  private changeHandlers: StateChangeHandler[] = [];
  private inputRules: InputRule[] = [];
  private pm: PM;
  private activeLinkNode?: Node;
  private activeLinkMark?: LinkMark;
  private activeLinkStartPos?: number;

  constructor(pm: PM) {
    this.pm = pm;

    pm.on.transformPasted.add(pasteTransformer.bind(pasteTransformer, pm));

    this.inputRules = [hyperlinkRule];

    const rules = inputRules.ensure(pm);
    this.inputRules.forEach(rule => rules.addRule(rule));

    pm.updateScheduler([
      pm.on.selectionChange,
      pm.on.change,
      pm.on.activeMarkChange,
    ], () => this.update());

    this.setup(this.getActiveLinkNodeInfo());
  }

  subscribe(cb: StateChangeHandler) {
    this.changeHandlers.push(cb);
    cb(this);
  }

  unsubscribe(cb: StateChangeHandler) {
    this.changeHandlers = this.changeHandlers.filter(ch => ch !== cb);
  }

  addLink(options: HyperlinkOptions) {
    if (this.canAddLink) {
      const { pm } = this;
      const { href } = options;
      const { empty, $from, $to } = pm.selection;
      const mark = pm.schema.mark('link', { href });
      const tr = empty
        ? pm.tr.replaceWith($from.pos, $to.pos, pm.schema.text(href, [mark]))
        : pm.tr.addMark($from.pos, $to.pos, mark);

      tr.apply();
    }
  }

  removeLink(forceTextSelection = false) {
    if (this.activeLinkStartPos) {
      const { pm } = this;
      const from = this.activeLinkStartPos;
      const to = this.activeLinkStartPos + this.text!.length;
      pm.tr.removeMark(from, to, this.activeLinkMark).apply();

      if (forceTextSelection) {
        pm.setTextSelection(from, to);
        pm.focus();
      }
    }
  }

  updateLink(options: HyperlinkOptions) {
    if (this.activeLinkStartPos) {
      const { pm } = this;
      const from = this.activeLinkStartPos;
      const to = this.activeLinkStartPos + this.text!.length;
      pm.tr
        .removeMark(from, to, this.activeLinkMark)
        .addMark(from, to, pm.schema.mark('link', { href: options.href }))
        .apply();
    }
  }

  detach(pm: ProseMirror) {
    const rules = inputRules.ensure(pm);
    this.inputRules.forEach((rule: InputRule) => rules.removeRule(rule));
  }

  private update() {
    const nodeInfo = this.getActiveLinkNodeInfo();
    let dirty = false;

    if ((nodeInfo && nodeInfo.node) !== this.activeLinkNode) {
      this.setup(nodeInfo);
      dirty = true;
    }

    if (dirty) {
      this.changeHandlers.forEach(cb => cb(this));
    }
  }

  private setup(nodeInfo: NodeInfo | undefined): void {
    this.activeLinkNode = nodeInfo && nodeInfo.node;
    this.activeLinkStartPos = nodeInfo && nodeInfo.startPos;
    this.activeLinkMark = nodeInfo && this.getActiveLinkMark(nodeInfo.node);
    this.text = nodeInfo && nodeInfo.node.textContent;
    this.href = this.activeLinkMark && this.activeLinkMark.attrs.href;
    this.element = this.getDomElement();
    this.active = !!nodeInfo;
    this.canAddLink = !this.active && this.isActiveNodeLinkable();
  }

  private getActiveLinkNodeInfo(): NodeInfo| undefined {
    const {pm} = this;
    const {link} = pm.schema.marks;
    const {$from, empty} = pm.selection as TextSelection;

    if (link && $from) {
      const {node, offset} = $from.parent.childAfter($from.parentOffset);

      // offset is the end postion of previous node
      // This is to check whether the cursor is at the beginning of current node
      if (empty && offset + 1 === $from.pos) {
        return;
      }

      if (node && node.isText && link.isInSet(node.marks)) {
        return { node: node, startPos: offset + 1 };
      }
    }
  }

  private getActiveLinkMark(activeLinkNode: Node): LinkMark | undefined {
    const linkMarks = activeLinkNode.marks.filter((mark) => {
      return mark.type instanceof LinkMarkType;
    });

    return (linkMarks as LinkMark[])[0];
  }

  private getDomElement(): HTMLElement | undefined {
    if (this.activeLinkStartPos) {
      const { node, offset } = DOMFromPos(this.pm, this.activeLinkStartPos, true);

      if (node.childNodes.length === 0) {
        return node.parentNode as HTMLElement;
      }

      return node.childNodes[offset] as HTMLElement;
    }
  }

  private isActiveNodeLinkable(): boolean {
    const { link } = this.pm.schema.marks;
    return !!link && commands.toggleMark(link)(this.pm, false);
  }
}

// IE11 + multiple prosemirror fix.
Object.defineProperty(HyperlinkState, 'name', { value: 'HyperlinkState' });

export default new Plugin(HyperlinkState);

export interface S extends Schema {
  marks: {
    link?: LinkMarkType;
  };
}

export interface PM extends ProseMirror {
  schema: S;
}

export interface HyperlinkOptions {
  href: string;
}

interface NodeInfo {
  node: Node;
  startPos: number;
}
