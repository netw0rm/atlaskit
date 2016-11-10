import { Inline, Attribute, Node } from 'ak-editor-prosemirror';

interface EntityAttributes {
  id: any;
  entityType: any;
}

interface MentionAttributes {
  id: any;
  entityType: any;
  displayName: any;
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
      id: new Attribute({ default: '' }),
      entityType: new Attribute({ default: 'entity' })
    };
  }

  toDOM(node: Node): [string, DOMAttributes] {
    let attrs: DOMAttributes = {
      'editor-entity-type': node.attrs.entityType,
      'editor-entity-id': node.attrs.id,
      'contenteditable': 'false',
    };
    return ['span', attrs];
  }
}

export class Mention extends Entity {
  get attrs(): MentionAttributes {
    return {
      id: new Attribute({ default: '' }),
      entityType: new Attribute({ default: 'mention' }),
      displayName: new Attribute({ default: '' }),
    };
  }

  get matchDOMTag(): ParseSpec {
    return {
      'span[editor-entity-type=mention]': (dom: Element): MentionAttributes => {
        return {
          id: dom.getAttribute('editor-entity-id'),
          entityType: dom.getAttribute('editor-entity-type'),
          displayName: dom.getAttribute('editor-mention-display-name'),
        };
      }
    };
  }
}

export class Emoji extends Entity {
  get attrs(): EntityAttributes {
    return {
      id: new Attribute({ default: '' }),
      entityType: new Attribute({ default: 'emoji' }),
    };
  }

  get matchDOMTag(): ParseSpec {
    return {
      'span[editor-entity-type=emoji]': (dom: Element): EntityAttributes => {
        return {
          id: dom.getAttribute('editor-entity-id'),
          entityType: dom.getAttribute('editor-entity-type'),
        };
      }
    };
  }
}
