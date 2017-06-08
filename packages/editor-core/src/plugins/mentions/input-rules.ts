import { Transaction, Plugin, InputRule, inputRules, Schema } from '../../prosemirror';
import { MentionsState, stateKey } from './';
import { createInputRule } from '../utils';
import { analyticsService } from '../../analytics';

export function inputRulePlugin(schema: Schema<any, any>): Plugin | undefined {

  const rules: Array<InputRule> = [];

  if (schema.nodes.mention && schema.marks.mentionQuery) {
    const mentionQueryRule = createInputRule(/(^|[^\w\`])@$/, (state, match, start, end): Transaction | undefined => {
      const mentionsState = stateKey.getState(state) as MentionsState;

      if (!mentionsState.mentionProvider) {
        return undefined;
      }

      if (!mentionsState.isEnabled()) {
        return undefined;
      }

      const mark = schema.mark('mentionQuery');
      const { tr } = state;

      analyticsService.trackEvent('atlassian.editor.mention.autoformatting');

      const mentionText = schema.text(
        '@',
        [mark]
      );
      return tr.replaceSelectionWith(mentionText, false);
    });

    rules.push(mentionQueryRule);
  }

  if (rules.length !== 0) {
    return inputRules({ rules });
  }
}

export default inputRulePlugin;
