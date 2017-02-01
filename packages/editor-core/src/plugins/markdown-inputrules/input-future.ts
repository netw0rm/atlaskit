import { Fragment, InputRule, MarkType, Schema } from '../../prosemirror/future';

function addMark(markType: MarkType, schema: Schema<any, any>) {
  return (state, match, start, end) => {
    const marks = [...state.doc.marksAt(start), markType.create()];

    // Because the match can start with space.
    // Preserve the space if there is one.
    const content = match[0].indexOf(' ') === 0 ? ` ${match[1]}` : match[1];
    return state.tr.replaceWith(start, end, Fragment.from(schema.text(content, marks)));
  };
};

function buildMarkdownInputRules(schema: Schema<any, any>): Array<InputRule> {
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

  if (schema.marks.mono) {
    // `string` should monospace the text
    rules.push(new InputRule(/(?:^|\s)(?:`([^`]+)`)$/, addMark(schema.marks.mono, schema)));
  }
  return rules;
}

export default buildMarkdownInputRules;
