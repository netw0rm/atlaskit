import * as React from 'react';
import { EditorPlugin } from '../../types';
import { WithProviders } from '../../../providerFactory/withProviders';
import { plugin } from '../../../plugins/hyperlink';
import inputRulePlugin from '../../../plugins/hyperlink/input-rule';
import keymap from '../../../plugins/hyperlink/keymap';
import { link } from '../../../schema/marks/link';
import pluginKey from '../../../plugins/hyperlink/plugin-key';
import HyperlinkEdit from '../../../ui/HyperlinkEdit';
import ToolbarHyperlink from '../../../ui/ToolbarHyperlink';

const hyperlinkPlugin: EditorPlugin = {
  marks() {
    return [{ name: 'link', mark: link, rank: 100 }];
  },

  pmPlugins() {
    return [
      { rank: 900, plugin: () => plugin },
      { rank: 910, plugin: (schema) => inputRulePlugin(schema) },
      { rank: 920, plugin: (schema, props) => keymap(schema, props) },
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
