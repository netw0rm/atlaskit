import { EditorView, Decoration, DecorationSet } from 'prosemirror-view';
import { TextSelection, Transaction } from 'prosemirror-state';
import { EmojiDescription } from '@atlaskit/emoji';
import {
  SearchSort,
  SearchOptions
} from '@atlaskit/emoji';

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

  const { parent: { textContent }, nodeAfter } = selection.$from;
  if (textContent && !nodeAfter) {
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

export const getHighlights = (nouns, doc, emojiProvider) => {
  const options: SearchOptions = {
    limit: 1,
    sort: SearchSort.Default
  };
  const highlights: any = [];
  const emojis = {};

  doc.descendants((node, pos) => {
    if (node.isText && node.text && node.text.length > 2) {
      nouns.forEach(noun => {
        const index = (node.text || '').indexOf(noun);

        if (index > -1) {
          const result = emojiProvider.emojiRepository.search(noun, options);
          if (result.emojis.length) {
            const emoji = result.emojis[0];

            highlights.push({
              emoji,
              startPos: pos + index,
              endPos: pos + index + noun.length,
              word: noun
            });

            emojis[emoji.id] = emoji;
          }
        }
      });

    }
  });
  return { highlights, emojis };
};

export const createHighlightDecoration = (view: EditorView, highlights: any): DecorationSet => {
  const decorations: Decoration[] = highlights.map(data => {
    return Decoration.inline(data.startPos, data.endPos, {
      class: `emoji-highligh emojiId-${data.emoji.id} startPos-${data.startPos} endPos-${data.endPos}`
    });
  });

  return DecorationSet.create(view.state.tr.doc, decorations);
};

export const parseHighlightedEmojiNode = (target: any) => {
  const { className } = target;
  const emojiId = (className.match(/emojiId\-([\w\d\-]+)/)||[,''])[1];
  const startPos = (className.match(/startPos\-(\d+)/)||[,''])[1];
  const endPos = (className.match(/endPos\-(\d+)/)||[,''])[1];
  return { emojiId, startPos, endPos };
};
