import { TextSelection, Transaction } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';
import { EmojiDescription } from '@atlaskit/emoji';

export const getLastWord = (selection: TextSelection) => {
  if (!selection.empty) {
    return;
  }

  const { nodeBefore, nodeAfter } = selection.$from;
  if (nodeBefore && !nodeAfter && nodeBefore.text) {
    const { text } = nodeBefore;
    const query = (text || '').match(/(\w{3,})\s$/);
    if (query) {
      return query[1];
    }
  }
};

export const getLastSentance = (selection: TextSelection) => {
  if (!selection.empty) {
    return;
  }

  return selection.$from.parent.textContent;
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


export const wrapIndex = (emojis: EmojiDescription[], index: number): number => {
  const len = emojis.length;
  let newIndex = index;
  while (newIndex < 0 && len > 0) {
    newIndex += len;
  }
  return newIndex % len;
};
