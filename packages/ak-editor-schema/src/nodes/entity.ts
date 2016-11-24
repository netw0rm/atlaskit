import { Inline, Attribute, Node } from 'ak-editor-prosemirror';

export interface EntityAttributes {
  id: any;
  entityType: any;
}

export interface ParseSpec {
  [index: string]: (dom: Element) => EntityAttributes;
}

export interface DOMAttributes {
  [propName: string]: string;
}

export class EntityNodeType extends Inline {
  get attrs(): EntityAttributes {
    return {
      id: new Attribute({ default: '' }),
      entityType: new Attribute({ default: 'entity' })
    };
  }

  toDOM(node: EntityNode): [string, DOMAttributes] {
    let attrs: DOMAttributes = {
      'editor-entity-type': node.attrs.entityType,
      'editor-entity-id': node.attrs.id,
      contenteditable: 'false',
    };
    return ['span', attrs];
  }
}

export interface EntityNode extends Node {
  type: EntityNodeType;
  attrs: {
    id: string;
    entityType: string
  }
}
