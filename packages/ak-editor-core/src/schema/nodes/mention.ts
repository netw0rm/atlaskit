import { style } from 'typestyle';
import {
  akColorB400,
  akColorN30,
  akColorN50,
} from 'akutil-shared-styles';
import { Inline, Attribute, Node, Schema } from '../../prosemirror';

const mentionStyle = style({
  background: akColorN30,
  borderRadius: '20px',
  color: akColorB400,
  padding: '0 4px',
  userSelect: 'all',

  $nest:{
    '&.ProseMirror-selectednode': {
      background: akColorN50,
      outline: 'none'
    }
  }
});

export interface MentionAttributes {
  id: any;
  displayName: any;
}

export interface ParseSpec {
  [index: string]: (dom: Element) => MentionAttributes;
}

export interface DOMAttributes {
  [propName: string]: string;
}

export class MentionNodeType extends Inline {
  constructor(name: string, schema: Schema) {
    super(name, schema);
    if (name !== 'mention') {
      throw new Error('MentionNodeType must be named "mention".');
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
      'class': mentionStyle,
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
  text: string;
}
