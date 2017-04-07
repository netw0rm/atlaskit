import {
  akBorderRadius,
  akColorN30,
  akColorN50,
} from '@atlaskit/util-shared-styles';
import { NodeSpec } from '@atlaskit/editor-core';
import { JiraLogo } from '@atlaskit/logo';
import { render } from 'react-dom';
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
  height: '24px',
  width: '24px',

  $nest: {
    '&>div': {
      height: '24px',
      width: '24px',
    }
  }
});

function getSVGIcon(): Element {
  const jiraReactElement = JiraLogo({ size: 'small', collapseTo: 'icon' });
  const container = document.createElement('div');
  const jiraIcon = render(jiraReactElement, container);

  return container.firstChild;
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
        { class: svgChildNodeClassName },
        getSVGIcon()
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
