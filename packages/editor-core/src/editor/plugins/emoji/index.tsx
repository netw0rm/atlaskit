import * as React from 'react';
import { EditorPlugin } from '../../types';

import { createPlugin } from '../../../plugins/emojis';
import inputRulePlugin from '../../../plugins/emojis/input-rules';
import keymap from '../../../plugins/emojis/keymap';
import { emoji } from '../../../schema/nodes/emoji';
import { emojiQuery } from '../../../schema/marks/emoji-query';
import pluginKey from '../../../plugins/emojis/plugin-key';

import EmojiTypeAhead from '../../../ui/EmojiTypeAhead';

const emojiPlugin: EditorPlugin = {
  nodes() {
    return [{ name: 'emoji', node: emoji, rank: 1600 }];
  },

  marks() {
    return [{ name: 'emojiQuery', mark: emojiQuery, rank: 1600 }];
  },

  pmPlugins() {
    return [
      { rank: 200, plugin: (schema, providerFactory) => createPlugin(providerFactory) },
      { rank: 210, plugin: schema => inputRulePlugin(schema) },
      { rank: 220, plugin: schema => keymap(schema) }
    ];
  },

  contentComponent() {
    return <EmojiTypeAhead pluginKey={pluginKey} />;
  }
};

export default emojiPlugin;
