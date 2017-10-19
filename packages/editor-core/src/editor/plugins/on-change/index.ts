import { Plugin, PluginKey } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { EditorPlugin } from '../../types';

export const pluginKey = new PluginKey('onChangePlugin');

export function createPlugin(onChange?: (editorView: EditorView) => void): Plugin | undefined {
  if (!onChange) {
    return;
  }

  let debounced: number | null = null;

  return new Plugin({
    key: pluginKey,
    view(editorView: EditorView) {
      return {
        update(editorView) {
          if (debounced) {
            clearTimeout(debounced);
          }

          debounced = setTimeout(() => onChange(editorView), 200);
        }
      };
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
