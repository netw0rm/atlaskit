import { TextSelection, Transaction } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';
import { EmojiDescription } from '@atlaskit/emoji';

export const getLastWord = (query?: string) => {
  if (query) {
    const lastWord = query.match(/(\w+)$/);
    if (lastWord) {
      return lastWord[1];
    }
  }
};

export const getLastSentance = (selection: TextSelection) => {
  if (!selection.empty) {
    return;
  }

  const { parent: { textContent } } = selection.$from;
  if (textContent) {
    // const query = (textContent || '').match(/^(.*)\s$/);
    const query = (textContent || '').match(/([^.!?]+[\s\w]+(.)?)\s$/);
    if (query) {
      return query[1];
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


export const wrapIndex = (emojis: EmojiDescription[], index: number): number => {
  const len = emojis.length;
  let newIndex = index;
  while (newIndex < 0 && len > 0) {
    newIndex += len;
  }
  return newIndex % len;
};
