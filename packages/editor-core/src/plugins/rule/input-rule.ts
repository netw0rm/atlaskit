import { Fragment, InputRule, inputRules, Plugin, Schema } from '../../prosemirror';
import { analyticsService } from '../../analytics';

let plugin: Plugin | undefined;

export function inputRulePlugin(schema: Schema<any, any>): Plugin | undefined {
  if (plugin) {
    return plugin;
  }

  const rules: Array<InputRule> = [];

  if (schema.nodes.rule) {
    // '---' for hr
    rules.push(new InputRule(/^\-\-\-$/, (state, match, start, end) => {
      analyticsService.trackEvent(`atlassian.editor.format.horizontalrule.autoformatting`);
      return state.tr.replaceWith(start, end, Fragment.from(schema.nodes.rule.create()));
    }));
  }

  plugin = inputRules({ rules });

  return plugin;
};

export default inputRulePlugin;
