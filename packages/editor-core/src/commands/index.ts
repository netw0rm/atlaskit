import { EditorState, EditorView, Fragment, liftTarget, NodeSelection, NodeType, TextSelection, Transaction, ReplaceAroundStep, NodeRange, Slice } from '../prosemirror';
import * as baseCommand from '../prosemirror/prosemirror-commands';
import * as baseListCommand from '../prosemirror/prosemirror-schema-list';
export * from '../prosemirror/prosemirror-commands';
import * as blockTypes from '../plugins/block-type/types';
import { isConvertableToCodeBlock, transformToCodeBlockAction } from '../plugins/block-type/transform-to-code-block';
import { isRangeOfType, liftSelection, wrapIn } from '../utils';
import { stateKey as hyperlinkPluginStateKey } from '../plugins/hyperlink';

export function toggleBlockType(view: EditorView, name: string): boolean {
  const { nodes } = view.state.schema;

  if (name !== blockTypes.BLOCK_QUOTE.name && name !== blockTypes.PANEL.name) {
    if (view.state.selection.$from.depth > 1) {
      view.dispatch(liftSelection(view.state.tr, view.state.doc, view.state.selection.$from, view.state.selection.$to).tr);
    }
  }

  switch (name) {
    case blockTypes.NORMAL_TEXT.name:
      if (nodes.paragraph) {
        return setNormalText()(view.state, view.dispatch);
      }
      break;
    case blockTypes.HEADING_1.name:
      if (nodes.heading) {
        return toggleHeading(1)(view.state, view.dispatch);
      }
      break;
    case blockTypes.HEADING_2.name:
      if (nodes.heading) {
        return toggleHeading(2)(view.state, view.dispatch);
      }
      break;
    case blockTypes.HEADING_3.name:
      if (nodes.heading) {
        return toggleHeading(3)(view.state, view.dispatch);
      }
      break;
    case blockTypes.HEADING_4.name:
      if (nodes.heading) {
        return toggleHeading(4)(view.state, view.dispatch);
      }
      break;
    case blockTypes.HEADING_5.name:
      if (nodes.heading) {
        return toggleHeading(5)(view.state, view.dispatch);
      }
      break;
    case blockTypes.BLOCK_QUOTE.name:
      if (nodes.paragraph && nodes.blockquote) {
        return toggleNodeType(view.state.schema.nodes.blockquote)(view.state, view.dispatch);
      }
      break;
    case blockTypes.CODE_BLOCK.name:
      if (nodes.codeBlock) {
        return toggleCodeBlock()(view.state, view.dispatch);
      }
      break;
    case blockTypes.PANEL.name:
      if (nodes.panel && nodes.paragraph) {
        return toggleNodeType(view.state.schema.nodes.panel)(view.state, view.dispatch);
      }
      break;
  }
  return false;
}

/**
 * Sometimes a selection in the editor can be slightly offset, for example:
 * it's possible for a selection to start or end at an empty node at the very end of
 * a line. This isn't obvious by looking at the editor and it's likely not what the
 * user intended - so we need to adjust the seletion a bit in scenarios like that.
 */
export function adjustSelectionInList(doc, selection: TextSelection): TextSelection {
  let { $from, $to } = selection;

  const isSameLine = $from.pos === $to.pos;

  if (isSameLine) {
    $from = doc.resolve($from.start($from.depth));
    $to = doc.resolve($from.end($from.depth));
  }

  let startPos = $from.pos;
  let endPos = $to.pos;

  if (isSameLine && startPos === doc.nodeSize - 3) { // Line is empty, don't do anything
    return selection;
  }

  // Selection started at the very beginning of a line and therefor points to the previous line.
  if ($from.nodeBefore && !isSameLine) {
    startPos++;
    let node = doc.nodeAt(startPos);
    while (!node || (node && !node.isText)) {
      startPos++;
      node = doc.nodeAt(startPos);
    }
  }

  if (endPos === startPos) {
    return new TextSelection(doc.resolve(startPos));
  }

  return new TextSelection(doc.resolve(startPos), doc.resolve(endPos));
}


export function preventDefault(): Command {
  return function (state: EditorState<any>, dispatch: (tr: Transaction) => void, view: EditorView): boolean {
    return true;
  };
}

