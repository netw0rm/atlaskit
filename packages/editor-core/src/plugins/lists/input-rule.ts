import {
  Schema, inputRules, Plugin, wrappingInputRule, NodeType, InputRule, EditorState
} from '../../prosemirror';
import { trackAndInvoke } from '../../analytics';
import { defaultInputRuleHandler } from '../utils';

let plugin: Plugin | undefined;

function createListInputRule(regexp: RegExp, nodeType: NodeType): InputRule {
  const inputRule = defaultInputRuleHandler(
    wrappingInputRule(regexp, nodeType, {}, (_, node) => node.type === nodeType)
  );
  const originalHandler = inputRule.handler;
  inputRule.handler = (state: EditorState<any>, match, start, end) => {
    const { $from } = state.selection;
    const { listItem, paragraph } = state.schema.nodes;
    if (
      // Disable list inside list (only in first paragraph)
      ($from.node($from.depth - 1).type === listItem && $from.index($from.depth - 1) === 0) ||
      // Only allow list inside a paragraph
      $from.parent.type !== paragraph
    ) {
      return;
    }
    return originalHandler(state, match, start, end);
  };
  return inputRule;
}

export default function inputRulePlugin(schema: Schema<any, any>): Plugin {
  if (plugin) {
    return plugin;
  }

  const rules: InputRule[] = [];

  if (schema.nodes.bulletList) {
    // NOTE: we decided to restrict the creation of bullet lists to only "*"x
    const rule = createListInputRule(/^\s*(\*) $/, schema.nodes.bulletList);
    rule.handler = trackAndInvoke('atlassian.editor.format.list.bullet.autoformatting', rule.handler);
    rules.push(rule);
  }

  if (schema.nodes.orderedList) {
    // NOTE: There is a built in input rule for ordered lists in ProseMirror. However, that
    // input rule will allow for a list to start at any given number, which isn't allowed in
    // markdown (where a ordered list will always start on 1). This is a slightly modified
    // version of that input rule.
    const rule = createListInputRule(/^(\d+)\. $/, schema.nodes.orderedList);
    rule.handler = trackAndInvoke('atlassian.editor.format.list.numbered.autoformatting', rule.handler);
    rules.push(rule);
  }

  plugin = inputRules({ rules });

  return plugin;
};
