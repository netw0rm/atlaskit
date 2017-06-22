import * as React from 'react';
import { EditorPlugin } from '../../types';

import { createPlugin } from '../../../plugins/mentions';
import inputRulePlugin from '../../../plugins/mentions/input-rules';
import keymap from '../../../plugins/mentions/keymap';
import { mention } from '../../../schema/nodes/mention';
import { mentionQuery } from '../../../schema/marks/mention-query';
import pluginKey from '../../../plugins/mentions/plugin-key';

import ToolbarMention from '../../../ui/ToolbarMention';
import MentionPicker from '../../../ui/MentionPicker';

const mentionsPlugin: EditorPlugin = {
  nodes() {
    return [{ name: 'mention', node: mention, rank: 1200 }];
  },

  marks() {
    return [{ name: 'mentionQuery', mark: mentionQuery, rank: 1200 }];
  },

  pmPlugins() {
    return [
      { rank: 100, plugin: (schema, providerFactory) => createPlugin(providerFactory) },
      { rank: 110, plugin: schema => inputRulePlugin(schema) },
      { rank: 120, plugin: schema => keymap(schema) }
    ];
  },

  contentComponent() {
    return <MentionPicker pluginKey={pluginKey} />;
  },

  secondaryToolbarComponent() {
    return <ToolbarMention pluginKey={pluginKey} />;
  }
};

export default mentionsPlugin;
