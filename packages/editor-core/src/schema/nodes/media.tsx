import {
  Node as PMNode,
  NodeSpec,
} from '../../prosemirror';

export type MediaType = 'file' | 'link';

export interface Attributes {
  id: string;
  type: MediaType;
  collection: string;
}

export const media: NodeSpec = {
  inline: false,
  selectable: true,
  attrs: {
    id: { default: '' },
    type: { default: '' },
    collection: { default: null }
  },
  parseDOM: [{
    tag: 'div[data-node-type="media"]',
    getAttrs: (dom: Element) => ({
      id: (dom.getAttribute('data-id')! || ''),
      type: dom.getAttribute('data-type')!,
      collection: dom.getAttribute('data-collection')!
    })
  }],
  toDOM(node: MediaNode) {
    const attrs = {
      'data-id': node.attrs.id,
      'data-node-type': 'media',
      'data-type': node.attrs.type,
      'data-collection': node.attrs.collection,
      // toDOM is used for static rendering as well as editor rendering. This comes into play for
      // emails, copy/paste, etc, so the title and styling here *is* useful (despite a React-based
      // node view being used for editing).
      'title': 'Attachment',
      // Manually kept in sync with the style of media cards. The goal is to render a plain grey
      // rectangle that provides an affordance for media.
      'style': 'display: inline-block; border-radius: 3px; background: #EBECF0; height: 104px; width: 156px; box-shadow: 0 1px 1px rgba(9, 30, 66, 0.2), 0 0 1px 0 rgba(9, 30, 66, 0.24);'
    };

    if (node.fileName) {
      attrs['file-name'] = node.fileName;
    }

    if (node.fileSize) {
      attrs['file-size'] = `${node.fileSize}`;
    }

    if (node.fileMimeType) {
      attrs['file-mime-type'] = node.fileMimeType;
    }

    return ['div', attrs];
  },
};
