import { EditorState, Plugin, Transaction } from '../prosemirror';

export function reconfigure(view: EditorView, plugins: (Plugin | undefined)[]): void {
  const { state } = view;
  const existingPlugins = state.plugins;
  plugins = plugins.filter((plugin) => (plugin && existingPlugins.indexOf(plugin) === -1));

  if (plugins.length === 0) {
    return;
  }

  plugins = (plugins as Plugin[]).concat(existingPlugins);
  const newState = state.reconfigure({
    schema: state.schema,
    plugins: plugins
  });

  view.updateState(newState);
}

export function liftBlock(state: EditorState<any>): Transaction {
  const { tr } = state;
  const { $from, $to } = state.selection;
  const range = $from.blockRange($to)!;
  return tr.lift(range, $from.depth - 2);
}
