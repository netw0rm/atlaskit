import {
  allInputRules,
  commands,
  DOMFromPos,
  inputRules,
  InputRule,
  NodeSelection,
  Plugin,
  ProseMirror,
  ResolvedPos,
  Mark,
  Node,
  Schema,
  TextSelection
} from 'ak-editor-prosemirror';
import { LinkMarkType } from 'ak-editor-schema';
import hyperlinkRule from './input-rule';
import pasteTransformer from './paste-transformer';

export type StateChangeHandler = (state: HyperlinkState) => void;

export class HyperlinkState {
  private changeHandlers: StateChangeHandler[] = [];
  private inputRules: InputRule[] = [];
  private pm: PM;

  // public state
  href?: string;
  text?: string;
  active = false;
  canAddLink = false;
  element?: HTMLElement;

  constructor(pm: PM) {
    this.pm = pm;

    pm.on.transformPasted.add(pasteTransformer.bind(pasteTransformer, pm));

    this.inputRules = [
      hyperlinkRule,
    ].concat(allInputRules);

    const rules = inputRules.ensure(pm);
    this.inputRules.forEach(rule => rules.addRule(rule));

    pm.updateScheduler([
      pm.on.selectionChange,
      pm.on.change,
      pm.on.activeMarkChange,
    ], () => this.update());

    this.update();
  }

  private updateElement() {
    const activeLink = this.getActiveLink();
    let dirty = false;

    const newElement = activeLink
      ? this.getDomElement()
      : undefined;
    if (newElement !== this.element) {
      this.element = newElement;
      dirty = true;
    }

    if (dirty) {
      this.changeHandlers.forEach(cb => cb(this));
    }
  }

  private update() {
    const activeNode = this.getActiveNode();
    const activeLink = this.getActiveLink();
    let dirty = false;

    const newHref = activeLink
      ? activeLink.attrs.href
      : undefined;
    if (newHref !== this.href) {
      this.href = newHref;
      dirty = true;
    }

    const newText = activeLink
      ? activeNode.textContent
      : undefined;
    if (newText !== this.text) {
      this.text = newText;
      dirty = true;
    }

    const newElement = activeLink
      ? this.getDomElement()
      : undefined;
    if (newElement !== this.element) {
      this.element = newElement;
      dirty = true;
    }

    const newActive = !!activeLink;
    if (newActive !== this.active) {
      this.active = newActive;
      dirty = true;
    }

    const newCanAddLink = !activeLink && this.isActiveNodeLinkable();
    if (newCanAddLink !== this.canAddLink) {
      this.canAddLink = newCanAddLink;
      dirty = true;
    }

    if (dirty) {
      this.changeHandlers.forEach(cb => cb(this));
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
        ? pm.tr.replaceWith($from.pos, $to.pos, pm.schema.text(href, mark))
        : pm.tr.addMark($from.pos, $to.pos, mark);

      tr.apply();
    }
  }

  removeLink(forceTextSelection = false) {
    const { pm } = this;
    const activeLink = this.getActiveLink();

    if (activeLink && pm.selection instanceof TextSelection) {
      const { $head, empty } = pm.selection;

      // why - 1?
      // because of `exclusiveRight`, we need to get the node "left to"
      // the current cursor
      const node = pm.doc.nodeAt($head.pos - 1);

      // start captures the start of the node position based on depth
      // why - 1 ?
      // we want to capture the start of the node instead of the inside of the node
      const path = pm.doc.resolve($head.pos - 1).path;

      // why + 1 ? (https://prosemirror.net/ref.html#ResolvedPos.depth)
      // depth positions are based on the parent not the node itself so we
      // need to go inside one level deeper
      const depth = $head.resolveDepth($head.depth + 1);

      // See `ResolvedPos.prototype.start` method prosemirror/src/model/resolvedpos
      const currentNodeOffset = depth == 0 ? 0 : path[depth * 3 - 1];

      const markerFrom = currentNodeOffset;
      const markerTo = markerFrom + node.nodeSize;

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
        const { $head } = pm.selection;
        const from = $head.start($head.depth);
        const to = $head.end($head.depth);
        pm.tr
          .removeMark(from, to, activeLink)
          .addMark(from, to, pm.schema.mark('link', { href: options.href }))
          .apply();
      }
    }
  }

  detach(pm: ProseMirror) {
    const rules = inputRules.ensure(pm);
    this.inputRules.forEach((rule: InputRule) => rules.removeRule(rule));
  }

  private getDomElement(): HTMLElement | undefined {
    if (this.pm.selection instanceof TextSelection) {
      const { $head } = this.pm.selection;
      const pos = getBoundariesWithin($head);
      const { node, offset } = DOMFromPos(this.pm, pos, true);

      if (node.childNodes.length === 0) {
        return node.parentNode;
      }

      return node.childNodes[offset];
    }
  }

  private isActiveNodeLinkable(): boolean {
    const { link } = this.pm.schema.marks;
    return !!link && commands.toggleMark(link)(this.pm, false);
  }

  private getActiveNode(): Node {
    const { pm } = this;
    if (pm.selection instanceof NodeSelection) {
      return pm.selection.node;
    } else {
      // why - 1?
      // because of `exclusiveRight`, we need to get the node "left to"
      // the current cursor
      return pm.doc.nodeAt(pm.selection.$head.pos - 1);
    }
  }

  private getActiveLink(): Mark | null {
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
      marks = pm.doc.nodeAt(pos - 1).marks;
    } else {
      const node = pm.doc.nodeAt(pos);
      const previousNode = pm.doc.nodeAt(pos - 1);

      if (node !== previousNode) {
        return null;
      }

      marks = node.marks;
    }

    return marks.find((mark: Mark) => mark.type.name === 'link');
  }
}

// IE11 + multiple prosemirror fix.
Object.defineProperty(HyperlinkState, 'name', { value: 'HyperlinkState' });

export default new Plugin(HyperlinkState);

interface S extends Schema {
  marks: {
    link?: LinkMarkType;
  }
}

interface PM extends ProseMirror {
  schema: S;
}

export interface HyperlinkOptions {
  href: string;
}

// We want to get the postion of the DOM element,
// when we are at the end of the Node we are no longer on the DOM element boundaries
// so we need to subtract 1
// when the parentOffset is 0 we dont need to subtract 1 since we are on the first element
// returns the position to be used on 'getDomElement' to get the corrent DOM node
function getBoundariesWithin(
  $head: ResolvedPos
) : number {
  return $head.parentOffset === 0 ? $head.pos : $head.pos -1;
}
