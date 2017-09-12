import { Plugin, PluginKey } from '../../../prosemirror';
import { EditorPlugin } from '../../types';
import { confluenceJiraIssue } from '../../../schema/nodes/confluence-jira-issue';
import { nodeViewFactory, ReactJIRAIssueNode } from '../../../nodeviews';

export const pluginKey = new PluginKey('jiraIssuePlugin');

export const jiraIssue = new Plugin({
  key: pluginKey,
  props: {
    nodeViews: {
      jiraIssue: nodeViewFactory(this.providerFactory, { jiraIssue: ReactJIRAIssueNode })
    }
  }
});

const jiraIssuePlugin: EditorPlugin = {
  nodes() {
    return [
      { rank: 1400, name: 'confluenceJiraIssue', node: confluenceJiraIssue  },
    ];
  },

  pmPlugins() {
    return [
      { rank: 1410, plugin: () => jiraIssue }
    ];
  }
};

export default jiraIssuePlugin;
