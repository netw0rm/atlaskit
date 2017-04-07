import {
  akBorderRadius,
  akColorN30,
  akColorN50,
} from '@atlaskit/util-shared-styles';
import { NodeSpec } from '@atlaskit/editor-core';

import { JiraSVGLogo } from '@atlaskit/logo';
import { style } from 'typestyle';

const nodeClassName = style({
  alignItems: 'center',
  background: akColorN30,
  border: `1px solid ${akColorN50}`,
  borderRadius: akBorderRadius,
  boxSizing: 'border-box',
  cursor: 'default',
  display: 'inline-flex',
  fontSize: '13px',
  margin: '0 2px',
  minHeight: 24,
  padding: '0 4px',
  verticalAlign: 'middle',
  whiteSpace: 'nowrap',

  $nest: {
    '&.ProseMirror-selectednode': {
      background: akColorN50,
      outline: 'none'
    }
  }
});

const jiraChildNodeClassName = style({
  color: '#707070',
  lineHeight: '24px',

  $nest: {
    '&:before': {
      color: 'black',
      content: '"JIRA | "',
    },
  },
});

const svgChildNodeClassName = style({
  backgroundImage: `url('data:image/svg+xml;utf8,${cleanSVGIcon()}')`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  height: '24px',
  width: '24px',
});

function cleanSVGIconNode(node: Node, target?: Element): Element {
  if (!target) {
    target = document.createElement('div');
  }

  if (node.nodeType === Node.ELEMENT_NODE) {
    if (node.nodeName !== 'title' && node.nodeName !== 'desc') {
      const clone = node.cloneNode() as Element;
      target.appendChild(clone);

      for (let i = 0; i < node.childNodes.length; i++) {
        cleanSVGIconNode(node.childNodes[i], clone);
      }
    }
  } else if (node.nodeType === Node.TEXT_NODE) {
    const nodeContents = node.nodeValue!.trim();

    if (nodeContents) {
      const clone = node.cloneNode();
      target.appendChild(clone);
    }
  }

  return target;
}

/**
 * Clean JIRA SVG icon of line breaks and comments
 * so it can be used inside CSS (hello svgo)
 */
function cleanSVGIcon(): string {
  const parser = new DOMParser();
  const svgTree = parser.parseFromString(JiraSVGLogo, 'text/xml');

  const wrapper = cleanSVGIconNode(svgTree.documentElement);
  return wrapper.innerHTML;
}

export default {
  group: 'inline',
  inline: true,
  atom: true,
  attrs: {
    issueKey: { default: null },
    macroId: { default: null },
    schemaVersion: { default: null },
    server: { default: null },
    serverId: { default: null },
  },
  toDOM(node): [string, any, any, any] {
    const attrs = {
      'class': nodeClassName,
      'data-macro-id': node.attrs.macroId,
      'data-schema-version': node.attrs.schemaVersion,
      'data-server': node.attrs.server,
      'data-server-id': node.attrs.serverId,
      'spellcheck': 'false',
    };

    return [
      'div',
      attrs,
      [
        'span',
        { class: svgChildNodeClassName }
      ],
      [
        'span',
        { class: jiraChildNodeClassName },
        node.attrs.issueKey
      ]
    ];
  },
  parseDOM: [
    {
      tag: 'div',
      getAttrs(dom: HTMLElement) {
        return {
          issueKey: dom.lastChild!.textContent,
          macroId: dom.getAttribute('data-macro-id'),
          schemaVersion: dom.getAttribute('data-schema-version'),
          server: dom.getAttribute('data-server'),
          serverId: dom.getAttribute('data-server-id'),
        };
      }
    }
  ]
} as NodeSpec;
