import { NodeSelection, Schema, inputRules, InputRule, Plugin, EditorState } from '../../prosemirror';
import { analyticsService } from '../../analytics';
import { createInputRule, leafNodeReplacementCharacter } from '../utils';

export function inputRulePlugin(schema: Schema<any, any>): Plugin {
  const rules: InputRule[] = [];

  const { decisionList, decisionItem, paragraph, hardBreak } = schema.nodes;
  if (decisionList && decisionItem) {
    const regex = new RegExp(`(^|${leafNodeReplacementCharacter})\\<\\>\\s$`);
    const decisionInputRule = createInputRule(
      regex, (
        state: EditorState<any>,
        match: Object | undefined,
        start: number,
        end: number
      ) => {
        const { tr } = state;

        const { $from } = state.selection;

        // Only allow creating decisionList from top-level paragraphs
        if ($from.node(1).type !== paragraph) {
          return;
        }

        const where = $from.before($from.depth);

        analyticsService.trackEvent('atlassian.editor.decisionlist.autoformatting');
        const content = $from.node($from.depth).content;
        let shouldBreakNode = false;

        content.forEach((node, offset) => {
          if (node.type === hardBreak && offset < start) {
            shouldBreakNode = true;
          }
        });

        if (!shouldBreakNode) {
          tr
            .delete(where, $from.end($from.depth))
            .replaceSelectionWith(decisionList.create({}, [decisionItem.create({}, content)]))
            .delete(start + 1, end + 1)
          ;
        } else {
          tr
            .split($from.pos)
            .setSelection(new NodeSelection(tr.doc.resolve($from.pos + 1)))
            .replaceSelectionWith(decisionList.create({}, [decisionItem.create({}, tr.doc.nodeAt($from.pos + 1)!.content)]))
            .delete(start, end + 1)
          ;
        }

        return tr;
      }
    );
    rules.push(decisionInputRule);
  }

  return inputRules({ rules });
}

export default inputRulePlugin;
