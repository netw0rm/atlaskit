import {
  Keymap,
  Plugin,
  ProseMirror,
  ResolvedPos,
  Node,
  NodeRange,
  UpdateScheduler,
  commands,
  TextSelection,
  NodeSelection,
  liftTarget,
  EditorTransform
} from 'ak-editor-prosemirror';

export type ListType = 'bullet_list' | 'ordered_list' | null;

export interface ListsOptions {
  type?: ListType;
}

export interface ListsState extends ListsOptions {
  active?: boolean;
  enabled?: boolean;
}

export type StateChangeHandler = (state: ListsState) => any;

const DISABLED_GROUP = 'unlistable';

const DEFAULT_STATE: ListsState = {
  active: false,
  enabled: true,
  type: null,
};

function canChangeToList(pm: ProseMirror, listsTypes: ListType[]): boolean {
  return listsTypes.some((type) => commands.wrapInList(pm.schema.nodes[type as string])(pm, false));
}

function isNodeListable(proseMirrorInstance: ProseMirror, node: Node): boolean {
  const nodeType = node.type.name;
  const nodeSpecOrderedMap = proseMirrorInstance.schema.nodeSpec;
  return nodeSpecOrderedMap.get(nodeType).group.split(' ').indexOf(DISABLED_GROUP) === -1;
}

function isShallowObjectEqual(oldObject: ListsState, newObject: ListsState): boolean {
  return JSON.stringify(oldObject) === JSON.stringify(newObject);
}

