import { URL_REGEX_PREFIX, URL_REGEX_EXT, EMAIL_REGEX } from './regex';
import { Schema, inputRules, Plugin, InputRule, EditorState } from '../../prosemirror';
import { analyticsService } from '../../analytics';
import { getNodeContentWithNewlines } from '../../utils';
import { createInputRule } from '../utils';
import { normalizeUrl } from './utils';

const urlPrefixWithASpace = new RegExp(`${URL_REGEX_PREFIX.source}\\s$`);
const urlExtWithASpace = new RegExp(`${URL_REGEX_EXT.source}\\s$`);
const emailWithASpace = new RegExp(`${EMAIL_REGEX.source}\\s$`);

export function createLinkInputRule(regexp: RegExp, formatUrl: (url: string[]) => string): InputRule {
  return createInputRule(regexp, (state: EditorState<any>, match, start, end) => {
    const { schema } = state;
    if (state.doc.rangeHasMark(start, end, schema.marks.link)) {
      return;
    }
    let nodeStr = getNodeContentWithNewlines(state);
    // This is to ensure that match starts at word boundry.
    if (start !== 1 && nodeStr[start - 2] !== ' ' && nodeStr[start - 2] !== '\n') {
      return;
    }
    // This is to ensure perfect match of while url, not just match at boundries
    const selectedText = nodeStr.substr(start - 1, end);
    if (selectedText !== match[1]) {
      return;
    }

    const url = formatUrl(match);
    const markType = schema.mark('link', { href: url, });

    analyticsService.trackEvent('atlassian.editor.format.hyperlink.autoformatting');

    return state.tr.addMark(
      start,
      end,
      markType
    ).insertText(' ');
  });
}

export function inputRulePlugin(schema: Schema<any, any>): Plugin | undefined {
  if (!schema.marks.link) {
    return;
  }

  const urlPrefixWithASpaceRule = createLinkInputRule(urlPrefixWithASpace, match => match[3] ? match[1] : `http://${match[1]}`);
  const urlExtWithASpaceRule = createLinkInputRule(urlExtWithASpace, match => `http://${match[1]}`);
  const emailWithASpaceRule = createLinkInputRule(emailWithASpace, match => match[1] && `mailto:${match[1]}`);

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
      urlPrefixWithASpaceRule,
      urlExtWithASpaceRule,
      emailWithASpaceRule,
      markdownLinkRule
    ]
  });
}

export default inputRulePlugin;
