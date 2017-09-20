import { EditorPlugin, EditorProps } from '../../types';
import { Plugin, PluginKey, Transaction, EditorState } from '../../../prosemirror';

export const pluginKey = new PluginKey('themePlugin');

export function createPlugin({ theme }: EditorProps) {
  return new Plugin({
    key: pluginKey,
    state: {
      init() {
        return { theme };
      },
      apply(tr: Transaction, value: any, state: EditorState<any>) {
        const currentState = pluginKey.getState(state);
        return currentState;
      }
    }
  });
}

const theme: EditorPlugin = {
  pmPlugins() {
    return [
      { rank: 2300, plugin: (schema, props, dispatch) => createPlugin(props) },
    ];
  },
};

export default theme;
