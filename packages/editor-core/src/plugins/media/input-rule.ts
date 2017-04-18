import { URL_REGEX } from './../hyperlink/url-regex';
import { Transaction, Plugin, InputRule, inputRules, Schema } from '../../prosemirror';
import { MediaPluginState, stateKey } from './';
import { createInputRule } from '../utils';

const urlWithASpace = new RegExp(`${URL_REGEX.source} $`);

export default function inputRulePlugin(schema: Schema<any, any>): Plugin | undefined {
  const rules: Array<InputRule> = [];

  if (schema.nodes.mention && schema.marks.mentionQuery) {
    const mentionQueryRule = createInputRule(urlWithASpace, (state, match, start, end): Transaction | undefined => {
      const mediaState = stateKey.getState(state) as MediaPluginState;

      if (!mediaState.allowsPastingLinks) {
        return undefined;
      }
      const url = match[3] ? match[1] : `http://${match[1]}`;

      return mediaState.insertLinkFromUrl(url);
    });

    rules.push(mentionQueryRule);
  }

  if (rules.length) {
    return inputRules({ rules });
  }
}
