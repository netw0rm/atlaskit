import { Node, NodeSpec } from '../../prosemirror';
import { emoji } from './emoji';

/**
 * Represents an emoji that has been entered 'natively' (e.g. using a platform specific emoji keyboard).
 *
 * This nativeEmoji uses an emoji NodeSpec. When a native emoji has been entered an asynchronous process of
 * looking up the emoji begins. Until that resolves a specific parseDOM/toDOM behaviour of showing the native
 * emoji happens.
 *
 * If the emoji eventually resolves then this nativeEmoji starts to delegate to the emoji for
 * parseDOM/toDOM.
 */
export const nativeEmoji: NodeSpec = {
  inline: true,
  group: 'inline',
  attrs: {
    shortName: { default: null },
    id: { default: null },
    text: { default: null },
  },

  parseDOM: [{
    tag: 'span[data-native-emoji-id]',
    getAttrs: (dom: Element) => ({
      shortName: null,
      id: dom.getAttribute('data-native-emoji-id')!,
      text: dom.textContent!,
    })
  }],

  toDOM(node: Node): any {
    const { shortName, id, text } = node.attrs;
    if (shortName == null || !emoji.toDOM) {
      console.log('PAC: nativeEmoji.toDOM - span wrapping text');
      const attrs = {
        'data-native-emoji-id': id
      };
      return ['span', attrs, text];
    }

    console.log('PAC: nativeEmoji.toDOM - using emoji');
    return emoji.toDOM(node);
  }
};
