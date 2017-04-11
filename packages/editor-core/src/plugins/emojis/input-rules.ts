import { Transaction, Plugin, InputRule, inputRules, Schema } from '../../prosemirror';
import { EmojiState, stateKey } from './';
import { createInputRule } from '../utils';

export function inputRulePlugin(schema: Schema<any, any>): Plugin {
  let plugin: Plugin;
  const rules: Array<InputRule> = [];

  if (schema.nodes.emoji && schema.marks.emojiQuery) {
    const emojiQueryRule = createInputRule(/(^|[^\w\`]):$/, (state, match, start, end): Transaction | undefined => {
      const emojisState = stateKey.getState(state) as EmojiState;

      if (!emojisState.emojiProvider) {
        return undefined;
      }

      if (emojisState.emojiDisabled()) {
        return undefined;
      }

      const markType = schema.mark('emojiQuery');
      const { tr } = state;

      return tr.replaceWith(
        end,
        end,
        schema.text(
          ':',
          [markType]
        )
      );

    });

    rules.push(emojiQueryRule);
  }

  plugin = inputRules({ rules });

  return plugin;
}

export default inputRulePlugin;
