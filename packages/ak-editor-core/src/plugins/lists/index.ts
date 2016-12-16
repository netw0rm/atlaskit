import {
  commands,
  EditorTransform,
  Keymap,
  liftTarget,
  Plugin,
  ProseMirror,
  Node,
  NodeRange,
  NodeSelection,
  NodeType,
  ResolvedPos,
  Schema,
  Selection,
  TextSelection,
  UpdateScheduler
} from '../../prosemirror';

import {
  BulletListNodeType,
  ListItemNodeType,
  OrderedListNodeType,
  isBulletListNode,
  isOrderedListNode
} from '../../schema'

export type ListType = 'bullet_list' | 'ordered_list' | null;

export interface ListsOptions {
  type?: ListType;
}

export type StateChangeHandler = (state: ListsState) => any;

export class ListsState {
  private changeHandlers: StateChangeHandler[] = [];
  private pm: PM;
  private wrapInBulletList: (pm: PM, apply?: boolean) => any;
  private wrapInOrderedList: (pm: PM, apply?: boolean) => any;

  // public state
  bulletListActive = false;
  bulletListDisabled = false;
  bulletListHidden = false;
  orderedListActive = false;
  orderedListDisabled = false;
  orderedListHidden = false;

  active = false;
  enabled = true;
  type?: ListType;

  constructor(pm: PM) {
    this.pm = pm;
    this.changeHandlers = [];
    const { bullet_list, ordered_list } = pm.schema.nodes;

    this.bulletListHidden = !bullet_list;
    this.orderedListHidden = !ordered_list;
    this.wrapInBulletList = !!bullet_list ? commands.wrapInList(bullet_list) : noop;
    this.wrapInOrderedList = !!ordered_list ? commands.wrapInList(ordered_list) : noop;

    this.addKeymap(pm);

    pm.updateScheduler([
      pm.on.selectionChange,
      pm.on.change,
    ], () => this.update());
  }

  subscribe(cb: StateChangeHandler) {
    this.changeHandlers.push(cb);
    cb(this);
  }

  unsubscribe(cb: StateChangeHandler) {
    this.changeHandlers = this.changeHandlers.filter(ch => ch !== cb);
  }

  toggleOrderedList(): void {
    const { ordered_list } = this.pm.schema.nodes;
    if (ordered_list) {
      this.toggleList(ordered_list);
    }
  }

  toggleBulletList(): void {
    const { bullet_list } = this.pm.schema.nodes;
    if (bullet_list) {
      this.toggleList(bullet_list);
    }
  }

  private addKeymap(pm: PM): void {
    const { list_item } = pm.schema.nodes;

    pm.addKeymap(new Keymap({
      'Enter': () => commands.splitListItem(list_item)(pm),
      'Mod-Shift-L': () => this.toggleOrderedList(),
      'Mod-Shift-B': () => this.toggleBulletList()
    }));
  }

  /**
   * If the current selection is a list or part of a list, this method will untoggle
   * the list type for that selection.
   * In any other case it will try to apply the specified list type to the seletion,
   * either by converting existing lists to the new type or just apply the list type
   * if there's no list in the selection.
   */
  private toggleList(nodeType: BulletListNodeType | OrderedListNodeType): void {
    const groups = this.getGroupsInRange(this.pm.selection.$from, this.pm.selection.$to);
    let { $from } = groups[0];
    let { $to } = groups[groups.length - 1];
    this.pm.setSelection(new TextSelection($from, $to));

    const adjustedSelection = this.adjustSelection(this.pm.selection);
    const shouldUntoggle = this.isRangeOfType(adjustedSelection.$from, adjustedSelection.$to, nodeType);
    const rangeContainsList = this.rangeContainsList(adjustedSelection.$from, adjustedSelection.$to);
    const shouldConvertToType = !shouldUntoggle && (isListNode($from.node(1)!) || rangeContainsList);

    groups.reverse(); // Quick-fix to keep positions
    groups.forEach((group) => {
      this.toggleListAtSelection(nodeType, group.$from, group.$to, shouldUntoggle, shouldConvertToType);
    });
  }

