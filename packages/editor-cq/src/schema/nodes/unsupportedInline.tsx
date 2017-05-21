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
  display: inline-flex;
  font-size: 13px;
  margin: 0 2px;
  min-height: 24px;
  padding: 0 10px;
  user-select: all;
  vertical-align: middle;
  white-space: nowrap;

  '&.ProseMirror-selectednode' {
    background: ${akColorN50};
    outline: none;
  }
`;

export default {
  group: 'inline',
  inline: true,
  atom: true,
  attrs: { cxhtml: { default: null } },
  toDOM(node): [string, any, string] {
    const attrs = {
      'data-node-type': 'unsupportedInline',
      'data-unsupported': 'inline',
      'data-unsupported-inline-cxhtml': node.attrs['cxhtml'],
    };
    return ['div', attrs, 'Unsupported content'];
  },
  parseDOM: [
    {
      tag: 'div[data-node-type="unsupportedInline"]',
      getAttrs(dom: HTMLElement) {
        return { cxhtml: dom.getAttribute('data-unsupported-inline-cxhtml')! };
      }
    }
  ]
} as NodeSpec;

export const unsupportedInlineNodeView = (node: any): NodeView => {
  const { nodeType, unsupported, unsupportedBlockCxhtml } = node.attrs;
  let dom: HTMLElement | undefined = document.createElement('span');
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
