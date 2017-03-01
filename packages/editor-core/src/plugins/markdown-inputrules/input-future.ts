import { blockQuoteRule, codeBlockRule, Fragment, headingRule, InputRule, Mark, MarkType, Schema, Transaction } from '../../prosemirror';

function addMark(markType: MarkType, schema: Schema<any, any>): Function {
  return (state, match, start, end) => {
    const marks = [...state.doc.marksAt(start), markType.create()];

    // Because the match can start with space.
    // Preserve the space if there is one.
    const content = match[0].indexOf(' ') === 0 ? ` ${match[1]}` : match[1];
    return replaceWithText(start, end, content, marks, schema, state.tr);
  };
};

function replaceWithText(start: number, end: number, content: string, marks: Array<Mark>, schema: Schema<any, any>, tr: Transaction): Transaction {
  return tr.replaceWith(start, end, Fragment.from(schema.text(content, marks)));
}

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

  if (schema.nodes.heading) {
    // '# ' for h1, '## ' for h2 and etc
    rules.push(headingRule(schema.nodes.heading, 5));
  }

  if (schema.nodes.blockquote) {
    // '> ' for blockquote
    rules.push(blockQuoteRule(schema.nodes.blockquote));
  }

  if (schema.nodes.codeBlock) {
    // ``` for code block
    rules.push(codeBlockRule(schema.nodes.codeBlock));
  }

  if (schema.nodes.horizontalRule) {
    // '---' for hr
    rules.push(new InputRule(/^\-\-\-$/, (state, match, start, end) => {
      return state.tr.replaceWith(start, end, Fragment.from(schema.nodes.horizontalRule.create()));
    }));
  }

  return rules;
}

export default buildMarkdownInputRules;
