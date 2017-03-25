import { Transaction, Plugin, InputRule, inputRules, Schema } from '../../prosemirror';
import { MentionsState, stateKey } from './';

let plugin: Plugin | undefined;

export function inputRulePlugin(schema: Schema<any, any>): Plugin {
  if (plugin) {
    return plugin;
  }

  const rules: Array<InputRule> = [];

  if (schema.nodes.mention && schema.marks.mentionQuery) {
    const mentionQueryRule = new InputRule(/(^|[^\w\`])@$/, (state, match, start, end): Transaction | undefined => {
      const mentionsPlugin = stateKey.getState(state) as MentionsState;

      if (!mentionsPlugin.mentionProvider) {
        return undefined;
      }

      const markType = schema.mark('mentionQuery');
      const { tr } = state;

      return tr.replaceWith(
        end,
        end,
        schema.text(
          '@',
          [markType]
        )
      );

    });

    rules.push(mentionQueryRule);
  }

  plugin = inputRules({ rules });

  return plugin;
}

export default inputRulePlugin;