  private toggleListAtSelection(nodeType: BulletListNodeType | OrderedListNodeType, $from: ResolvedPos, $to: ResolvedPos, shouldUntoggle: boolean, shouldConvertToType: boolean): void {
    const pm = this.pm;
    pm.setSelection(new TextSelection($from, $to));

    const adjustedSelection = this.adjustSelection(pm.selection);

    const wrapInList = nodeType === pm.schema.nodes.bullet_list
      ? this.wrapInBulletList
      : this.wrapInOrderedList;

    if ($from === $to) {
      pm.setSelection(adjustedSelection);
      $from = pm.selection.$from;
      $to = pm.selection.$to;
    }

    if (shouldUntoggle) {
      if ($from.parent === $to.parent) {
        commands.lift(pm, true);
        return;
      }

      this.liftSelection(adjustedSelection.$from, adjustedSelection.$to).applyAndScroll();
      this.resetSelection();
    } else if (shouldConvertToType) {
      const tr = this.liftSelection(adjustedSelection.$from, adjustedSelection.$to).applyAndScroll();
      pm.setSelection(tr.selection);
      commands.wrapInList(nodeType)(tr.pm);

      if (this.shouldJoinUp(pm.selection, pm.doc, nodeType)) {
        commands.joinUp(pm, true);
      }

      if (this.shouldJoinDown(pm.selection, pm.doc, nodeType)) {
        commands.joinDown(pm, true);
      }

      this.resetSelection();
    } else {
      pm.setSelection(this.adjustSelection(pm.selection));
      commands.wrapInList(nodeType)(pm);

      if (this.shouldJoinUp(pm.selection, pm.doc, nodeType)) {
        commands.joinUp(pm, true);
      }

      if (this.shouldJoinDown(pm.selection, pm.doc, nodeType)) {
        /*
         * joinDown expects the selection to be from the end of our last node to
         * the beginning of the next. So we need to adjust our selection a bit.
         * */
        pm.setSelection(new TextSelection(pm.selection.$to, pm.doc.resolve(pm.selection.$to.after(this.findAncestorPosition(pm.selection.$to).depth))));
        commands.joinDown(pm, true);
      }

      this.resetSelection();
    }
  }

  private findAncestorPosition(pos: ResolvedPos): ResolvedPos {
    const nestableBlocks = ['blockquote', 'bullet_list', 'ordered_list'];

    if (pos.depth === 1) {
      return pos;
    }

    let node: Node | undefined = pos.node(pos.depth);
    while(pos.depth >= 1) {
      pos = this.pm.doc.resolve(pos.before(pos.depth));
      node = pos.node(pos.depth);

      if (node && nestableBlocks.indexOf(node.type.name) !== -1) {
        break;
      }
    }

    return pos;
  }

  private hasCommonAncestor($from: ResolvedPos, $to: ResolvedPos): boolean {
    let current;
    let target;

    if ($from.depth > $to.depth) {
      current = this.findAncestorPosition($from);
      target = this.findAncestorPosition($to);
    } else {
      current = this.findAncestorPosition($to);
      target = this.findAncestorPosition($from);
    }

    while (current.depth > target.depth && current.depth > 1) {
      current = this.findAncestorPosition(current);
    }

    return current.node(current.depth) === target.node(target.depth);
  }

