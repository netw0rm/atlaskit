import { Schema, inputRules, Plugin, wrappingInputRule, NodeType, InputRule } from '../../prosemirror';
import { trackAndInvoke } from '../../analytics';

let plugin: Plugin | undefined;

export function createInputRule(regexp: RegExp, nodeType: NodeType): InputRule {
  return wrappingInputRule(regexp, nodeType, {}, (_, node) => node.type === nodeType);
}

export default function inputRulePlugin(schema: Schema<any, any>): Plugin {
  if (plugin) {
    return plugin;
  }

  const rules: InputRule[] = [];

  if (schema.nodes.bulletList) {
    // NOTE: we decided to restrict the creation of bullet lists to only "*"x
    const rule = createInputRule(/^\s*(\*) $/, schema.nodes.bulletList);
    rule.handler = trackAndInvoke('atlassian.editor.format.list.bullet.autoformatting', rule.handler);
    rules.push(rule);
  }

  if (schema.nodes.orderedList) {
    // NOTE: There is a built in input rule for ordered lists in ProseMirror. However, that
    // input rule will allow for a list to start at any given number, which isn't allowed in
    // markdown (where a ordered list will always start on 1). This is a slightly modified
    // version of that input rule.
    const rule = createInputRule(/^(\d+)\. $/, schema.nodes.orderedList);
    rule.handler = trackAndInvoke('atlassian.editor.format.list.numbered.autoformatting', rule.handler);
    rules.push(rule);
  }

  plugin = inputRules({ rules });

  return plugin;
};
