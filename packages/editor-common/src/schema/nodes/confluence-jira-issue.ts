import { NodeSpec } from 'prosemirror-model';

const name = 'confluenceJiraIssue';

export const confluenceJiraIssue = {
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
    tag: `span[data-node-type="${name}"]`,
    getAttrs: (dom: HTMLElement) => ({
      issueKey: dom.textContent || confluenceJiraIssue.attrs.issueKey.default,
      macroId: dom.dataset.macroId || confluenceJiraIssue.attrs.macroId.default,
      schemaVersion: dom.dataset.schemaVersion || confluenceJiraIssue.attrs.schemaVersion.default,
      server: dom.dataset.server || confluenceJiraIssue.attrs.server.default,
      serverId: dom.dataset.serverId || confluenceJiraIssue.attrs.serverId.default
    })
  }],
  toDOM(node: any) {
    const attrs = {
      'data-node-type': name,
      'data-macro-id': node.attrs.macroId,
      'data-schema-version': node.attrs.schemaVersion,
      'data-server': node.attrs.server,
      'data-server-id': node.attrs.serverId,
      'data-jira-issue': node.attrs.issueKey,
    };

    return ['span', attrs, node.attrs.issueKey];
  }
} as NodeSpec;
