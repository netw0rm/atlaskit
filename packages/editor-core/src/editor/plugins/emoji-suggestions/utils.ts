import { TextSelection, Transaction } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';

export const getLastWord = (selection: TextSelection) => {
  if (!selection.empty) {
    return;
  }

  const { nodeBefore, nodeAfter } = selection.$from;
  if (nodeBefore && !nodeAfter && nodeBefore.text) {
    const { text } = nodeBefore;
    const lastWord = text.match(/(\w{3,})\s$/);
    if (lastWord) {
      return lastWord[1];
    }
  }
};

export const createDecorationWidget = (tr: Transaction, query?: string) => {
  if (query) {
    const node = document.createElement('span');
    node.setAttribute('data', 'emoji-suggestion');
    return DecorationSet.create(tr.doc, [
      Decoration.widget(tr.selection.$from.pos, node)
    ]);
  } else {
    return DecorationSet.empty;
  }
};
