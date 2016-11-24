import { Inline, Attribute, Node, Schema } from 'ak-editor-prosemirror';
import { EntityAttributes, EntityNode, EntityNodeType, ParseSpec, DOMAttributes } from './entity';

export class MentionNodeType extends EntityNodeType {
  constructor(name: string, schema: Schema) {
    super(name, schema);
    if (name !== 'mention') {
      throw new Error("MentionNodeType must be named 'mention'.");
    }
  }

  get attrs() {
    return {
      id: new Attribute({ default: '' }),
      entityType: new Attribute({ default: 'mention' }),
      displayName: new Attribute({ default: '' })
    };
  }

  get matchDOMTag(): any {
    return {
      'span[editor-entity-type=mention]': (dom: Element) => {
        return {
          id: dom.getAttribute('editor-entity-id'),
          entityType: dom.getAttribute('editor-entity-type'),
          displayName: dom.textContent
        };
      }
    };
  }

  toDOM(node: MentionNode): [string, DOMAttributes] {
    let attrs: DOMAttributes = {
      'class': 'editor-entity-mention',
      'editor-entity-type': node.attrs.entityType,
      'editor-entity-id': node.attrs.id,
      'contenteditable': 'false',
    };
    return ['span', attrs, node.attrs.displayName];
  }
}

export interface MentionNode extends EntityNode {
  type: MentionNodeType;
  attrs: {
    id: string;
    entityType: string;
    displayName: string;
  };
}
