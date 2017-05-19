import {
  akBorderRadius,
  akColorN30,
  akColorN50,
} from '@atlaskit/util-shared-styles';
import { NodeSpec, NodeView } from '@atlaskit/editor-core';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styled from 'styled-components';

// tslint:disable-next-line:variable-name
const BlockNode = styled.div`
  align-items: center;
  background: ${akColorN30};
  border: 1px dashed ${akColorN50};
  border-radius: ${akBorderRadius};
  box-sizing: border-box;
  cursor: default;
  display: block;
  font-size: 13px;
  margin: 10px 0;
  min-height: 24px;
  padding: 10px;
  text-align: center;
  user-select: all;
  vertical-align: text-bottom;
  white-space: nowrap;

  $nest: {
    '&.ProseMirror-selectednode': {
      background: ${akColorN50};
      outline: none;
    }
  }
`;

export default {
  group: 'block',
  attrs: { cxhtml: { default: null } },
  toDOM(node): [string, any, string] {
    // NOTE: This node cannot be "contenteditable: false". If it's the only node in a document, PM throws an error because there's nowhere to put the cursor.
    const attrs = {
      'data-node-type': 'unsupportedBlock',
      'data-unsupported': 'block',
      'data-unsupported-block-cxhtml': node.attrs['cxhtml'],
    };
    return ['div', attrs, 'Unsupported content'];
  },
  parseDOM: [
    {
      tag: 'div[data-node-type="unsupportedBlock"]',
      getAttrs(dom: HTMLElement) {
        return { cxhtml: dom.getAttribute('data-unsupported-block-cxhtml')! };
      }
    }
  ]
} as NodeSpec;

export const unsupportedBlockNodeView = (node: any, view: any, getPos: () => number): NodeView => {
  const { nodeType, unsupported, unsupportedBlockCxhtml } = node.attrs;
  let dom: HTMLElement | undefined = document.createElement('div');
  dom.dataset.nodeType = nodeType;
  dom.dataset.unsupported = unsupported;
  dom.dataset.unsupportedBlockCxhtml = unsupportedBlockCxhtml;
  dom.setAttribute('spellcheck', 'false');

  ReactDOM.render(
    <BlockNode>Unsupported content</BlockNode>,
    dom
  );

  return {
    get dom() {
      return dom;
    },

    destroy() {
      ReactDOM.unmountComponentAtNode(dom!);
      dom = undefined;
    }
  };
};
