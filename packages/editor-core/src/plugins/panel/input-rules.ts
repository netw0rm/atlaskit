import { Schema, inputRules, Plugin, EditorState, findWrapping } from '../../prosemirror';
import { analyticsService } from '../../analytics';
import { createInputRule } from '../utils';

const availablePanelTypes = ['info', 'note', 'tip', 'warning'];
let plugin: Plugin | undefined;

export function inputRulePlugin(schema: Schema<any, any>): Plugin | undefined {
  if (plugin) {
    return plugin;
  }

  const panelInputRule = createInputRule(
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
          const { $from, $to } = state.selection;
          let range = $from.blockRange($to)!;
          const wrapping = range && findWrapping(range, panel, { panelType }) as any;
          if (wrapping) {
            tr = tr.wrap(range, wrapping).scrollIntoView();
          }
          const mappedStart = tr.mapping.map(start);
          tr = tr.delete(mappedStart, mappedStart + panelType.length + 1);

          analyticsService.trackEvent(`atlassian.editor.format.panel.${panelType}.autoformatting`);

          return tr;
        }
      }
    });

  plugin = inputRules({ rules: [panelInputRule] });
  return plugin;
};

export default inputRulePlugin;
