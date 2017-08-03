import {
  Schema,
  Plugin,
  PluginKey,
} from '../../prosemirror';
import inputRulePlugin from './input-rules';
import keymapsPlugin from './keymaps';
import { taskItemNodeView, decisionItemNodeView } from '../../nodeviews';

export const stateKey = new PluginKey('tasksAndDecisionsPlugin');

export function createPlugin(){
  return new Plugin({
    props: {
      nodeViews: {
        taskItem: taskItemNodeView,
        decisionItem: decisionItemNodeView
      },
    },
    key: stateKey,
  });
}

const plugins = (schema: Schema<any, any>) => {
  return [createPlugin(), inputRulePlugin(schema), keymapsPlugin(schema)].filter((plugin) => !!plugin) as Plugin[];
};

export default plugins;
