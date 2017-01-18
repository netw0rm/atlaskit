import { Inline, Attribute, Node, Schema } from '../../prosemirror';

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
    };
  }

  get matchDOMTag() {
    return {
      'span[emoji-id]': (dom: Element) => ({
        id: dom.getAttribute('emoji-id')!
      })
    };
  }
}

export interface EmojiNode extends Node {
  type: EmojiNodeType;
  attrs: {
    id: string;
  };
}
