import {
  Plugin, ProseMirror, ResolvedPos, Node, Mark, inputRules, InputRule,
  allInputRules, DOMFromPos as getDomElementFromPosition
} from 'ak-editor-prosemirror';
import hyperlinkRule from './input-rule';
import pasteTransformer from './paste-transformer';

export interface HyperlinkOptions {
  href?: string;
  rel?: string;
  target?: '_self' | '_blank' | '_parent' | '_top' | '';
  text?: string;
  title?: string;
}

export interface HyperlinkState extends HyperlinkOptions {
  active?: boolean;
  enabled?: boolean;
  element?: HTMLElement | null;
}

export type StateChangeHandler = (state: HyperlinkState) => any;

export const DISABLED_GROUP = 'unlinkable';

const DEFAULT_STATE: HyperlinkState = {
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
  const nodes = pm.schema.nodes;
  const group = nodes[nodeType].group;

  return group ? group.split(' ').indexOf(DISABLED_GROUP) === -1 : true;
}

function getHyperlinkAtCursor(
  pm: ProseMirror,
  pos: number,
  empty: boolean
) : Mark | null {
  let marks;
  if (!empty) {
    // because of `exclusiveRight`, we need to get the node "left to"
    // the current cursor
    marks = pm.doc.nodeAt(pos - 1).marks;
  } else {
    const node = pm.doc.nodeAt(pos);
    const preNode = pm.doc.nodeAt(pos - 1);

    // in the beginning of a potential hyperlink node
    // or at the end of the editor
    if (node !== preNode || !node) {
      return null;
    }

    marks = node.marks;
  }

  return marks.reduce(
    (found: boolean, m: Mark) => found || (m.type.name === 'link' && m),
    null
  );
}

function isShallowObjectEqual(
  oldObject: HyperlinkState,
  newObject: HyperlinkState
) : boolean {
  return JSON.stringify(oldObject) === JSON.stringify(newObject);
}

class HyperlinkPlugin {
  changeHandlers: StateChangeHandler[];
  inputRules: InputRule[];
  pm: ProseMirror;
  state: HyperlinkState;

  constructor(pm: ProseMirror) {
    this.pm = pm;
    this.state = DEFAULT_STATE;
    this.changeHandlers = [];

    // add paste handler
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
    ], () => this.__update__());
  }

  // When typescript spread operator is implemented we can remove this boiler
  // plate in favour of spread assignment
  getState(): HyperlinkState {
    return Object.assign({}, this.state);
  }

  // When typescript spread operator is implemented we can remove this boiler
  // plate in favour of spread assignment
  setState(...newState: HyperlinkState[]) : HyperlinkState {
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

    // why - 1?
    // because of `exclusiveRight`, we need to get the node "left to"
    // the current cursor
    const activeNode: Node = pm.doc.nodeAt($resolvedPos.pos - 1);
    const hyperlinkAtCursor = getHyperlinkAtCursor(pm, $resolvedPos.pos, empty);

    if (hyperlinkAtCursor && activeNode) {
      this.setState(hyperlinkAtCursor.attrs, {
        active: true,
        element: getDomElement(pm, getBoundariesWithin($head)),
        text: activeNode.textContent,
        enabled: true,
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
      this.setState({
        enabled: true,
      });
    }

    if (!isShallowObjectEqual(oldState, this.state)) {
      this.changeHandlers.every(cb => cb(this.getState()));
    }
  }

  subscribe(cb: StateChangeHandler) {
    this.changeHandlers.push(cb);
    cb(this.getState());
  }

  addLink(options: HyperlinkOptions) : boolean {
    const pm = this.pm;
    const selection = pm.selection;
    const {
      empty,
      $from,
      $to,
      $head,
    } = selection;

    const $resolvedPos: ResolvedPos = $head || $to;

    const hyperlinkAtCursor = getHyperlinkAtCursor(pm, $resolvedPos.pos, empty);

    const { enabled } = this.getState();

    if (!enabled || empty || hyperlinkAtCursor || !options || !(options.href as String).trim()) {
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
      $head,
      empty
    } = selection;
    const hyperlinkAtCursor = getHyperlinkAtCursor(pm, $head.pos, empty);

    if (!hyperlinkAtCursor) {
      return false;
    }

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

    pm.tr.removeMark(markerFrom, markerTo, hyperlinkAtCursor).apply();

    if (forceTextSelection) {
      pm.setTextSelection(markerFrom, markerTo);
      pm.focus();
    }

    return true;
  }

  updateLink(options?: HyperlinkOptions) : boolean {
    if (!options || !(options.href as String).trim() || !this.removeLink(true)) {
      return false;
    }

    return this.addLink(options);
  }

  detach(pm: ProseMirror) {
    const rules = inputRules.ensure(pm);
    this.inputRules.forEach((rule: InputRule) => rules.removeRule(rule));
  }
}

// IE11 + multiple prosemirror fix.
Object.defineProperty(HyperlinkPlugin, 'name', { value: 'HyperlinkPlugin' });

export default new Plugin(HyperlinkPlugin);
