import { Inline, Attribute, Node, Schema } from 'ak-editor-prosemirror';

export interface MentionAttributes {
  id: any;
  displayName: any;
}

interface ParseSpec {
  [index: string]: (dom: Element) => MentionAttributes;
}

interface DOMAttributes {
  [propName: string]: string;
}

export class MentionNodeType extends Inline {
  constructor(name: string, schema: Schema) {
    super(name, schema);
    if (name !== 'mention') {
      throw new Error("MentionNodeType must be named 'mention'.");
    }
  }

  get attrs(): MentionAttributes {
    return {
      id: new Attribute({ default: '' }),
      displayName: new Attribute({ default: '' })
    };
  }

  get matchDOMTag(): ParseSpec {
    return {
      'span[mention-id]': (dom: Element) => {
        return {
          id: dom.getAttribute('mention-id'),
          displayName: dom.textContent
        };
      }
    };
  }

  toDOM(node: MentionNode): [string, DOMAttributes] {
    let attrs: DOMAttributes = {
      'class': 'editor-entity-mention',
      'mention-id': node.attrs.id,
      'contenteditable': 'false',
    };
    return ['span', attrs, node.attrs.displayName];
  }
}

export interface MentionNode extends Node {
  type: MentionNodeType;
  attrs: {
    id: string;
    displayName: string;
  };
}