export function toggleList(listType: 'bulletList' | 'orderedList'): Command {
  return function (state: EditorState<any>, dispatch: (tr: Transaction) => void, view: EditorView): boolean {
    view.dispatch(view.state.tr.setSelection(adjustSelectionInList(state.doc, state.selection as TextSelection)));
    state = view.state;

    const { $from, $to } = state.selection;
    const grandgrandParent = $from.node(-2);
    const isRangeOfSingleType = isRangeOfType(state.doc, $from, $to, state.schema.nodes[listType]);

    if (grandgrandParent && grandgrandParent.type === state.schema.nodes[listType] && isRangeOfSingleType) {
      // Untoggles list
      return liftListItems()(state, dispatch);
    } else {
      // Wraps selection in list and converts list type e.g. bullet_list -> ordered_list if needed
      if (!isRangeOfSingleType) {
        liftListItems()(view.state, view.dispatch);
      }
      return wrapInList(state.schema.nodes[listType])(view.state, view.dispatch, view);
    }
  };
}

export function toggleBulletList(): Command {
  return toggleList('bulletList');
}

export function toggleOrderedList(): Command {
  return toggleList('orderedList');
}

export function wrapInList(nodeType): Command {
  return (state: EditorState<any>, dispatch: (tr: Transaction) => void, view: EditorView): boolean => {
    return baseCommand.autoJoin(
      baseListCommand.wrapInList(nodeType) as any,
      (before, after) => before.type === after.type && before.type === nodeType
    )(view.state, view.dispatch);
  };
}

