import { blockQuoteRule, Fragment, headingRule, InputRule, Mark, MarkType, Schema, Transaction } from '../../prosemirror';
import { analyticsService } from '../../analytics';
import { isConvertableToCodeBlock, transformToCodeBlockAction } from '../block-type/transform-to-code-block';

function addMark(markType: MarkType, schema: Schema<any, any>): Function {
  return (state, match, start, end): Transaction => {
    const marks = [...state.doc.resolve(start).marks(false), markType.create()];

    // Because the match can start with space.
    // Preserve the space if there is one.
    const content = match[0].indexOf(' ') === 0 ? ` ${match[1]}` : match[1];
    return replaceWithText(start, end, content, marks, schema, state.tr);
  };
};

function replaceWithText(start: number, end: number, content: string, marks: Array<Mark>, schema: Schema<any, any>, tr: Transaction): Transaction {
  return tr.replaceWith(start, end, Fragment.from(schema.text(content, marks)));
}

function buildInputRules(schema: Schema<any, any>): Array<InputRule> {
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
    rules.push(new InputRule(/^```$/, (state, match, start, end): Transaction | undefined => {
      const lengthOfDecorator = match[0].length;

      // Because the node content is wrap by the node margin in prosemirror
      // + 2 is the parent margin size. 1 in the front, and 1 at the end.
      const convertedNodeHasContent = state.selection.$from.parent.nodeSize > lengthOfDecorator + 2;

      if (isConvertableToCodeBlock(state) && convertedNodeHasContent) {
        analyticsService.trackEvent(`atlassian.editor.format.codeblock.autoformatting`);
        return transformToCodeBlockAction(state)
          // remove markdown decorator ```
          .delete(start, end)
          .scrollIntoView();
      }
    }));
  }

  if (schema.nodes.horizontalRule) {
    // '---' for hr
    rules.push(new InputRule(/^\-\-\-$/, (state, match, start, end) => {
      return state.tr.replaceWith(start, end, Fragment.from(schema.nodes.horizontalRule.create()));
    }));
  }


  if (schema.marks.link) {
    const urlAtEndOfLine = new RegExp(`${URL_REGEX.source}$`);
    rules.push(new InputRule(urlAtEndOfLine, (state, match, start, end) => {
      const { schema } = state;
      const url = match[3] ? match[1] : `http://${match[1]}`;

      const markType = schema.mark(
        'link',
        {
          href: url,
        }
      );

      return state.tr.replaceWith(
        start,
        end,
        schema.text(
          match[1],
          [markType]
        )
      );
    }));
  }

  return rules;
}

export const URL_REGEX = /\b(((https?|ftp):\/\/|(www\.))[a-zA-Z\u00a1-\uffff0-9\.\$\-_\+!\*',\/\?:@=&%#~;]+)/;

export default buildInputRules;
