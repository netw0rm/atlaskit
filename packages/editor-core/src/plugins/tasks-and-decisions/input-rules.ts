import { NodeSelection, Schema, inputRules, InputRule, Plugin, EditorState } from '../../prosemirror';
import { analyticsService } from '../../analytics';
import { createInputRule, leafNodeReplacementCharacter } from '../utils';
import uuid from '../../plugins/tasks-and-decisions/uuid';

const createListRule = (regex: RegExp, name: string, list: any, item: any, schema: Schema<any, any>) => {
  const { paragraph, hardBreak } = schema.nodes;

  return createInputRule(
      regex, (
        state: EditorState<any>,
        match: Object | undefined,
        start: number,
        end: number
      ) => {
        const { tr, selection: { $from } } = state;

        // Only allow creating list from top-level paragraphs
        if ($from.node(1).type !== paragraph) {
          return;
        }

        const where = $from.before($from.depth);

        analyticsService.trackEvent(`atlassian.editor.${name}.autoformatting`);
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
            .replaceSelectionWith(list.create({ localId: uuid.generate() }, [item.create({}, content)]))
            .delete(start + 1, end + 1)
          ;
        } else {
          tr
            .split($from.pos)
            .setSelection(new NodeSelection(tr.doc.resolve($from.pos + 1)))
            .replaceSelectionWith(list.create({ localId: uuid.generate() }, [item.create({}, tr.doc.nodeAt($from.pos + 1)!.content)]))
            .delete(start, end + 1)
          ;
        }

        return tr;
      }
    );
};

export function inputRulePlugin(schema: Schema<any, any>): Plugin {
  const rules: InputRule[] = [];

  const {
    decisionList,
    decisionItem,
    taskList,
    taskItem,
  } = schema.nodes;

  if (decisionList && decisionItem) {
    rules.push(createListRule(new RegExp(`(^|${leafNodeReplacementCharacter})\\<\\>\\s$`), 'decisionlist', decisionList, decisionItem, schema));
  }

  if (taskList && taskItem) {
    rules.push(createListRule(new RegExp(`(^|${leafNodeReplacementCharacter})\\[\\]\\s$`), 'tasklist', taskList, taskItem, schema));
  }

  return inputRules({ rules });
}

export default inputRulePlugin;
