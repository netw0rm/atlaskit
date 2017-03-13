import { InputRule, inputRules, Plugin, Schema, Transaction, MarkType, Node } from '../../prosemirror';
import { analyticsService } from '../../analytics';

function addMark(markType: MarkType, schema: Schema<any, any>, specialChar: string): Function {
  return (state, match, start, end): Transaction | null => {
    const from = start;
    const to = from + match[0].length;
    const charSize = specialChar.length;
    const nodes: Node[] = [];

    state.doc.nodesBetween(start, end, (node) => {
      if (node.isText) {
        nodes.push(node);
      }
    });

    // treat special characters inside marks as plaint text
    if (nodes.length > 1 && nodes[0].marks.length && (nodes[0].text || '').indexOf(specialChar) > -1) {
      return null;
    }

    analyticsService.trackEvent(`atlassian.editor.format.${markType.name}.autoformatting`);

    return state.tr
      .addMark(from, to, markType.create())
      .delete(from, from + charSize)
      .delete(to - charSize * 2, to - charSize)
      .removeStoredMark(markType);
  };
};

let plugin: Plugin | undefined;

export function inputRulePlugin(schema: Schema<any, any>): Plugin | undefined {
  if (plugin) {
    return plugin;
  }

  const rules: Array<InputRule> = [];

  if (schema.marks.strong) {
    // **string** should bold the text
    rules.push(new InputRule(/(\*\*([^\*]+)\*\*)$/, addMark(schema.marks.strong, schema, '**')));
  }

  if (schema.marks.em) {
    // *string* should italic the text
    rules.push(new InputRule(/(?:[^\*]+)(\*([^\*]+?)\*)$|^(\*([^\*]+)\*)$/, addMark(schema.marks.em, schema, '*')));
  }

  if (schema.marks.strike) {
    // ~~string~~ should strikethrough the text
    rules.push(new InputRule(/(\~\~([^\*]+)\~\~)$/, addMark(schema.marks.strike, schema, '~~')));
  }

  if (schema.marks.code) {
    // `string` should monospace the text
    rules.push(new InputRule(/(`([^`]+)`)$/, addMark(schema.marks.code, schema, '`')));
  }

  plugin = inputRules({ rules });

  return plugin;
};

export default inputRulePlugin;
