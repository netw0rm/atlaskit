import * as React from 'react';
import { EditorPlugin } from '../../types';
import { plugin, stateKey } from '../../../plugins/lists';
import inputRulePlugin from '../../../plugins/lists/input-rule';
import keymapPlugin from '../../../plugins/lists/keymap';
import { orderedList } from '../../../schema/nodes/ordered-list';
import { bulletList } from '../../../schema/nodes/bullet-list';
import { listItem } from '../../../schema/nodes/list-item';
import ToolbarLists from '../../../ui/ToolbarLists';

const listPlugin: EditorPlugin = {
  nodes() {
    return [
      { name: 'bulletList', node: bulletList, rank: 300 },
      { name: 'orderedList', node: orderedList, rank: 400 },
      { name: 'listItem', node: listItem, rank: 500 }
    ];
  },

  pmPlugins() {
    return [
      { rank: 600, plugin: () => plugin },
      { rank: 620, plugin: (schema) => inputRulePlugin(schema) },
      { rank: 640, plugin: (schema) => keymapPlugin(schema) }
    ];
  },

  primaryToolbarComponent(editorView) {
    const pluginState = stateKey.getState(editorView.state);
    return <ToolbarLists editorView={editorView} pluginState={pluginState} />;
  }
};

export default listPlugin;
