import { Schema, inputRules, InputRule, Plugin, EditorState } from '../../prosemirror';
import { analyticsService } from '../../analytics';
import { createInputRule } from '../utils';

export function inputRulePlugin(schema: Schema<any, any>): Plugin {
  const rules: InputRule[] = [];

  const { decisionList, decisionItem } = schema.nodes;
  if (decisionList && decisionItem) {
    const decisionInputRule = createInputRule(
      /^\<\>\s$/, (
        state: EditorState<any>,
        match: Object | undefined,
        start: number,
        end: number
      ) => {
        const { tr } = state;

        const { $from } = state.selection;
        const where = $from.before($from.depth);

        analyticsService.trackEvent('atlassian.editor.decisionlist.autoformatting');
        const content = $from.node($from.depth).content;
        tr
          .delete(where, $from.end($from.depth))
          .replaceSelectionWith(decisionList.create({}, [decisionItem.create({}, content)]))
          .delete(start + 1, end + 1)
          ;
        return tr;
      }
    );
    rules.push(decisionInputRule);
  }

  return inputRules({ rules });
}

export default inputRulePlugin;