export function splitListItem(): Command {
  return function (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean {
    return baseListCommand.splitListItem(state.schema.nodes.listItem)(state, dispatch);
  };
}

export function liftListItems(): Command {
  return function (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean {
    const { tr } = state;
    const { $from, $to } = state.selection;
    const { paragraph } = state.schema.nodes;

    tr.doc.nodesBetween($from.pos, $to.pos, (node, pos) => {
      if (node.type === paragraph) {
        const sel = new NodeSelection(tr.doc.resolve(tr.mapping.map(pos)));
        const range = sel.$from.blockRange(sel.$to);

        if (!range || sel.$from.parent.type !== state.schema.nodes.listItem) {
          return false;
        }

        const target = range && liftTarget(range);

        if (target === undefined) {
          return false;
        }

        tr.lift(range, target);
      }
    });

    dispatch(tr);

    return true;
  };
}

export function toggleCodeBlock(): Command {
  return function (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean {
    const { $from, $to } = state.selection;
    const currentBlock = $from.parent;

    if (currentBlock.type !== state.schema.nodes.codeBlock) {
      if (isConvertableToCodeBlock(state)) {
        dispatch(transformToCodeBlockAction(state, {}));
      }
    } else {
      dispatch(state.tr.setBlockType($from.pos, $to.pos, state.schema.nodes.paragraph));
    }

    return true;
  };
}

export function setNormalText(): Command {
  return function (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean {
    const { $from, $to } = state.selection;
    const currentBlock = $from.parent;

    if (currentBlock.type !== state.schema.nodes.paragraph) {
      dispatch(state.tr.setBlockType($from.pos, $to.pos, state.schema.nodes.paragraph));
      return true;
    }

    return false;
  };
}

export function toggleHeading(level: number): Command {
  return function (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean {
    const { $from, $to } = state.selection;
    const currentBlock = $from.parent;

    if (currentBlock.type !== state.schema.nodes.heading || currentBlock.attrs['level'] !== level) {
      dispatch(state.tr.setBlockType($from.pos, $to.pos, state.schema.nodes.heading, { level }));
    } else {
      dispatch(state.tr.setBlockType($from.pos, $to.pos, state.schema.nodes.paragraph));
    }

    return true;
  };
}

export function createCodeBlockFromFenceFormat(): Command {
  return function (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean {
    const { $from } = state.selection;
    const parentBlock = $from.parent;
    if (!parentBlock.isTextblock) {
      return false;
    }
    const startPos = $from.start($from.depth);

    let textOnly = true;

    state.doc.nodesBetween(startPos, $from.pos, (node) => {
      if (node.childCount === 0 && !node.isText && !node.isTextblock) {
        textOnly = false;
      }
    });

    if (!textOnly) {
      return false;
    }

    if (!state.schema.nodes.codeBlock) {
      return false;
    }

    const fencePart = parentBlock.textContent.slice(0, $from.pos - startPos).trim();

    const matches = /^```([^\s]+)?/.exec(fencePart);

    if (matches) {
      if (isConvertableToCodeBlock(state)) {
        dispatch(transformToCodeBlockAction(state, { language: matches[1] }).delete(startPos, $from.pos));
        return true;
      }

      // add empty paragraph node if user hits Enter
      // otherwise a new line is inserted by ProseMirror
      const { codeBlock, paragraph } = state.schema.nodes;

      if ($from && $from.parent.type === codeBlock) {
        const posAfterCodeBlock = $from.end($from.depth) + 1;
        const paragraphNode = paragraph.create();
        const transform = state.tr.insert(posAfterCodeBlock, paragraphNode);

        dispatch(transform);
        return true;
      }
    }

    return false;
  };
}

export function showLinkPanel(): Command {
  return function (state: EditorState<any>, dispatch: (tr: Transaction) => void, view: EditorView): boolean {
    const pluginState = hyperlinkPluginStateKey.getState(view.state);
    pluginState.showLinkPanel(view);
    return true;
  };
}

export function clearFormatting(markTypes: Array<string>): Command {
  return function (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean {
    let { tr } = state;
    const { from, to } = state.selection;
    const { paragraph } = state.schema.nodes;
    markTypes.forEach(mark => tr.removeMark(from, to, state.schema.marks[mark]));
    tr.setStoredMarks([]);
    if (paragraph) {
      tr.setBlockType(from, to, paragraph);
      tr = liftAllNodes(state, tr);
    }
    dispatch(tr);
    return true;
  };
}

function liftAllNodes(state: EditorState<any>, tr: Transaction): Transaction {
  const { text } = state.schema.nodes;
  const { from, to } = state.selection;
  tr.doc.nodesBetween(from, to, (node, pos) => {
    if (node.type === text) {
      const start = tr.doc.resolve(tr.mapping.map(pos));
      const end = tr.doc.resolve(tr.mapping.map(pos + node.textContent.length));
      const sel = new TextSelection(start, end);
      if (sel.$from.depth > 0) {
        const range = sel.$from.blockRange(sel.$to)!;
        tr.lift(range, liftTarget(range)!);
      }
    } else if (node.type === state.schema.nodes.listItem && node.childCount > 1) {
      tr = liftSubList(state, node, pos, tr);
    }
  });
  return tr;
}

function liftSubList(state: EditorState<any>, listNode, listPos, tr: Transaction): Transaction {
  const { text, bulletList, orderedList } = state.schema.nodes;
  listNode.descendants((node, pos) => {
    if (node.type === bulletList || node.type === orderedList) {
      let startPos;
      let endpos;
      node.descendants((child, childPos) => {
        if (child.type === text) {
          if (!startPos) {
            startPos = listPos + pos + childPos;
          }
          endpos = listPos + pos + childPos + child.textContent.length;
        }
      });
      const start = tr.doc.resolve(tr.mapping.map(startPos));
      const end = tr.doc.resolve(tr.mapping.map(endpos));
      const sel = new TextSelection(start, end);
      tr = liftListItem(state, sel, tr);
    }
  });
  return tr;
}

function liftListItem(state: EditorState<any>, selection, tr: Transaction): Transaction {
  let {$from, $to} = selection;
  const nodeType = state.schema.nodes.listItem;
  let range = $from.blockRange($to, node => node.childCount && node.firstChild.type === nodeType);
  if (!range || range.depth < 2 || $from.node(range.depth - 1).type !== nodeType) { return tr; }
  let end = range.end;
  let endOfList = $to.end(range.depth);
  if (end < endOfList) {
    tr.step(
      new ReplaceAroundStep(
        end - 1,
        endOfList,
        end,
        endOfList,
        new Slice(Fragment.from(nodeType.create(null, range.parent.copy())), 1, 0),
        1,
        true
      )
    );
    range = new NodeRange(tr.doc.resolveNoCache($from.pos), tr.doc.resolveNoCache(endOfList), range.depth);
  }
  return tr.lift(range, liftTarget(range)!).scrollIntoView();
}

export function insertNewLine(): Command {
  return function (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean {
    const { $from } = state.selection;
    const node = $from.parent;
    const { hardBreak } = state.schema.nodes;

    if (hardBreak) {
      const hardBreakNode = hardBreak.create();

      if (node.type.validContent(Fragment.from(hardBreakNode))) {
        dispatch(state.tr.replaceSelection(hardBreakNode));
        return true;
      }
    }

    dispatch(state.tr.insertText('\n'));
    return true;
  };
}

export function insertRule(): Command {
  return function (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean {
    const { to } = state.selection;
    const { rule } = state.schema.nodes;
    if (rule) {
      const ruleNode = rule.create();
      dispatch(state.tr.insert(to + 1, ruleNode));
      return true;
    }
    return false;
  };
}

export function indentList(): Command {
  return function (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean {
    const { listItem } = state.schema.nodes;
    const { $from } = state.selection;
    if ($from.node(-1).type === listItem) {
      return baseListCommand.sinkListItem(listItem)(state, dispatch);
    }
    return false;
  };
}

export function outdentList(): Command {
  return function (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean {
    const { listItem } = state.schema.nodes;
    const { $from } = state.selection;
    if ($from.node(-1).type === listItem) {
      return baseListCommand.liftListItem(listItem)(state, dispatch);
    }
    return false;
  };
}

export function createNewParagraphAbove(view: EditorView): Command {
  return function (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean {
    const append = false;

    if (!canMoveUp(state)) {
      createParagraphNear(view, append);
      return true;
    }

    return false;
  };
}

export function createNewParagraphBelow(view: EditorView): Command {
  return function (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean {
    const append = true;

    if (!canMoveDown(state)) {
      createParagraphNear(view, append);
      return true;
    }

    return false;
  };
}

function canMoveUp(state: EditorState<any>): boolean {
  const { selection } = state;
  if (selection instanceof TextSelection) {
    if (!selection.empty) {
      return true;
    }
  }

  return selection.$from.pos !== selection.$from.depth;
}

function canMoveDown(state: EditorState<any>): boolean {
  const { selection, doc } = state;
  if (selection instanceof TextSelection) {
    if (!selection.empty) {
      return true;
    }
  }

  return doc.nodeSize - selection.$to.pos - 2 !== selection.$to.depth;
}

function createParagraphNear(view: EditorView, append: boolean = true): void {
  const { state, dispatch } = view;
  const paragraph = state.schema.nodes.paragraph;

  if (!paragraph) {
    return;
  }

  let insertPos;

  if (state.selection instanceof TextSelection) {
    if (topLevelNodeIsEmptyTextBlock(state)) {
      return;
    }
    insertPos = getInsertPosFromTextBlock(state, append);
  } else {
    insertPos = getInsertPosFromNonTextBlock(state, append);
  }

  dispatch(state.tr.insert(insertPos, paragraph.create()));

  const newState = view.state;
  const next = new TextSelection(newState.doc.resolve(insertPos + 1));
  dispatch(newState.tr.setSelection(next));
}

function getInsertPosFromTextBlock(state: EditorState<any>, append: boolean): void {
  const { $from, $to } = state.selection;
  let pos;

  if (!append) {
    pos = $from.start($from.depth) - 1;
    pos = $from.depth > 1 ? pos - 1 : pos;

    // Same theory as comment below.
    if ($to.node($to.depth - 1).type === state.schema.nodes.listItem) {
      pos = pos - 1;
    }
  } else {
    pos = $to.end($to.depth) + 1;
    pos = $to.depth > 1 ? pos + 1 : pos;

    // List is a special case. Because from user point of view, the whole list is a unit,
    // which has 3 level deep (ul, li, p), all the other block types has maxium two levels as a unit.
    // eg. block type (bq, p/other), code block (cb) and panel (panel, p/other).
    if ($to.node($to.depth - 1).type === state.schema.nodes.listItem) {
      pos = pos + 1;
    }
  }

  return pos;
}

function getInsertPosFromNonTextBlock(state: EditorState<any>, append: boolean): void {
  const { $from, $to } = state.selection;
  let pos;

  if (!append) {
    // The start position is different with text block because it starts from 0
    pos = $from.start($from.depth);
    // The depth is different with text block because it starts from 0
    pos = $from.depth > 0 ? pos - 1 : pos;
  } else {
    pos = $to.end($to.depth);
    pos = $to.depth > 0 ? pos + 1 : pos;
  }

  return pos;
}

function topLevelNodeIsEmptyTextBlock(state): boolean {
  const topLevelNode = state.selection.$from.node(1);
  return topLevelNode.isTextblock && topLevelNode.type !== state.schema.nodes.codeBlock && topLevelNode.nodeSize === 2;
}

function toggleNodeType(nodeType: NodeType): Command {
  return function (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean {
    let { $from, $to } = state.selection;
    const potentialBlockquoteNode = $from.node($from.depth - 1);

    // lift the node and convert to given nodeType
    if (potentialBlockquoteNode.type !== nodeType) {
      let { tr } = state;

      if ($from.depth > 1) {
        const result = liftSelection(tr, state.doc, $from, $to);
        tr = result.tr;
        $from = result.$from;
        $to = result.$to;
      }

      tr.setBlockType($from.pos, $to.pos, state.schema.nodes.paragraph);
      dispatch(wrapIn(nodeType, tr, $from, $to));
      return true;
    }

    return baseCommand.lift(state, dispatch);
  };
}

export interface Command {
  (state: EditorState<any>, dispatch?: (tr: Transaction) => void, view?: EditorView): boolean;
}
