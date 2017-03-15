import { EditorState, NodeType, Fragment, liftTarget, TextSelection, Transaction } from '../prosemirror';
import * as baseCommand from '../prosemirror/prosemirror-commands';
import { findWrapping } from '../prosemirror/prosemirror-transform';
import * as baseListCommand from '../prosemirror/prosemirror-schema-list';
export * from '../prosemirror/prosemirror-commands';
import * as blockTypes from '../plugins/block-type/types';
import { isConvertableToCodeBlock, transformToCodeBlockAction } from '../plugins/block-type/transform-to-code-block';

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

export function toggleBulletList(): Command {
  return function (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean {
    const { $from } = state.selection;
    const grandgrandParent = $from.node(-2);
    if (grandgrandParent && grandgrandParent.type === state.schema.nodes.bulletList) {
      return liftListItem()(state, dispatch);
    } else {
      return baseListCommand.wrapInList(state.schema.nodes.bulletList)(state, dispatch);
    }
  };
}

export function toggleOrderedList(): Command {
  return function (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean {
    const { $from } = state.selection;
    const grandgrandParent = $from.node(-2);
    if (grandgrandParent && grandgrandParent.type === state.schema.nodes.orderedList) {
      return liftListItem()(state, dispatch);
    } else {
      return baseListCommand.wrapInList(state.schema.nodes.orderedList)(state, dispatch);
    }
  };
}

export function splitListItem(): Command {
  return function (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean {
    return baseListCommand.splitListItem(state.schema.nodes.listItem)(state, dispatch);
  };
}

export function liftListItem(): Command {
  return function (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean {
    let { $from, $to } = state.selection;
    let { listItem, paragraph } = state.schema.nodes;
    let range = $from.blockRange($to, (node) => {
      if (node && node.firstChild) {
        return node.type === listItem && node.firstChild.type === paragraph;
      }
      return false;
    });

    if (!range) {
      return false;
    }

    const target = range && liftTarget(range);

    if (target === undefined) {
      return false;
    }

    dispatch(state.tr.lift(range, target));

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
    const { $from, $to  } = state.selection;
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
function lift (state: EditorState<any>, tr: Transaction): Transaction {
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

function wrap (state: EditorState<any>, nodeType: NodeType, tr: Transaction): Transaction {
  const { $from, $to } = state.selection;
  const range = $from.blockRange($to) as any;
  const wrapping = range && findWrapping(range, nodeType) as any;
  if (wrapping) {
    tr = tr.wrap(range, wrapping).scrollIntoView();
  }
  return tr;
}

export interface Command {
  (state: EditorState<any>, dispatch?: (tr: Transaction) => void): boolean;
}
