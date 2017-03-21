import { EditorState, EditorView, Fragment, liftTarget, NodeSelection, NodeType, TextSelection, Transaction } from '../prosemirror';
import * as baseCommand from '../prosemirror/prosemirror-commands';
import { findWrapping } from '../prosemirror/prosemirror-transform';
import * as baseListCommand from '../prosemirror/prosemirror-schema-list';
export * from '../prosemirror/prosemirror-commands';
import * as blockTypes from '../plugins/block-type/types';
import { isConvertableToCodeBlock, transformToCodeBlockAction } from '../plugins/block-type/transform-to-code-block';
import { isRangeOfType } from '../utils/index-future';

export function toggleBlockType(name: string): Command {
  return function (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean {
    const { nodes } = state.schema;

    switch (name) {
      case blockTypes.NORMAL_TEXT.name:
        if (nodes.paragraph) {
          return setNormalText()(state, dispatch);
        }
        break;
      case blockTypes.HEADING_1.name:
        if (nodes.heading) {
          return toggleHeading(1)(state, dispatch);
        }
        break;
      case blockTypes.HEADING_2.name:
        if (nodes.heading) {
          return toggleHeading(2)(state, dispatch);
        }
        break;
      case blockTypes.HEADING_3.name:
        if (nodes.heading) {
          return toggleHeading(3)(state, dispatch);
        }
        break;
      case blockTypes.HEADING_4.name:
        if (nodes.heading) {
          return toggleHeading(4)(state, dispatch);
        }
        break;
      case blockTypes.HEADING_5.name:
        if (nodes.heading) {
          return toggleHeading(5)(state, dispatch);
        }
        break;
      case blockTypes.BLOCK_QUOTE.name:
        if (nodes.paragraph && nodes.blockquote) {
          return toggleBlockquote()(state, dispatch);
        }
        break;
      case blockTypes.CODE_BLOCK.name:
        if (nodes.codeBlock) {
          return toggleCodeBlock()(state, dispatch);
        }
        break;
      case blockTypes.PANEL.name:
        if (nodes.panel && nodes.paragraph) {
          return togglePanel()(state, dispatch);
        }
        break;
    }
    return false;
  };
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

  if ($from.nodeBefore) {
    if (!isSameLine) {  // Selection started at the very beginning of a line and therefor points to the previous line.
      startPos++;
      let node = doc.nodeAt(startPos);
      while (!node || (node && !node.isText)) {
        startPos++;
        node = doc.nodeAt(startPos);
      }
    } else if (!$from.nodeAfter) { // Selection started AND ended at the very end of a line.
      startPos--;
      let node = doc.nodeAt(startPos);
      while (!node || (node && !node.isText)) {
        startPos--;
        node = doc.nodeAt(startPos);
      }
    }
  }

  if ($to.parentOffset) {
    endPos--;
  } else if ($to.nodeAfter && !($from.nodeAfter && isSameLine)) { // Selection ended at the very end of a line and therefor points to the next line.
    endPos--;
    let node = doc.nodeAt(endPos);
    while (node && !node.isText) {
      endPos--;
      node = doc.nodeAt(endPos);
    }
  }

  if (!($from.parent && $from.parent.isTextblock && !$from.parent.textContent)) { // Make sure we're not on an empty paragraph. Then we won't need this.
    let node = doc.nodeAt(startPos);
    while (!node || (node && !node.isText)) {
      startPos++;
      node = doc.nodeAt(startPos)!;
    }
  }

  if (!($to.parent && $to.parent.isTextblock && !$to.parent.textContent)) { // Make sure we're not on an empty paragraph. Then we won't need this.
    let node = doc.nodeAt(endPos);
    while (!node || (node && !node.isText)) {
      endPos--;
      node = doc.nodeAt(endPos);
    }
  }

  if (endPos === startPos) {
    return new TextSelection(doc.resolve(startPos));
  }

  return new TextSelection(doc.resolve(startPos), doc.resolve(endPos));
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
  return (state: EditorState<any>, dispatch: (tr: Transaction) => void, view: EditorView): boolean  => {
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

        if (!range) {
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
        const tr = transformToCodeBlockAction(state, {});
        dispatch(lift(state, tr));
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

export function toggleBlockquote(): Command {
  return function (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean {
    const { $from, $to } = state.selection;
    const potentialBlockquoteNode = $from.node($from.depth - 1);

    if (potentialBlockquoteNode && potentialBlockquoteNode.type === state.schema.nodes.blockquote) {
      return baseCommand.lift(state, dispatch);
    }
    const tr = state.tr.setBlockType($from.pos, $to.pos, state.schema.nodes.paragraph);
    dispatch(wrap(state, state.schema.nodes.blockquote, tr));
    return true;
  };
}

export function togglePanel(): Command {
  return function (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean {
    const { $from } = state.selection;
    const potentialPanelNode = $from.node($from.depth - 1);
    if (potentialPanelNode && potentialPanelNode.type === state.schema.nodes.blockquote) {
      return baseCommand.lift(state, dispatch);
    }

    return baseCommand.wrapIn(state.schema.nodes.panel)(state, dispatch);
  };
}

export function toggleHeading(level: number): Command {
  return function (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean {
    const { $from, $to } = state.selection;
    const currentBlock = $from.parent;

    if (currentBlock.type !== state.schema.nodes.heading || currentBlock.attrs['level'] !== level) {
      const tr = state.tr.setBlockType($from.pos, $to.pos, state.schema.nodes.heading, { level });
      dispatch(lift(state, tr));
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


export function clearFormatting(): Command {
  return function (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean {
    const { tr } = state;
    const { from, to } = state.selection;
    const { paragraph } = state.schema.nodes;
    if (paragraph) {
      tr.setBlockType(from, to, paragraph);
      tr.doc.nodesBetween(from, to, (node, pos) => {
        const res = tr.doc.resolve(pos);
        const sel = new NodeSelection(res);
        if (node.isBlock && node.type !== state.schema.nodes.listItem && sel.$from.depth > 0) {
          const range = sel.$from.blockRange(sel.$to)!;
          tr.lift(range, 0);
        }
      });

      tr.clearMarkup(from, to);

      dispatch(tr);
      return true;
    }
    return false;
  };
}

export function insertNewLine(): Command {
  return function (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean {
    const { $from } = state.selection;
    const node = $from.parent;
    const { hard_break } = state.schema.nodes;

    if (hard_break) {
      const hardBreakNode = hard_break.create();

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
      dispatch(state.tr.insert(to, ruleNode));
      return true;
    }
    return false;
  };
}

export function createNewParagraphAbove(): Command {
  return function (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean {
    const append = false;

    if (!canMoveUp(state)) {
      createParagraphNear(state, dispatch, append);
      return true;
    }

    return false;
  };
}

export function createNewParagraphBelow(): Command {
  return function (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean {
    const append = true;

    if (!canMoveDown(state)) {
      createParagraphNear(state, dispatch, append);
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

function createParagraphNear(state: EditorState<any>, dispatch: (tr: Transaction) => void, append: boolean = true): void {
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

  if (append) {
    const next = new TextSelection(state.doc.resolve(insertPos));
    dispatch(state.tr.setSelection(next).insert(insertPos, paragraph.create()));
  } else {
    const next = new TextSelection(state.doc.resolve(insertPos + 1));
    dispatch(state.tr.insert(insertPos, paragraph.create()).setSelection(next));
  }
}

function getInsertPosFromTextBlock(state: EditorState<any>, append: boolean): void {
  const { $from, $to } = state.selection;
  let pos;

  if (!append) {
    pos = $from.start($from.depth) - 1;
    pos = $from.depth > 1 ? pos - 1 : pos;
  } else {
    pos = $to.end($to.depth) + 1;
    pos = $to.depth > 1 ? pos + 1 : pos;
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

// Lifts current selection up;
// it allows to chain transactions
function lift(state: EditorState<any>, tr: Transaction): Transaction {
  const { $from, $to } = state.selection;
  if ($from.depth > 1) {
    const range = $from.blockRange($to) as any;
    const target = range && liftTarget(range) as any;
    if (target !== null) {
      tr = tr.lift(range, target).scrollIntoView();
    }
  }
  return tr;
}

function wrap(state: EditorState<any>, nodeType: NodeType, tr: Transaction): Transaction {
  const { $from, $to } = state.selection;
  const range = $from.blockRange($to) as any;
  const wrapping = range && findWrapping(range, nodeType) as any;
  if (wrapping) {
    tr = tr.wrap(range, wrapping).scrollIntoView();
  }
  return tr;
}

export interface Command {
  (state: EditorState<any>, dispatch?: (tr: Transaction) => void, view?: EditorView): boolean;
}
