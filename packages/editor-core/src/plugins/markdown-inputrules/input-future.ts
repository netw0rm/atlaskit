import { Fragment, InputRule, MarkType, Schema } from '../../prosemirror/future';

function convert(markType: MarkType, schema: Schema<any, any>) {
  return (state, match, start, end) => state.tr.replaceWith(start, end, Fragment.from(schema.text(match[1], [markType.create()])));
};

function buildMarkdownInputRules(schema: Schema<any, any>): Array<InputRule> {
  const rules: Array<InputRule> = [];
  if (schema.marks.strong) {
    rules.push(new InputRule(/(\*\*([^\*]+)\*\*)$/, convert(schema.marks.strong, schema)));
    rules.push(new InputRule(/(__([^_]+)__)$/, convert(schema.marks.strong, schema)));
  }
  return rules;
}

export default buildMarkdownInputRules;
