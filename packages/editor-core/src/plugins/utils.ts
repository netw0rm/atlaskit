import { EditorView, Plugin } from '../prosemirror';

export function reconfigure(view: EditorView, plugins: (Plugin | undefined)[]): void {
  const { state } = view;
  const existingPlugins = state.plugins;
  plugins = plugins.filter((plugin) => (plugin && existingPlugins.indexOf(plugin) === -1));

  if (plugins.length === 0) {
    return;
  }

  plugins = existingPlugins.concat(plugins as Plugin[]);
  const newState = state.reconfigure({
    schema: state.schema,
    plugins: plugins
  });

  view.updateState(newState);
}
