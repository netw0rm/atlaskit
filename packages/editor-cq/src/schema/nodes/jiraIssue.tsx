import {
  akBorderRadius,
  akColorN30,
  akColorN50,
} from '@atlaskit/util-shared-styles';
import { NodeSpec, NodeView } from '@atlaskit/editor-core';
import { JiraLogo } from '@atlaskit/logo';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
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
  userSelect: 'none',
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
  display: 'inline-block',
  color: '#707070',
  lineHeight: '24px',
  verticalAlign: 'top',

  $nest: {
    '&:before': {
      color: 'black',
      content: '"JIRA | "',
    },
  },
});

const svgChildNodeClassName = style({
  display: 'inline-block',
  height: '24px',
  verticalAlign: 'top',
  width: '24px',

  $nest: {
    '&>div': {
      height: '24px',
      width: '24px',
    }
  }
});

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
  parseDOM: [{
    tag: 'span[jira-issue]',
    getAttrs: (dom: HTMLElement) => ({
      issueKey: dom.textContent,
      macroId: dom.dataset.macroId,
      schemaVersion: dom.dataset.schemaVersion,
      server: dom.dataset.server,
      serverId: dom.dataset.serverId,
    })
  }],
  toDOM(node: any) {
    const attrs = {
      'data-macro-id': node.attrs.macroId,
      'data-schema-version': node.attrs.schemaVersion,
      'data-server': node.attrs.server,
      'data-server-id': node.attrs.serverId,
      'jira-issue': node.attrs.issueKey,
    };

    return ['span', attrs, node.attrs.issueKey];
  }
} as NodeSpec;

export const jiraIssueNodeView = (node: any, view: any, getPos: () => number): NodeView => {
  const { issueKey, macroId, schemaVersion, server, serverId } = node.attrs;

  let dom: HTMLElement | undefined = document.createElement('span');
  dom.setAttribute('class', nodeClassName);
  dom.dataset.macroId = macroId;
  dom.dataset.schemaVersion = schemaVersion;
  dom.dataset.server = server;
  dom.dataset.serverId = serverId;
  dom.setAttribute('spellcheck', 'false');

  ReactDOM.render(
    <span>
      <span className={svgChildNodeClassName}>
        <JiraLogo size="small" collapseTo="icon"/>
      </span>
      <span className={jiraChildNodeClassName}>{issueKey}</span>
    </span>,
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
