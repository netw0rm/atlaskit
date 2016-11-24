import { Inline, Attribute, Node, Schema } from 'ak-editor-prosemirror';

export interface EmojiAttributes {
  id: any;
}

interface ParseSpec {
  [index: string]: (dom: Element) => EmojiAttributes;
}

interface DOMAttributes {
  [propName: string]: string;
}

export class EmojiNodeType extends Inline {
  constructor(name: string, schema: Schema) {
    super(name, schema);
    if (name !== 'emoji') {
      throw new Error("EmojiNodeType must be named 'emoji'.");
    }
  }

  get attrs(): EmojiAttributes {
    return {
      id: new Attribute({ default: '' }),
    };
  }

  get matchDOMTag(): ParseSpec {
    return {
      'span[emoji-id]': (dom: Element) => {
        return {
          id: dom.getAttribute('emoji-id')
        };
      }
    };
  }
}

export interface EmojiNode extends Node {
  type: EmojiNodeType;
  attrs: {
    id: string;
  }
}
