import { URL_REGEX, EMAIL_REGEX } from './regex';
import { Schema, inputRules, Plugin, InputRule } from '../../prosemirror';
import { analyticsService } from '../../analytics';
import { createInputRule } from '../utils';
import { normalizeUrl } from './utils';

const urlAtEndOfLine = new RegExp(`${URL_REGEX.source}$`);
const emailAtEndOfLine = new RegExp(`${EMAIL_REGEX.source}$`);

export function createLinkInputRule(regexp: RegExp, formatUrl: (url: string[]) => string): InputRule {
  return createInputRule(regexp, (state, match, start, end) => {
    const { schema } = state;
    const url = formatUrl(match);
    const markType = schema.mark('link', { href: url, });

    analyticsService.trackEvent('atlassian.editor.format.hyperlink.autoformatting');

    return state.tr.replaceWith(
      start,
      end,
      schema.text(match[1], [markType])
    );
  });
}

export function inputRulePlugin(schema: Schema<any, any>): Plugin | undefined {
  if (!schema.marks.link) {
    return;
  }

  const urlEndOfLine = createLinkInputRule(urlAtEndOfLine, match => match[3] ? match[1] : `http://${match[1]}`);
  const emailEndOfLine = createLinkInputRule(emailAtEndOfLine, match => match[1] && `mailto:${match[1]}`);

  // [something](link) should convert to a hyperlink
  const markdownLinkRule = createInputRule(/(^|[^!])\[(.*?)\]\((\S+)\)$/, (state, match, start, end) => {
    const { schema } = state;
    const url = normalizeUrl(match[3]);
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
      urlEndOfLine,
      emailEndOfLine,
      markdownLinkRule
    ]
  });
};

export default inputRulePlugin;
