import { Plugin, ProseMirror } from 'prosemirror/dist/edit';
import { InputRule, inputRules } from 'prosemirror/dist/inputrules';

import { mentionRule, emoticonRule } from './input-rules';

class BitbucketMentionsPluginState {
  pm: ProseMirror;

  constructor(pm: ProseMirror) {
    this.pm = pm;

    // add the input rules to insert mentions and emoticons
    if (this.pm.schema.nodes.mention) {
      [ mentionRule, emoticonRule ].forEach((rule) => {
        inputRules.ensure(pm).addRule(rule);
      });
    }
  }
}

export default new Plugin(BitbucketMentionsPluginState);
