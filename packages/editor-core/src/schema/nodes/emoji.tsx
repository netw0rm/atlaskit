import { ResourcedEmoji, ResourcedEmojiShortcut, EmojiPlaceholder } from '@atlaskit/emoji';
import { EmojiId, EmojiProvider } from '@atlaskit/emoji';
import {
  akColorN50,
} from '@atlaskit/util-shared-styles';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { style, types as styleTypes } from 'typestyle';
import { Attribute, Inline, Node, Schema } from '../../prosemirror';
import { ParseSpec } from '../../prosemirror/model/from_dom';

const width = '20px';
const height = '20px';

export interface EmojiNodeAttr {
  id?: string;
  variation?: number;
  shortcut?: string;
}

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
    },

    // placeholder
    '> svg': {
      margin: '0',
      width: width,
      height: height,

      $nest: {
        'circle': {
          r: '16',
        } as styleTypes.NestedCSSProperties,
      },
    },
  }
});

const extractAttributes = (dom: Element): ParseSpec => ({
  id: dom.getAttribute('data-emoji-id')!,
  shortcut: dom.getAttribute('data-emoji-shortcut')!,
  variation: dom.getAttribute('data-emoji-variation')!,
});

export class EmojiNodeType extends Inline {
  private emojiProvider: Promise<EmojiProvider>;

  constructor(name: string, schema: Schema) {
    super(name, schema);
    if (name !== 'emoji') {
      throw new Error('EmojiNodeType must be named "emoji".');
    }
  }

  setEmojiProvider = (provider: Promise<EmojiProvider>) => {
    this.emojiProvider = provider;
  }

  get attrs() {
    return {
      id: new Attribute({ default: '' }),
      variation: new Attribute({ default: 0 }),
      shortcut: new Attribute({ default: '' }),
    };
  }

  get matchDOMTag() {
    return {
      'span[data-emoji-id]': (dom: Element) => extractAttributes(dom),
      'span[data-emoji-shortcut]': (dom: Element) => extractAttributes(dom),
    };
  }

  toDOM(node: Node): any {
    const { id, variation, shortcut } = node.attrs;
    const dom = document.createElement('span');
    dom.setAttribute('contenteditable', 'false');
    dom.classList.add(emojiStyle);
    id && dom.setAttribute('data-emoji-id', id);
    shortcut && dom.setAttribute('data-emoji-shortcut', shortcut);
    variation && dom.setAttribute('data-emoji-variation', variation);
    if (id) {
      const emojiId: EmojiId = {
        id,
        variation: isNaN(variation) ? undefined : +variation, // coerce possible string to number, undefined if NaN
      };
      ReactDOM.render(<ResourcedEmoji emojiId={emojiId} emojiProvider={this.emojiProvider} />, dom);
    } else if (shortcut) {
      ReactDOM.render(<ResourcedEmojiShortcut shortcut={shortcut} emojiProvider={this.emojiProvider} />, dom);
    } else {
      ReactDOM.render(<EmojiPlaceholder title="" />, dom);
    }
    return dom;
  }
}

export interface EmojiNode extends Node {
  type: EmojiNodeType;
  attrs: EmojiNodeAttr;
}

export function isEmojiNode(node: Node): node is EmojiNode {
  return node.type instanceof EmojiNodeType;
}
