import { EditorPlugin } from '../../types';
import { decisionList } from '../../../schema/nodes/decision-list';
import { decisionItem } from '../../../schema/nodes/decision-item';
import { createPlugin } from '../../../plugins/tasks-and-decisions';
import inputRulePlugin from '../../../plugins/tasks-and-decisions/input-rules';
import keymap from '../../../plugins/tasks-and-decisions/keymaps';

const tasksAndDecisionsPlugin: EditorPlugin = {
  nodes() {
    return [
      { name: 'decisionList', node: decisionList, rank: 1800 },
      { name: 'decisionItem', node: decisionItem, rank: 1900 }
    ];
  },

  pmPlugins() {
    return [
      { rank: 500, plugin: (schema, props, providerFactory) => createPlugin() },
      { rank: 510, plugin: schema => inputRulePlugin(schema) },
      { rank: 520, plugin: schema => keymap(schema) }
    ];
  }
};

export default tasksAndDecisionsPlugin;
