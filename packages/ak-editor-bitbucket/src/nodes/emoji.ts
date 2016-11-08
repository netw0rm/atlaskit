import { Inline, Attribute, Node } from 'ak-editor-prosemirror';
import { EntityAttributes, EntityNode, EntityNodeType, ParseSpec } from './entity';

export class EmojiNodeType extends EntityNodeType {
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

export interface EmojiNode extends EntityNode {
  type: EmojiNodeType;
}