  private getGroupsInRange($from: ResolvedPos, $to: ResolvedPos): Array<{$from: ResolvedPos, $to: ResolvedPos}> {
    const groups = Array<{$from: ResolvedPos, $to: ResolvedPos}>();
    const hasCommonAncestor = this.hasCommonAncestor($from, $to);
    const fromAncestor = this.findAncestorPosition($from);

    if (hasCommonAncestor || (fromAncestor.depth === 1 && isListNode($from.node(1)!))) {
      groups.push({ $from, $to });
    } else {
      let current = $from;

      while(current.pos <= $to.pos) {
        let ancestorPos = this.findAncestorPosition(current);
        while (ancestorPos.depth > 1) {
          ancestorPos = this.findAncestorPosition(ancestorPos);
        }

        const endPos = this.pm.doc.resolve(Math.min(ancestorPos.end(ancestorPos.depth) - 1, $to.pos));

        groups.push({
          $from: current,
          $to: endPos
        });

        current = this.pm.doc.resolve(Math.min(endPos.after(1) + 1, this.pm.doc.nodeSize - 2));
      }
    }

    return groups;
  }

  private update() {
    const { pm } = this;
    const { bullet_list, ordered_list } = pm.schema.nodes;
    const ancestorPosition = this.findAncestorPosition(pm.selection.$from);
    const rootNode = pm.selection instanceof NodeSelection
      ? pm.selection.node
      : ancestorPosition.node(ancestorPosition.depth)!;

    let dirty = false;

    const newBulletListActive = isBulletListNode(rootNode);
    if (newBulletListActive !== this.bulletListActive) {
      this.bulletListActive = newBulletListActive;
      dirty = true;
    }

    const newOrderedListActive = isOrderedListNode(rootNode);
    if (newOrderedListActive !== this.orderedListActive) {
      this.orderedListActive = newOrderedListActive;
      dirty = true;
    }

    const anyListActive = newBulletListActive || newOrderedListActive;

    const newBulletListDisabled = !(anyListActive || this.wrapInBulletList(pm, false));
    if (newBulletListDisabled !== this.bulletListDisabled) {
      this.bulletListDisabled = newBulletListDisabled;
      dirty = true;
    }

    const newOrderedListDisabled = !(anyListActive || this.wrapInOrderedList(pm, false));
    if (newOrderedListDisabled !== this.orderedListDisabled) {
      this.orderedListDisabled = newOrderedListDisabled;
      dirty = true;
    }

    if (dirty) {
      this.changeHandlers.forEach(cb => cb(this));
    }
  }

  /**
   * Returns all top-level ancestor-nodes between $from and $to
   */
  private ancestorNodesBetween($from: ResolvedPos, $to: ResolvedPos): Node[] {
    let nodes = Array<Node>();
    let maxDepth = this.findAncestorPosition($from).depth;
    let current = this.pm.doc.resolve($from.start(maxDepth));

    while (current.pos <= $to.start($to.depth)) {
      let depth = Math.min(current.depth, maxDepth);
      const node = current.node(depth);

      if (node) {
        nodes.push(node);
      }

      let next: ResolvedPos = this.pm.doc.resolve(current.after(depth));
      if (next.start(depth) >= this.pm.doc.nodeSize - 2) {
        break;
      }

      if (next.depth !== current.depth) {
        next = this.pm.doc.resolve(next.pos + 2);
      }

      current = this.pm.doc.resolve(next.start(next.depth));
    }

    return nodes;
  }

  /**
   * Step through block-nodes between $from and $to and returns false if a node is
   * found that isn't of the specified type
   */
  private isRangeOfType($from: ResolvedPos, $to: ResolvedPos, nodeType: NodeType): boolean {
    return this.ancestorNodesBetween($from, $to).filter(node => node.type !== nodeType).length === 0;
  }

  /**
   * Step through block-nodes between $from and $to and return true if a node is a
   * bullet_list or ordered_list
   */
  private rangeContainsList($from: ResolvedPos, $to: ResolvedPos): boolean {
    return this.ancestorNodesBetween($from, $to).some(isListNode);
  }

