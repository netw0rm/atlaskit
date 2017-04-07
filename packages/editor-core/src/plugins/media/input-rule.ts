import { URL_REGEX } from './../hyperlink/url-regex';
import { Transaction, Plugin, InputRule, inputRules, Schema } from '../../prosemirror';
import { MediaPluginState, stateKey } from './';

const urlWithASpace = new RegExp(`${URL_REGEX.source} $`);
let plugin: Plugin | undefined;

export function inputRulePlugin(schema: Schema<any, any>): Plugin {
  if (plugin) {
    return plugin;
  }

  const rules: Array<InputRule> = [];

  if (schema.nodes.mention && schema.marks.mentionQuery) {
    const mentionQueryRule = new InputRule(urlWithASpace, (state, match, start, end): Transaction | undefined => {
      const mediaState = stateKey.getState(state) as MediaPluginState;

      if (!mediaState.allowsPastingLinks) {
        return undefined;
      }
      const url = match[3] ? match[1] : `http://${match[1]}`;

      return mediaState.insertLinkFromUrl(url);
    });

    rules.push(mentionQueryRule);
  }

  plugin = inputRules({ rules });

  return plugin;
}

export function destroyRulePluginCache() {
  plugin = undefined;
}
