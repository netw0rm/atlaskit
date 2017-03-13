import { Fragment, InputRule, inputRules, Plugin, Schema, Transaction, MarkType, Mark } from '../../prosemirror';
import { analyticsService } from '../../analytics';

function addMark(markType: MarkType, schema: Schema<any, any>): Function {
  return (state, match, start, end): Transaction => {
    const marks = [...state.doc.resolve(start).marks(false), markType.create()];

    analyticsService.trackEvent(`atlassian.editor.format.${markType.name}.autoformatting`);

    // Because the match can start with space.
    // Preserve the space if there is one.
    const content = match[0].indexOf(' ') === 0 ? ` ${match[1]}` : match[1];
    return replaceWithText(start, end, content, marks, schema, state.tr);
  };
};

function replaceWithText(start: number, end: number, content: string, marks: Array<Mark>, schema: Schema<any, any>, tr: Transaction): Transaction {
  return tr.replaceWith(start, end, Fragment.from(schema.text(content, marks)));
}

let plugin: Plugin | undefined;

export function inputRulePlugin(schema: Schema<any, any>): Plugin | undefined {
  if (plugin) {
    return plugin;
  }

  const rules: Array<InputRule> = [];

  if (schema.marks.strong) {
    // **string** and __string__ should bold the text
    rules.push(new InputRule(/(?:^|\s)(?:\*\*([^\*]+)\*\*)$/, addMark(schema.marks.strong, schema)));
  }

  if (schema.marks.underline) {
    rules.push(new InputRule(/(?:^|\s)(?:__([^\_]+)__)$/, addMark(schema.marks.underline, schema)));
  }

  if (schema.marks.em) {
    // *string* and _string_ should italic the text
    rules.push(new InputRule(/(?:^|\s)(?:\*([^\*]+)\*)$/, addMark(schema.marks.em, schema)));
  }

  if (schema.marks.strike) {
    // ~~string~~ should strikethrough the text
    rules.push(new InputRule(/(?:^|\s)(?:~~([^~]+)~~)$/, addMark(schema.marks.strike, schema)));
  }

  if (schema.marks.code) {
    // `string` should monospace the text
    rules.push(new InputRule(/(?:^|\s)(?:`([^`]+)`)$/, addMark(schema.marks.code, schema)));
  }
  plugin = inputRules({ rules });

  return plugin;
};

export default inputRulePlugin;
