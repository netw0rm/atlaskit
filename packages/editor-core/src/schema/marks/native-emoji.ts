import { Mark, MarkSpec } from '../../prosemirror';

export interface NativeEmojiMark extends Mark {
  attrs: {
    emojiId: string;
  };
}

export const nativeEmoji: MarkSpec = {
  attrs: { emojiId: '' },
  excludes: '_',
  inclusive: false,
  parseDOM: [
    { tag: 'span[data-native-emoji-id]',
      getAttrs: (dom: Element) => {
        return { emojiId: dom.getAttribute('data-native-emoji-id') };
      },
  }],
  toDOM(mark: NativeEmojiMark): [string, object] {
    return ['span', {
      'data-native-emoji-id': mark.attrs.emojiId,
    }];
  }
};
