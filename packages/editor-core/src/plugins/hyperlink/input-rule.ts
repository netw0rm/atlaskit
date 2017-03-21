import { URL_REGEX } from './url-regex';
import { Schema, InputRule, inputRules, Plugin } from '../../prosemirror';

const urlAtEndOfLine = new RegExp(`${URL_REGEX.source}$`);

let plugin: Plugin | undefined;

export function inputRulePlugin(schema: Schema<any, any>): Plugin | undefined {
  if (!schema.marks.link) {
    return;
  }

  if (plugin) {
    return plugin;
  }

  const endOfLine = new InputRule(urlAtEndOfLine, (state, match, start, end) => {
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
  });

  // [something](link) should convert to a hyperlink
  const markdownLinkRule = new InputRule(/(^|[^!])\[(\S+)\]\((\S+)\)$/, (state, match, start, end) => {
    const { schema } = state;
    const url = match[3];
    const markType = schema.mark('link', { href: url });

    return state.tr.replaceWith(
      start + match[1].length,
      end,
      schema.text(
        match[2],
        [ markType ]
      )
    );
  });

  plugin = inputRules({ rules: [
    endOfLine,
    markdownLinkRule
  ]});

  return plugin;
};

export default inputRulePlugin;