export default new Plugin(class ListsPlugin {
  changeHandlers: StateChangeHandler[];
  pm: ProseMirror;
  state: ListsState;
  updater: UpdateScheduler;
  listTypes: ListType[];

  constructor(pm: ProseMirror) {
    this.pm = pm;
    this.state = DEFAULT_STATE;
    this.changeHandlers = [];
    this.listTypes = [
      'bullet_list',
      'ordered_list',
    ];

    const listItem = pm.schema.nodes['list_item'];

    pm.addKeymap(new Keymap({
      'Enter': () => commands.splitListItem(listItem)(pm),
    }));

    this.updater = pm.updateScheduler([
      pm.on.selectionChange,
      pm.on.change,
    ], () => this.update());
  }

  // When typescript spread operator is implemented we can remove this boiler
  // plate in favour of spread assignment
  getState(): ListsState {
    return Object.assign({}, this.state);
  }

  // When typescript spread operator is implemented we can remove this boiler
  // plate in favour of spread assignment
  setState(...newState: ListsState[]): ListsState {
    this.state = Object.assign.apply(
      Object,
      [
        {},
        DEFAULT_STATE,
      ].concat(newState)
    );
    return this.state;
  }

  update() {
    const pm = this.pm;
    const { $head, $from, $to } = pm.selection;
    const oldState = this.getState();

    const $resolvedPos: ResolvedPos = $head || $to;

    // resolvedPos.pos creates an extra offset
    const activeNode: Node = pm.doc.nodeAt($resolvedPos.pos - 1);

    const rootNode: Node = $from.node(1);
    const isList: boolean = this.listTypes.indexOf(rootNode.type.name) !== -1;
    const isListable = activeNode ? isNodeListable(pm, activeNode) : oldState.enabled;
    const canChange = canChangeToList(pm, this.listTypes);

    if (isList && activeNode) {
      this.setState({
        active: true,
        type: rootNode.type.name,
        enabled: true
      });
    } else if (!isListable || !canChange) {
      this.setState({ enabled: false });
    } else {
      this.setState();
    }

    if (!isShallowObjectEqual(oldState, this.state)) {
      this.changeHandlers.every(cb => cb(this.getState()));
    }
  }

  // Returns all block-nodes between $from and $to
  blockNodesBetween($from: ResolvedPos, $to: ResolvedPos): Node[] {
    let current = this.pm.doc.resolve($from.start(1));
    let nodes = Array<Node>(); 

    while (current.pos <= $to.start(1)) {
      nodes.push(current.node(1));

      let next: ResolvedPos = this.pm.doc.resolve(current.after(1));
      if (next.start(1) > this.pm.doc.content.size) {
        break;
      }

      current = this.pm.doc.resolve(next.start(1));
    }

    return nodes;
  }

  // Step through block-nodes between $from and $to and returns false if a node is
  // found that isn't of the specified type  
  isRangeOfType($from: ResolvedPos, $to: ResolvedPos, type: ListType): boolean {
    return this.blockNodesBetween($from, $to).filter(node => node.type.name !== type).length === 0;
  }

  // Step through block-nodes between $from and $to and return true if a node is a
  // bullet_list or ordered_list
  rangeContainsList($from: ResolvedPos, $to: ResolvedPos): boolean {
    return this.blockNodesBetween($from, $to).filter(node => this.listTypes.indexOf(node.type.name) !== -1).length !== 0;
  }

  // Takes a selection $from and $to and lift all text nodes from their parents to document-level
  liftSelection($from: ResolvedPos, $to: ResolvedPos): EditorTransform {
    const tr = this.pm.tr;
    let startPos = $from.start($from.depth);
    let endPos = $to.end($to.depth);

    tr.doc.nodesBetween(startPos, endPos, (node: Node, pos: number) => {
      if (
        node.isText ||                          // Text node
        (node.isTextblock && !node.textContent) // Empty paragraph
      ) {
        const res = tr.doc.resolve(tr.map(pos));
        const sel = new NodeSelection(res);
        const range = sel.$from.blockRange(sel.$to);
        const target = liftTarget(range);
        tr.lift(range, target);
      }
    });

    startPos = tr.map(startPos);
    endPos = tr.doc.resolve(tr.map(endPos)).end(1); // We want to select the entire node
    tr.setSelection(new TextSelection(tr.doc.resolve(startPos), tr.doc.resolve(endPos)));

    return tr;
  }

  // Determines if content inside a selection can be joined with the previous block.
  // We need this check since the built-in method for "joinUp" will join a ordered_list with bullet_list.
  shouldJoinUp(selection: TextSelection, doc: any, type: ListType): boolean {
    const res = doc.resolve(selection.$from.before(1));
    return res.nodeBefore && res.nodeBefore.type.name === type;
  }

  // Determines if content inside a selection can be joined with the next block.
  // We need this check since the built-in method for "joinDown" will join a ordered_list with bullet_list.
  shouldJoinDown(selection: TextSelection, doc: any, type: ListType): boolean {
    const res = doc.resolve(selection.$to.after(1));
    return res.nodeAfter && res.nodeAfter.type.name === type;
  }

  // Sometimes a selection in the editor can be slightly offset, for example:
  // it's possible for a selection to start or end at an empty node at the very end of
  // a line. This isn't obvious by looking at the editor and it's likely not what the
  // user intended - so we need to adjust the seletion a bit in scenarios like that.
  adjustSelection(selection: TextSelection): TextSelection {
    let { $from, $to } = selection;

    const isSameLine = $from.pos === $to.pos;

    if (isSameLine) {
      $from = this.pm.doc.resolve($from.start($from.depth)); 
      $to = this.pm.doc.resolve($from.end($from.depth));
    }

    let startPos = $from.pos;
    let endPos = $to.pos;

    if (isSameLine && startPos === this.pm.doc.content.size - 1) { // Line is empty, don't do anything
      return selection;
    }

    if ($from.nodeBefore) {
      if (!isSameLine) {  // Selection started at the very beginning of a line and therefor points to the previous line.
        startPos++;
        let node: Node = this.pm.doc.nodeAt(startPos);
        while (!node || (node && !node.isText)) {
          startPos++;
          node = this.pm.doc.nodeAt(startPos);
        }
      } else if (!$from.nodeAfter) { // Selection started AND ended at the very end of a line.
        startPos--;
        let node: Node = this.pm.doc.nodeAt(startPos);
        while (!node || (node && !node.isText)) {
          startPos--;
          node = this.pm.doc.nodeAt(startPos);
        }
      }
    }

    if ($to.parentOffset) {
      endPos--;
    } else if ($to.nodeAfter && !($from.nodeAfter && isSameLine)) { // Selection ended at the very end of a line and therefor points to the next line.
      endPos--;
      let node: Node = this.pm.doc.nodeAt(endPos);
      while (node && !node.isText) {
        endPos--;
        node = this.pm.doc.nodeAt(endPos);
      }
    }

    let node: Node = this.pm.doc.nodeAt(startPos); 
    while(!node || (node && !node.isText)) {
      startPos++;
      node = this.pm.doc.nodeAt(startPos);
    }

    node = this.pm.doc.nodeAt(endPos); 
    while(!node || (node && !node.isText)) {
      endPos--;
      node = this.pm.doc.nodeAt(endPos);
    }

    if (endPos === startPos) {
      return new TextSelection(this.pm.doc.resolve(startPos)); 
    }

    return new TextSelection(this.pm.doc.resolve(startPos), this.pm.doc.resolve(endPos));
  }

  resetSelection(): void {
    const newSelection: TextSelection = new TextSelection(this.pm.selection.$to);
    this.pm.setSelection(newSelection);
  }

  // If the current selection is a list or part of a list, this method will untoggle
  // the list type for that selection.
  // In any other case it will try to apply the specified list type to the seletion,
  // either by converting existing lists to the new type or just apply the list type
  // if there's no list in the selection. 
  toggleList(type: ListType): boolean {
    const pm = this.pm;
    let { $from, $to } = pm.selection;
    const adjustedSelection = this.adjustSelection(pm.selection);

    if ($from === $to) {
      pm.setSelection(adjustedSelection);
      $from = pm.selection.$from;
      $to = pm.selection.$to;
    }

    const rootNode = $from.node(1);
    const isList = this.listTypes.indexOf(rootNode.type.name) !== -1;
    const isRangeOfType = this.isRangeOfType(adjustedSelection.$from, adjustedSelection.$to, type);
    const shouldUntoggle = isRangeOfType;
    const rangeContainsList = this.rangeContainsList($from, $to);
    const shouldConvertToType = !isRangeOfType && (isList || rangeContainsList); 

    if (shouldUntoggle) {
      if ($from.parent === $to.parent) {
        return commands.lift(pm, true);
      }

      this.liftSelection(adjustedSelection.$from, adjustedSelection.$to).applyAndScroll();
      this.resetSelection();
      return true;
    } else if (shouldConvertToType) {
      const tr = this.liftSelection(adjustedSelection.$from, adjustedSelection.$to).applyAndScroll();
      pm.setSelection(tr.selection);
      commands.wrapInList(tr.pm.schema.nodes[type as string] as Node)(tr.pm);

      if (this.shouldJoinUp(pm.selection, pm.doc, type)) {
        commands.joinUp(pm, true);
      }

      if (this.shouldJoinDown(pm.selection, pm.doc, type)) {
        commands.joinDown(pm, true);
      }

      this.resetSelection();
      return true;
    } else {
      pm.setSelection(this.adjustSelection(pm.selection));
      commands.wrapInList(pm.schema.nodes[type as string] as Node)(pm);

      if (this.shouldJoinUp(pm.selection, pm.doc, type)) {
        commands.joinUp(pm, true);
      }

      if (this.shouldJoinDown(pm.selection, pm.doc, type)) {
        /* 
         * joinDown expects the selection to be from the end of our last node to 
         * the beginning of the next. So we need to adjust our selection a bit.
         * */
        pm.setSelection(new TextSelection(pm.selection.$to, pm.doc.resolve(pm.selection.$to.after(1)))); 
        commands.joinDown(pm, true);
      }

      this.resetSelection();
      return true;
    }
  }

  subscribe(cb: StateChangeHandler) {
    this.changeHandlers.push(cb);
    cb(this.getState());
  }
});
