import { Emoji } from '@atlaskit/emoji';
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

const emojiStyle = style({
  display: 'inline-block',
  width: width,
  height: height,
  verticalAlign: 'middle',
  userSelect: 'all',

  $nest: {
    '&.ProseMirror-selectednode': {
      background: akColorN50,
      outline: 'none'
    },
    '&&> div': {
      width: width,
      height: height,

      $nest: {
        '> span': {
          margin: '0',
          width: width,
          height: height,
        }
      }
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
      emoji: new Attribute({ default: {
        shortcut: '',
        type: '',
        category: '',
        order: 0,
        representation: {}
      }})
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
    ReactDOM.render(<Emoji {...node.attrs} />, dom);
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
