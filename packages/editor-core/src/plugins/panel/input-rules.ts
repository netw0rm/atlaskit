import { Schema, InputRule, inputRules, Plugin, EditorState } from '../../prosemirror';

const availablePanelTypes = ['info', 'note', 'tip', 'warning'];
let plugin: Plugin | undefined;

export function inputRulePlugin(schema: Schema<any, any>): Plugin | undefined {
  if (plugin) {
    return plugin;
  }

  const panelInputRule = new InputRule(
    /^\{(\S+)\}$/, (
      state: EditorState<any>,
      match: Object | undefined,
      start: number,
      end: number
    ) => {
    const panelType = match && match[1];

    if (panelType && availablePanelTypes.indexOf(panelType) >= 0) {
      const { schema } = state;
      let { tr } = state;
      const { panel } = schema.nodes;
      if (panel) {
        const { $from } = state.selection;
        let range = $from.blockRange($from)!;
        tr = tr.wrap(range, [{ type: panel, attrs: { panelType } }]);
        tr = tr.delete(end - (panelType.length + 2), end + 1);
        return tr;
      }
    }
  });

  plugin = inputRules({ rules: [panelInputRule]});
  return plugin;
};

export default inputRulePlugin;
