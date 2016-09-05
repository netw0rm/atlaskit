import { Inline, Attribute, Node as PMNode } from 'prosemirror/dist/model';

interface MentionAttributes {
  data: any;
  hydrate: any;
}

interface ParseSpec {
  [index: string]: (dom: Element) => MentionAttributes;
}

interface DOMAttributes {
  [propName: string]: string;
}

export class Mention extends Inline {
  get attrs(): MentionAttributes {
    return {
      data: new Attribute({default: ''}),
      hydrate: new Attribute({default: true})
    };
  }
  get matchDOMTag(): ParseSpec {
    return { 'span[editor-node-type=mention]': (dom: Element): MentionAttributes => {
      return {
        data: dom.getAttribute('editor-data'),
        hydrate: dom.getAttribute('editor-hydrate') === 'true'
      };
    }};
  }
  toDOM(node: PMNode): [string, DOMAttributes] {
    let attrs: DOMAttributes = {
      'editor-data': node.attrs.data,
      'contenteditable': 'false',
      'editor-node-type': 'mention'
    };

    if (node.attrs.hydrate as boolean) {
      attrs['editor-hydrate'] = 'true';
    }
    return ['span', attrs];
  }
}
