import {
  akBorderRadius,
  akColorN30,
  akColorN50,
} from '@atlaskit/util-shared-styles';
import { NodeSpec, NodeView } from '@atlaskit/editor-core';
import { JiraLogo } from '@atlaskit/logo';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styled from 'styled-components';

// tslint:disable-next-line:variable-name
const WrapperNode = styled.span`
  align-items: center;
  background: ${akColorN30};
  border: 1px solid ${akColorN50};
  border-radius: ${akBorderRadius};
  box-sizing: border-box;
  cursor: default;
  display: inline-flex;
  font-size: 13px;
  margin: 0 2px;
  min-height: 24px;
  padding: 0 4px;
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;

  &.ProseMirror-selectednode: {
    background: ${akColorN50};
    outline: none;
  }
`;

// tslint:disable-next-line:variable-name
const JiraChildNode = styled.span`
  display: inline-block;
  color: #707070;
  line-height: 24px;
  vertical-align: top;

  &:before: {
    color: black;
    content: "JIRA | ";
  }
`;

// tslint:disable-next-line:variable-name
const SvgChildNode = styled.span`
  display: inline-block;
  height: 24px;
  verticalAlign: top;
  width: 24px;

  & > div: {
    height: 24px;
    width: 24px;
  }
`;

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
  dom.dataset.macroId = macroId;
  dom.dataset.schemaVersion = schemaVersion;
  dom.dataset.server = server;
  dom.dataset.serverId = serverId;
  dom.setAttribute('spellcheck', 'false');

  ReactDOM.render(
    <WrapperNode>
      <SvgChildNode>
        <JiraLogo size="small" collapseTo="icon"/>
      </SvgChildNode>
      <JiraChildNode>{issueKey}</JiraChildNode>
    </WrapperNode>,
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
