import * as React from 'react';
import { EditorPlugin } from '../../types';
import { plugin, stateKey } from '../../../plugins/panel';
import { panel } from '../../../schema/nodes/panel';
import inputRulePlugin from '../../../plugins/panel/input-rules';
import PanelEdit from '../../../ui/PanelEdit';

const panelPlugin: EditorPlugin = {
  nodes() {
    return [
      { rank: 900, name: 'panel', node: panel }
    ];
  },

  pmPlugins() {
    return [
      { rank: 910, plugin: () => plugin },
      { rank: 920, plugin: schema => inputRulePlugin(schema) }
    ];
  },

  contentComponent(editorView) {
    const pluginState = stateKey.getState(editorView.state);

    return (
      <PanelEdit editorView={editorView} pluginState={pluginState}  />
    );
  }
};

export default panelPlugin;
