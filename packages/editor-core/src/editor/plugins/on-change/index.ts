import { EditorView, EditorState, Plugin, PluginKey } from '../../../prosemirror';
import { EditorPlugin } from '../../types';

export const pluginKey = new PluginKey('onChangePlugin');

export function createPlugin(onChange?: (editorView: EditorView) => void): Plugin | undefined {
  if (!onChange) {
    return;
  }

  let view;

  return new Plugin({
    key: pluginKey,
    state: {
      init(config, state: EditorState<any>) {
        return state;
      },
      apply(tr, value, oldState, newState) {
        if (tr.docChanged) {
          onChange(view);
        }
        return value;
      }
    },
    view(editorView: EditorView) {
      view = editorView;
      return {};
    }
  });
}

const onChangePlugin: EditorPlugin = {
  pmPlugins() {
    return [
      { rank: 200, plugin: (schema, props) => createPlugin(props.onChange)}
    ];
  }
};

export default onChangePlugin;
