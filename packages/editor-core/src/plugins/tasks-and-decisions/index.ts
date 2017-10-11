import {
  Schema,
  Plugin,
  PluginKey,
} from '../../prosemirror';
import inputRulePlugin from './input-rules';
import keymapsPlugin from './keymaps';
import { taskItemNodeView, decisionItemNodeView } from '../../nodeviews';
import uuid from './uuid';

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
    /*
     * After each transaction, we search through the document for any decisionList/Item & taskList/Item nodes
     * that do not have the localId attribute set and generate a random UUID to use. This is to replace a previous
     * Prosemirror capabibility where node attributes could be generated dynamically.
     * See https://discuss.prosemirror.net/t/release-0-23-0-possibly-to-be-1-0-0/959/17 for a discussion of this approach.
     *
     * Note: we currently do not handle the edge case where two nodes may have the same localId
     */
    appendTransaction: (transactions, oldState, newState) => {
      const tr = newState.tr;
      let modified = false;
      // Adds a unique id to a node
      newState.doc.descendants((node, pos) => {
        const { decisionList, decisionItem, taskList, taskItem } = newState.schema.nodes;
        if (!!node.type && (node.type === decisionList || node.type === decisionItem || node.type === taskList || node.type === taskItem)) {
          const { localId, ...rest} = node.attrs;
          if (localId === undefined || localId === null || localId === '') {
            tr.setNodeMarkup(pos, undefined, { localId: uuid.generate(), ...rest });
            modified = true;
          }
        }
      });

      if (modified) {
        return tr;
      }
    }
  });
}

const plugins = (schema: Schema<any, any>) => {
  return [createPlugin(), inputRulePlugin(schema), keymapsPlugin(schema)].filter((plugin) => !!plugin) as Plugin[];
};

export default plugins;
