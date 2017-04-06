import { Schema, InputRule, inputRules, Plugin } from '../../prosemirror';
import { analyticsService } from '../../analytics';

let plugin: Plugin | undefined;

export function inputRulePlugin(schema: Schema<any, any>): Plugin | undefined {
  if (!schema.nodes.image) {
    return;
  }

  if (plugin) {
    return plugin;
  }

  // ![something](link) should convert to an image
  const imageRule = new InputRule(/!\[(\S+)\]\((\S+)\)$/, (state, match, start, end) => {
    const { schema } = state;
    const attrs = {
      src: match[2],
      alt: match[1],
      title: match[1],
    };

    const node = schema.nodes.image.create(attrs);
    analyticsService.trackEvent('atlassian.editor.image.autoformatting');
    return state.tr.replaceWith(
      start,
      end,
      node
    );
  });

  plugin = inputRules({
    rules: [
      imageRule
    ]
  });

  return plugin;
};

export default inputRulePlugin;
