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

export class MentionNodeType extends Inline {
  constructor(name: string, schema: Schema) {
    super(name, schema);
    if (name !== 'mention') {
      throw new Error('MentionNodeType must be named "mention".');
    }
  }

  get attrs() {
    return {
      id: new Attribute({ default: '' }),
      displayName: new Attribute({ default: '' })
    };
  }

  get matchDOMTag() {
    return {
      'span[mention-id]': (dom: Element) => ({
        id: dom.getAttribute('mention-id')!,
        displayName: dom.textContent!
      })
    };
  }

  toDOM(node: Node): [string, any, string] {
    const mentionNode = node as MentionNode;
    let attrs = {
      'class': mentionStyle,
      'mention-id': mentionNode.attrs.id,
      'contenteditable': 'false',
    };
    return ['span', attrs, mentionNode.attrs.displayName];
  }
}

export interface MentionNode extends Node {
  type: MentionNodeType;
  attrs: {
    id: string;
    displayName: string;
  };
}
