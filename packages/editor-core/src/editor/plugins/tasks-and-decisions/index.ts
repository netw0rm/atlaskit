import { EditorPlugin } from '../../types';
import { decisionList } from '../../../schema/nodes/decision-list';
import { decisionItem } from '../../../schema/nodes/decision-item';
import { taskList } from '../../../schema/nodes/task-list';
import { taskItem } from '../../../schema/nodes/task-item';
import { createPlugin } from '../../../plugins/tasks-and-decisions';
import inputRulePlugin from '../../../plugins/tasks-and-decisions/input-rules';
import keymap from '../../../plugins/tasks-and-decisions/keymaps';

const tasksAndDecisionsPlugin: EditorPlugin = {
  nodes() {
    return [
      { name: 'decisionList', node: decisionList, rank: 1800 },
      { name: 'decisionItem', node: decisionItem, rank: 1900 },
      { name: 'taskList', node: taskList, rank: 2000 },
      { name: 'taskItem', node: taskItem, rank: 2100 }
    ];
  },

  pmPlugins() {
    return [
      { rank: 500, plugin: (schema, props, providerFactory) => createPlugin() },
      { rank: 510, plugin: schema => inputRulePlugin(schema) },
      { rank: 9800, plugin: schema => keymap(schema) } // Needs to be after "save-on-enter"
    ];
  }
};

export default tasksAndDecisionsPlugin;
