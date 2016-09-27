import {
  Plugin, ProseMirror, ResolvedPos, Node, Mark, inputRules, InputRule,
  allInputRules, DOMFromPos as getDomElementFromPosition
} from 'ak-editor-prosemirror';
import hyperLinkRule from './input-rule';
import pasteTransformer from './paste-transformer';

export interface HyperLinkOptions {
  href?: string;
  rel?: string;
  target?: '_self' | '_blank' | '_parent' | '_top' | '';
  text?: string;
  title?: string;
}

export interface HyperLinkState extends HyperLinkOptions {
  active?: boolean;
  enabled?: boolean;
  element?: HTMLElement | null;
}

export type StateChangeHandler = (state: HyperLinkState) => any;

export const DISABLED_GROUP = 'unlinkable';

const DEFAULT_STATE: HyperLinkState = {
  active: false,
  enabled: false,
  element: null,
  href: '',
  rel: '',
  target: '',
  text: '',
  title: '',
};

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

function getDomElement(
  pm: ProseMirror,
  pos: number
) : HTMLElement {
  const {
    node,
    offset,
  } = getDomElementFromPosition(pm, pos, true);

  if (node.childNodes.length === 0) {
    return node.parentNode;
  }

  return node.childNodes[offset];
}

function isNodeLinkable(pm: ProseMirror, node: Node): boolean {
  const nodeType = node.type.name;
  const nodeSpecOrderedMap = pm.schema.nodeSpec;
  return nodeSpecOrderedMap.get(nodeType).group.split(' ').indexOf(DISABLED_GROUP) === -1;
}

function isCursorOnLink(
  proseMirrorInstance: ProseMirror,
  pos: number
) : Mark {
  const marks = proseMirrorInstance.doc.marksAt(pos);
  return marks.reduce(
    (found: boolean, m: Mark) => found || (m.type.name === 'link' && m),
    null
  );
}

function isShallowObjectEqual(
  oldObject: HyperLinkState,
  newObject: HyperLinkState
) : boolean {
  return JSON.stringify(oldObject) === JSON.stringify(newObject);
}

export default new Plugin(class HyperlinkPlugin {
  changeHandlers: StateChangeHandler[];
  inputRules: InputRule[];
  pm: ProseMirror;
  state: HyperLinkState;

  constructor(pm: ProseMirror) {
    this.pm = pm;
    this.state = DEFAULT_STATE;
    this.changeHandlers = [];

    // add paste handler
    pm.on.transformPasted.add(pasteTransformer.bind(pasteTransformer, pm));

    this.inputRules = [
      hyperLinkRule,
    ].concat(allInputRules);

    const rules = inputRules.ensure(pm);
    this.inputRules.forEach(rule => rules.addRule(rule));

    pm.updateScheduler([
      pm.on.selectionChange,
      pm.on.change,
      pm.on.activeMarkChange,
    ], () => this.__update__());
  }

  // When typescript spread operator is implemented we can remove this boiler
  // plate in favour of spread assignment
  getState(): HyperLinkState {
    return Object.assign({}, this.state);
  }

  // When typescript spread operator is implemented we can remove this boiler
  // plate in favour of spread assignment
  setState(...newState: HyperLinkState[]) : HyperLinkState {
    this.state = Object.assign.apply(
      Object,
      [
        {},
        DEFAULT_STATE,
      ].concat(newState)
    );
    return this.state;
  }

  __update__() {
    const pm = this.pm;
    const {
      $head,
      $to,
      empty
    } = pm.selection;
    const oldState = this.getState();

    const $resolvedPos: ResolvedPos = $head || $to;

    // because $resolvedPos.pos - 1 is actually the correct position
    const activeNode: Node = pm.doc.nodeAt($resolvedPos.pos - 1);
    const isLink = isCursorOnLink(pm, $resolvedPos.pos);

    if (isLink && activeNode) {
      this.setState(isLink.attrs, {
        active: true,
        element: getDomElement(pm, getBoundariesWithin($head)),
        text: activeNode.textContent,
      });
    } else if (
      empty ||
      !(activeNode ? isNodeLinkable(pm, activeNode) : oldState.enabled)
    ) {
      this.setState(
        {
          enabled: false,
        }
      );
    } else {
      this.setState();
    }

    if (!isShallowObjectEqual(oldState, this.state)) {
      this.changeHandlers.every(cb => cb(this.getState()));
    }
  }

  subscribe(cb: StateChangeHandler) {
    this.changeHandlers.push(cb);
    cb(this.getState());
  }

  addLink(options: HyperLinkOptions) : boolean {
    const pm = this.pm;
    const selection = pm.selection;
    const {
      empty,
      $from,
      $to,
      $head,
    } = selection;

    const $resolvedPos: ResolvedPos = $head || $to;

    const isLink = isCursorOnLink(pm, $resolvedPos.pos);

    const { enabled } = this.getState();

    if (!enabled || empty || isLink) {
      return false;
    }

    const mark: Mark = pm.schema.mark('link', options);

    if (options.text) {
      pm.tr.replaceWith($from.pos, $to.pos, pm.schema.text(options.text, mark)).apply();
    } else {
      pm.tr.addMark($from.pos, $to.pos, mark).apply();
    }

    return true;
  }

  removeLink(forceTextSelection = false) : boolean {
    const pm = this.pm;
    const selection = pm.selection;
    const {
      $anchor,
      $from,
      $head,
    } = selection;
    const isLink = isCursorOnLink(pm, $head.pos);

    if (!isLink) {
      return false;
    }

    const node = pm.doc.nodeAt($from.pos);

    // start captures the start of the node position based on depth
    // why + 1 ? (https://prosemirror.net/ref.html#ResolvedPos.depth)
    // depth positions are based on the parent not the node itself so we
    // need to go inside one level deeper
    // why - 1 ?
    // we want to capture the start of the node instead of the inside of the node
    const currentNodeOffset = $anchor.start($anchor.depth + 1) - 1;

    const markerFrom = currentNodeOffset;
    const markerTo = markerFrom + node.nodeSize;

    pm.tr.removeMark(markerFrom, markerTo, isLink).apply();

    if (forceTextSelection) {
      pm.setTextSelection(markerFrom, markerTo);
      pm.focus();
    }

    return true;
  }

  updateLink(options?: HyperLinkOptions) : boolean {
    if (!options || !this.removeLink(true)) {
      return false;
    }

    return this.addLink(options);
  }

  detach(pm: ProseMirror) {
    const rules = inputRules.ensure(pm);
    this.inputRules.forEach((rule: InputRule) => rules.removeRule(rule));
  }
});
