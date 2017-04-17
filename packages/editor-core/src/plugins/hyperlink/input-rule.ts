import { URL_REGEX } from './url-regex';
import { Schema, inputRules, Plugin } from '../../prosemirror';
import { analyticsService } from '../../analytics';
import { createInputRule } from '../utils';

const urlAtEndOfLine = new RegExp(`${URL_REGEX.source}$`);

export function inputRulePlugin(schema: Schema<any, any>): Plugin | undefined {
  if (!schema.marks.link) {
    return;
  }

  const endOfLine = createInputRule(urlAtEndOfLine, (state, match, start, end) => {
    const { schema } = state;
    const url = match[3] ? match[1] : `http://${match[1]}`;
    const markType = schema.mark(
      'link',
      {
        href: url,
      }
    );

    analyticsService.trackEvent('atlassian.editor.format.hyperlink.autoformatting');

    return state.tr.replaceWith(
      start,
      end,
      schema.text(
        match[1],
        [markType]
      )
    );
  });

  // [something](link) should convert to a hyperlink
  const markdownLinkRule = createInputRule(/(^|[^!])\[(.*?)\]\((\S+)\)$/, (state, match, start, end) => {
    const { schema } = state;
    const url = match[3];
    const markType = schema.mark('link', { href: url });

    analyticsService.trackEvent('atlassian.editor.format.hyperlink.autoformatting');

    return state.tr.replaceWith(
      start + match[1].length,
      end,
      schema.text(
        match[2],
        [markType]
      )
    );
  });

  return inputRules({
    rules: [
      endOfLine,
      markdownLinkRule
    ]
  });
};

export default inputRulePlugin;
