import { Plugin, PluginKey, Transaction } from '../../../prosemirror';
import { EditorPlugin } from '../../types';
import { Dispatch } from '../../event-dispatcher';

export const pluginKey = new PluginKey('maxContentSizePlugin');

export function createPlugin(
  dispatch: Dispatch,
  maxContentSize?: number,
  onMaxContentSize?: (isMaxContentSizeReached: boolean) => void
): Plugin | undefined {
  if (!maxContentSize) {
    return;
  }

  let maxContentSizeReached = false;

  return new Plugin({
    filterTransaction(tr: Transaction): boolean {
      const result = tr.doc && tr.doc.nodeSize > maxContentSize;

      if (result || result !== maxContentSizeReached) {
        dispatch(pluginKey, { maxContentSizeReached: result });
      }

      maxContentSizeReached = result;
      return !result;
    }
  });
}

const maxContentSizePlugin: EditorPlugin = {
  pmPlugins() {
    return [
      { rank: 10000, plugin: (schema, props, dispatch) => createPlugin(dispatch, props.maxContentSize)}
    ];
  }
};

export default maxContentSizePlugin;
