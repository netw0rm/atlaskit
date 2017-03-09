import Keymap from 'browserkeymap';
import {
  commands,
  Node,
  NodeSelection,
  Plugin,
  ProseMirror,
  ResolvedPos,
  Schema,
  Selection,
  TextSelection,
} from '../../prosemirror';

import {
  BulletListNodeType,
  isBulletListNode,
  isOrderedListNode,
  ListItemNodeType,
  OrderedListNodeType
} from '../../schema';

import {
  canJoinDown,
  canJoinUp,
  findAncestorPosition,
  getAncestorNodesBetween,
  getGroupsInRange,
  isRangeOfType,
  liftSelection,
} from '../../utils';

import * as keymaps from '../../keymaps';

import { trackAndInvoke } from '../../analytics';

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

    this.update();
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
      [keymaps.splitListItem.common!]: () => commands.splitListItem(list_item)(pm),
      [keymaps.toggleOrderedList.common!]: trackAndInvoke('atlassian.editor.format.list.numbered.keyboard', () => this.toggleOrderedList()),
      [keymaps.toggleBulletList.common!]: trackAndInvoke('atlassian.editor.format.list.bullet.keyboard', () => this.toggleBulletList()),
      ['Tab']: this.nestList,
      ['Shift-Tab']: this.liftList
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
    const { pm } = this;
    const groups = getGroupsInRange(pm, this.pm.selection.$from, this.pm.selection.$to, isListNode);
    const { $from } = groups[0];
    const { $to } = groups[groups.length - 1];
    this.pm.setSelection(new TextSelection($from, $to));

    const adjustedSelection = this.adjustSelection(this.pm.selection);
    const shouldUntoggle = isRangeOfType(pm, adjustedSelection.$from, adjustedSelection.$to, nodeType);
    const rangeContainsList = this.rangeContainsList(pm, adjustedSelection.$from, adjustedSelection.$to);
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

      liftSelection(pm, adjustedSelection.$from, adjustedSelection.$to).applyAndScroll();
      this.resetSelection();
    } else if (shouldConvertToType) {
      const tr = liftSelection(pm, adjustedSelection.$from, adjustedSelection.$to).applyAndScroll();
      pm.setSelection(tr.selection);
      commands.wrapInList(nodeType)(pm);

      if (canJoinUp(pm, pm.selection, pm.doc, nodeType)) {
        commands.joinUp(pm, true);
      }

      if (canJoinDown(pm, pm.selection, pm.doc, nodeType)) {
        commands.joinDown(pm, true);
      }

      this.resetSelection();
    } else {
      pm.setSelection(this.adjustSelection(pm.selection));
      commands.wrapInList(nodeType)(pm);

      if (canJoinUp(pm, pm.selection, pm.doc, nodeType)) {
        commands.joinUp(pm, true);
      }

      if (canJoinDown(pm, pm.selection, pm.doc, nodeType)) {
        /*
         * joinDown expects the selection to be from the end of our last node to
         * the beginning of the next. So we need to adjust our selection a bit.
         * */
        pm.setSelection(new TextSelection(pm.selection.$to, pm.doc.resolve(pm.selection.$to.after(findAncestorPosition(pm, pm.selection.$to).depth))));
        commands.joinDown(pm, true);
      }

      this.resetSelection();
    }
  }

  nestList = () => {
    if (this.bulletListActive || this.orderedListActive) {
      const { pm } = this;
      const { bullet_list, ordered_list } = pm.schema.nodes;
      const nodeType = this.bulletListActive ? bullet_list : ordered_list;
      if (nodeType) {
        commands.wrapInList(nodeType)(pm);
        return true;
      }
    }
  }

  liftList = () => {
    if (this.bulletListActive || this.orderedListActive) {
      const { pm } = this;
      const { bullet_list, ordered_list } = pm.schema.nodes;
      const nodeType = this.bulletListActive ? bullet_list : ordered_list;
      if (nodeType) {
        commands.lift(pm, true);
        if (canJoinUp(pm, pm.selection, pm.doc, nodeType)) {
          commands.joinUp(pm, true);
        }
        if (canJoinDown(pm, pm.selection, pm.doc, nodeType)) {
          commands.joinDown(pm, true);
        }
        return true;
      }
    }
  }

  private update() {
    const { pm } = this;
    const ancestorPosition = findAncestorPosition(pm, pm.selection.$from);
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
   * Step through block-nodes between $from and $to and return true if a node is a
   * bullet_list or ordered_list
   */
  private rangeContainsList(pm: ProseMirror, $from: ResolvedPos, $to: ResolvedPos): boolean {
    return getAncestorNodesBetween(pm, $from, $to).some(isListNode);
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
        let node = this.pm.doc.nodeAt(startPos);
        while (!node || (node && !node.isText)) {
          startPos++;
          node = this.pm.doc.nodeAt(startPos);
        }
      } else if (!$from.nodeAfter) { // Selection started AND ended at the very end of a line.
        startPos--;
        let node = this.pm.doc.nodeAt(startPos);
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
      let node = this.pm.doc.nodeAt(endPos);
      while (node && !node.isText) {
        endPos--;
        node = this.pm.doc.nodeAt(endPos);
      }
    }

    if (!($from.parent && $from.parent.isTextblock && !$from.parent.textContent)) { // Make sure we're not on an empty paragraph. Then we won't need this.
      let node = this.pm.doc.nodeAt(startPos);
      while (!node || (node && !node.isText)) {
        startPos++;
        node = this.pm.doc.nodeAt(startPos)!;
      }
    }

    if (!($to.parent && $to.parent.isTextblock && !$to.parent.textContent)) { // Make sure we're not on an empty paragraph. Then we won't need this.
      let node = this.pm.doc.nodeAt(endPos);
      while (!node || (node && !node.isText)) {
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
    list_item: ListItemNodeType,
    ordered_list?: OrderedListNodeType
  };
}

export interface PM extends ProseMirror {
  schema: S;
}

function isListNode(node: Node) {
  return isBulletListNode(node) || isOrderedListNode(node);
}

const noop = (...args: any[]) => {};
