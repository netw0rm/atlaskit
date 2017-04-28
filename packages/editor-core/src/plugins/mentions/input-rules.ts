import { Transaction, Plugin, InputRule, inputRules, Schema } from '../../prosemirror';
import { MentionsState, stateKey } from './';
import { createInputRule } from '../utils';

export function inputRulePlugin(schema: Schema<any, any>): Plugin | undefined {

  const rules: Array<InputRule> = [];

  if (schema.nodes.mention && schema.marks.mentionQuery) {
    const mentionQueryRule = createInputRule(/(^|[^\w\`])@$/, (state, match, start, end): Transaction | undefined => {
      const mentionsState = stateKey.getState(state) as MentionsState;

      if (!mentionsState.mentionProvider) {
        return undefined;
      }

      if (mentionsState.mentionDisabled()) {
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

  if (rules.length !== 0) {
    return inputRules({ rules });
  }
}

export default inputRulePlugin;
