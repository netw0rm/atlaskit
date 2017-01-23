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

    this.update();
  }

  private update() {
    const nodeInfo = this.getActiveLinkNodeInfo();
    let dirty = false;

    if ((nodeInfo && nodeInfo.node) !== this.activeLinkNode) {
      this.activeLinkNode = nodeInfo && nodeInfo.node;
      this.activeLinkStartPos = nodeInfo && nodeInfo.startPos;
      this.text = nodeInfo && nodeInfo.node.textContent;
      this.activeLinkMark = nodeInfo && this.getActiveLinkMark(nodeInfo.node);
      this.href = this.activeLinkMark && this.activeLinkMark.attrs.href;
      this.element = this.getDomElement();
      this.active = !!nodeInfo;
      dirty = true;
    }

    const newCanAddLink = !this.activeLinkNode && this.isActiveNodeLinkable();
    if (newCanAddLink !== this.canAddLink) {
      this.canAddLink = newCanAddLink;
      dirty = true;
    }

    if (dirty) {
      this.changeHandlers.forEach(cb => cb(this));
    }
  }

  private getActiveLinkMark(activeLinkNode: Node): LinkMark | undefined {
    const linkMarks = activeLinkNode.marks.filter((mark) => {
      return mark.type instanceof LinkMarkType;
    });

    return (linkMarks as LinkMark[])[0];
  }

  private getActiveLinkNodeInfo(): { node: Node, startPos: number } | undefined {
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

  getActiveMarkRange(): { markerFrom: number, markerTo: number } {
    const { pm } = this;

    if (pm.selection instanceof TextSelection) {
      const { $head } = pm.selection;

      // why - 1?
      // because of `exclusiveRight`, we need to get the node "left to"
      // the current cursor
      const node = pm.doc.nodeAt($head.pos - 1) !;

      // start captures the start of the node position based on depth
      // why - 1 ?
      // we want to capture the start of the node instead of the inside of the node
      const path = (pm.doc.resolve($head.pos - 1) as any).path as number[];

      // why + 1 ? (https://prosemirror.net/ref.html#ResolvedPos.depth)
      // depth positions are based on the parent not the node itself so we
      // need to go inside one level deeper
      const depth = ($head as any).resolveDepth($head.depth + 1) as number;

      // See `ResolvedPos.prototype.start` method prosemirror/src/model/resolvedpos
      const currentNodeOffset = depth === 0 ? 0 : path[depth * 3 - 1];

      const markerFrom = currentNodeOffset;
      const markerTo = markerFrom + node.nodeSize;

      return {
        markerFrom,
        markerTo
      };
    }

    return {
      markerFrom: 1,
      markerTo: 1
    };
  }

  removeLink(forceTextSelection = false) {
    const { pm } = this;
    const activeLink = this.getActiveLink();

    if (activeLink && pm.selection instanceof TextSelection) {
      const { markerFrom, markerTo } = this.getActiveMarkRange();

      pm.tr.removeMark(markerFrom, markerTo, activeLink).apply();

      if (forceTextSelection) {
        pm.setTextSelection(markerFrom, markerTo);
        pm.focus();
      }
    }
  }

  updateLink(options: HyperlinkOptions) {
    const activeLink = this.getActiveLink();
    if (activeLink) {
      const { pm } = this;
      if (pm.selection instanceof TextSelection) {
        const { markerFrom, markerTo } = this.getActiveMarkRange();
        pm.tr
          .removeMark(markerFrom, markerTo, activeLink)
          .addMark(markerFrom, markerTo, pm.schema.mark('link', { href: options.href }))
          .apply();
      }
    }
  }

  detach(pm: ProseMirror) {
    const rules = inputRules.ensure(pm);
    this.inputRules.forEach((rule: InputRule) => rules.removeRule(rule));
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

  private getActiveLink(): LinkMark | null {
    const { pm } = this;

    if (!(pm.selection instanceof TextSelection)) {
      return null;
    }

    const { $head, empty } = pm.selection;
    const pos = $head.pos;

    let marks;
    if (!empty) {
      // because of `exclusiveRight`, we need to get the node "left to"
      // the current cursor
      marks = pm.doc.nodeAt(pos - 1) !.marks;
    } else {
      const node = pm.doc.nodeAt(pos) !;
      const previousNode = pm.doc.nodeAt(pos - 1);

      if (node !== previousNode) {
        return null;
      }

      marks = node.marks;
    }

    for (let i = 0; i < marks.length; i++) {
      if (marks[i].type.name === 'link') {
        return marks[i];
      }
    }

    return null;
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