  /**
   * Takes a selection $from and $to and lift all text nodes from their parents to document-level
   */
  private liftSelection($from: ResolvedPos, $to: ResolvedPos): EditorTransform {
    const tr = this.pm.tr;
    let startPos = $from.start($from.depth);
    let endPos = $to.end($to.depth);
    let target = Math.max(0, this.findAncestorPosition($from).depth - 1);

    tr.doc.nodesBetween(startPos, endPos, (node, pos) => {
      if (
        node.isText ||                          // Text node
        (node.isTextblock && !node.textContent) // Empty paragraph
      ) {
        const res = tr.doc.resolve(tr.map(pos));
        const sel = new NodeSelection(res);
        const range = sel.$from.blockRange(sel.$to);
        tr.lift(range, target);
      }
    });

    startPos = tr.map(startPos);
    endPos = tr.map(endPos);
    endPos = tr.doc.resolve(endPos).end(tr.doc.resolve(endPos).depth); // We want to select the entire node

    tr.setSelection(new TextSelection(tr.doc.resolve(startPos), tr.doc.resolve(endPos)));

    return tr;
  }

  /**
   * Determines if content inside a selection can be joined with the previous block.
   * We need this check since the built-in method for "joinUp" will join a ordered_list with bullet_list.
   */
  private shouldJoinUp(selection: Selection, doc: any, nodeType: NodeType): boolean {
    const res = doc.resolve(selection.$from.before(this.findAncestorPosition(selection.$from).depth));
    return res.nodeBefore && res.nodeBefore.type === nodeType;
  }

  /**
   * Determines if content inside a selection can be joined with the next block.
   * We need this check since the built-in method for "joinDown" will join a ordered_list with bullet_list.
   */
  private shouldJoinDown(selection: Selection, doc: any, nodeType: NodeType): boolean {
    const res = doc.resolve(selection.$to.after(this.findAncestorPosition(selection.$to).depth));
    return res.nodeAfter && res.nodeAfter.type === nodeType;
  }

  /**
   * Sometimes a selection in the editor can be slightly offset, for example:
   * it's possible for a selection to start or end at an empty node at the very end of
   * a line. This isn't obvious by looking at the editor and it's likely not what the
   * user intended - so we need to adjust the seletion a bit in scenarios like that.
   */
  private adjustSelection(selection: Selection): Selection {
    let { $from, $to } = selection;

    const isSameLine = $from.pos === $to.pos;

    if (isSameLine) {
      $from = this.pm.doc.resolve($from.start($from.depth));
      $to = this.pm.doc.resolve($from.end($from.depth));
    }

    let startPos = $from.pos;
    let endPos = $to.pos;

    if (isSameLine && startPos === this.pm.doc.nodeSize - 3) { // Line is empty, don't do anything
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

    if(!($from.parent && $from.parent.isTextblock && !$from.parent.textContent)) { // Make sure we're not on an empty paragraph. Then we won't need this.
      let node: Node = this.pm.doc.nodeAt(startPos);
      while(!node || (node && !node.isText)) {
        startPos++;
        node = this.pm.doc.nodeAt(startPos);
      }
    }

    if(!($to.parent && $to.parent.isTextblock && !$to.parent.textContent)) { // Make sure we're not on an empty paragraph. Then we won't need this.
      let node = this.pm.doc.nodeAt(endPos);
      while(!node || (node && !node.isText)) {
        endPos--;
        node = this.pm.doc.nodeAt(endPos);
      }
    }

    if (endPos === startPos) {
      return new TextSelection(this.pm.doc.resolve(startPos));
    }

    return new TextSelection(this.pm.doc.resolve(startPos), this.pm.doc.resolve(endPos));
  }

  private resetSelection(): void {
    const newSelection: TextSelection = new TextSelection(this.pm.selection.$to);
    this.pm.setSelection(newSelection);
  }
}

// IE11 + multiple prosemirror fix.
Object.defineProperty(ListsState, 'name', { value: 'ListsState' });

export default new Plugin(ListsState);

export interface S extends Schema {
  nodes: {
    bullet_list?: BulletListNodeType,
    list_item:  ListItemNodeType,
    ordered_list?: OrderedListNodeType
  }
}

export interface PM extends ProseMirror {
  schema: S;
}

function isListNode(node: Node) {
  return isBulletListNode(node) || isOrderedListNode(node);
}

const noop = (...args: any[]) => {};
