import { ResourcedEmoji } from '@atlaskit/emoji';
import { EmojiDescription } from '@atlaskit/emoji/src/types';
import {
  akColorN50,
} from '@atlaskit/util-shared-styles';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { style } from 'typestyle';
import { Attribute, Inline, Node, Schema } from '../../prosemirror';

const width = '20px';
const height = '20px';

// FIXME this should be able to be removed when moved into emoji
const emojiStyle = style({
  display: 'inline-block',
  width: width,
  height: height,
  verticalAlign: 'middle',
  userSelect: 'all',

  $nest: {
    '&.ProseMirror-selectednode': {
      backgroundColor: akColorN50,
      outline: 'none',
    },
    // sprite
    '.emoji-sprite': {
      margin: '0',
      width: width,
      height: height,
    },

    // image
    '> span': {
      margin: '0',
      width: width,
      height: height,
      backgroundSize: `${width} ${height}`,
    }
  }
});

export class EmojiNodeType extends Inline {
  constructor(name: string, schema: Schema) {
    super(name, schema);
    if (name !== 'emoji') {
      throw new Error('EmojiNodeType must be named "emoji".');
    }
  }

  get attrs() {
    return {
      id: new Attribute({ default: '' }),
      variation: new Attribute({ default: 0 }),
      shortcut: new Attribute({ default: '' }),
      emojiProvider: new Attribute({ default: null }), // Promise<EmojiProvider>
    };
  }

  get matchDOMTag() {
    return {
      'span[data-emoji-id]': (dom: Element) => ({
        id: dom.getAttribute('data-emoji-id')!
      })
    };
  }

  toDOM(node: EmojiNode): any {
    const dom = document.createElement('span');
    dom.setAttribute('contenteditable', 'false');
    dom.setAttribute('data-emoji-id', node.attrs.id);
    dom.classList.add(emojiStyle);
    const { id, variation, emojiProvider } = node.attrs;
    const emojiId = { id, variation };
    ReactDOM.render(<ResourcedEmoji emojiId={emojiId} emojiProvider={emojiProvider} />, dom);
    return dom;
  }
}

export interface EmojiNode extends Node {
  type: EmojiNodeType;
  attrs: {
    id: string;
    emoji: EmojiDescription;
    [key: string]: any;
  };
}

export function isEmojiNode(node: Node): node is EmojiNode {
  return node.type instanceof EmojiNodeType;
}
