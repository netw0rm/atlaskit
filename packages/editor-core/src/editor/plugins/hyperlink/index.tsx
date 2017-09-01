import * as React from 'react';
import { EditorPlugin } from '../../types';
import { WithProviders } from '../../../providerFactory/withProviders';
import { link } from '../../../schema/marks/link';
import { plugin } from './pm-plugins';
import inputRulePlugin from './pm-plugins/input-rule';
import keymap from './pm-plugins/keymap';
import pluginKey from './pm-plugins/plugin-key';
import HyperlinkEdit from './ui/HyperlinkEdit';
import ToolbarHyperlink from './ui/ToolbarHyperlink';

const hyperlinkPlugin: EditorPlugin = {
  marks() {
    return [{ name: 'link', mark: link, rank: 100 }];
  },

  pmPlugins() {
    return [
      { rank: 900, plugin: () => plugin },
      { rank: 910, plugin: (schema) => inputRulePlugin(schema) },
      { rank: 920, plugin: (schema) => keymap(schema) },
    ];
  },

  primaryToolbarComponent(editorView) {
    const pluginState = pluginKey.getState(editorView.state);
    return <ToolbarHyperlink editorView={editorView} pluginState={pluginState} />;
  },

  contentComponent(editorView, dispatch, providerFactory, appearance) {
    if (appearance === 'message') {
      return null;
    }

    const renderNode = (providers) => {
      const pluginState = pluginKey.getState(editorView.state);
      return <HyperlinkEdit editorView={editorView} pluginState={pluginState} activityProvider={providers.activityProvider} />;
    };

    return (
      <WithProviders
        providerFactory={providerFactory}
        providers={['activityProvider']}
        renderNode={renderNode}
      />
    );
  }
};

export default hyperlinkPlugin;
