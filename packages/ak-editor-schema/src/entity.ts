import { Inline, Attribute, Node as PMNode } from 'ak-editor-prosemirror';

interface EntityAttributes {
  id: any;
  entityType: any;
}

interface ParseSpec {
  [index: string]: (dom: Element) => EntityAttributes;
}

interface DOMAttributes {
  [propName: string]: string;
}

export class Entity extends Inline {
  get attrs(): EntityAttributes {
    return {
      id: new Attribute({default: ''}),
      entityType: new Attribute({default: 'entity'})
    };
  }
  get matchDOMTag(): ParseSpec {
    return { 'span[editor-entity-type]': (dom: Element): EntityAttributes => {
      return {
        id: dom.getAttribute('editor-entity-id'),
        entityType: dom.getAttribute('editor-entity-type'),
      };
    }};
  }
  toDOM(node: PMNode): [string, DOMAttributes] {
    let attrs: DOMAttributes = {
      'editor-entity-id': node.attrs.id,
      'contenteditable': 'false',
      'editor-entity-type': node.attrs.entityType,
    };
    return ['span', attrs];
  }
}

export class Mention extends Entity {
  get attrs(): EntityAttributes {
    return {
      id: new Attribute({default: ''}),
      entityType: new Attribute({default: 'mention'}),
    };
  }
}

export class Emoji extends Entity {
  get attrs(): EntityAttributes {
    return {
      id: new Attribute({default: ''}),
      entityType: new Attribute({default: 'emoji'}),
    };
  }
}
