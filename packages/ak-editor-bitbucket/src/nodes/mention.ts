import { Inline, Attribute, Node } from 'ak-editor-prosemirror';
import { EntityAttributes, EntityNode, EntityNodeType, ParseSpec } from './entity';

export class MentionNodeType extends EntityNodeType {
  get attrs() {
    return {
      id: new Attribute({ default: '' }),
      entityType: new Attribute({ default: 'mention' }),
      displayName: new Attribute({ default: '' }),
    };
  }

  get matchDOMTag(): ParseSpec {
    return {
      'span[editor-entity-type=mention]': (dom: Element) => {
        return {
          id: dom.getAttribute('editor-entity-id'),
          entityType: dom.getAttribute('editor-entity-type'),
          displayName: dom.getAttribute('editor-mention-display-name'),
        };
      }
    };
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
