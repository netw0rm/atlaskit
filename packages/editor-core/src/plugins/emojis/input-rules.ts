import { Transaction, Plugin, InputRule, inputRules, Schema } from '../../prosemirror';
import { EmojiState, stateKey } from './';
import { createInputRule } from '../utils';

export function inputRulePlugin(schema: Schema<any, any>): Plugin | undefined {
  const rules: Array<InputRule> = [];

  if (schema.nodes.emoji && schema.marks.emojiQuery) {
    const emojiQueryRule = createInputRule(/(^|\s):$/, (state, match, start, end): Transaction | undefined => {
      const emojisState = stateKey.getState(state) as EmojiState;

      if (!emojisState.emojiProvider) {
        return undefined;
      }

      if (!emojisState.isEnabled()) {
        return undefined;
      }

      const mark = schema.mark('emojiQuery');
      const { tr } = state;

      const emojiText = schema.text(
        ':',
        [mark]
      );
      return tr.replaceSelectionWith(emojiText, false);
    });

    rules.push(emojiQueryRule);
  }

  if (rules.length !== 0) {
    return inputRules({ rules });
  }
}

export default inputRulePlugin;
