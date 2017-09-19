import { Plugin, PluginKey } from '../../../prosemirror';
import { EditorPlugin } from '../../types';
import { confluenceJiraIssue } from '../../../schema/nodes/confluence-jira-issue';
import { nodeViewFactory, ReactJIRAIssueNode } from '../../../nodeviews';

export const pluginKey = new PluginKey('jiraIssuePlugin');

const createPlugin = (schema, providerFactory) => {
  return new Plugin({
    key: pluginKey,
    props: {
      nodeViews: {
        confluenceJiraIssue: nodeViewFactory(providerFactory, { confluenceJiraIssue: ReactJIRAIssueNode })
      }
    }
  });
};

const jiraIssuePlugin: EditorPlugin = {
  nodes() {
    return [
      { rank: 1400, name: 'confluenceJiraIssue', node: confluenceJiraIssue  },
    ];
  },

  pmPlugins() {
    return [
      { rank: 1410, plugin: (schema, props, dispatch, providerFactory) => createPlugin(schema, providerFactory) }
    ];
  }
};

export default jiraIssuePlugin;
