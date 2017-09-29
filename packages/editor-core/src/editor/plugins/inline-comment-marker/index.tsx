import * as React from 'react';
import { EditorPlugin } from '../../types';
import { createPlugin } from '../../../plugins/inline-comment-marker';
import { createKeymapPlugin } from '../../../plugins/inline-comment-marker/keymap';
import pluginKey from '../../../plugins/inline-comment-marker/plugin-key';
import { WithProviders } from '../../../providerFactory/withProviders';
import { inlineCommentMarker } from '../../../schema/marks/inline-comment-marker';
import InlineCommentsContainer from '../../../ui/InlineCommentsContainer';

const inlineCommentMarkerPlugin: EditorPlugin = {
  marks() {
    return [
      { name: 'inlineCommentMarker', mark: inlineCommentMarker, rank: 190 }
    ];
  },

  pmPlugins() {
    return [
      { rank: 1900, plugin: createPlugin },
      { rank: 1920, plugin: createKeymapPlugin },
    ];
  },

  contentComponent(editorView, dispatch, providerFactory, appearance) {
    if (appearance === 'message') {
      return null;
    }

    const renderNode = (providers) => {
      const pluginState = pluginKey.getState(editorView.state);
      return <InlineCommentsContainer editorView={editorView} pluginState={pluginState} provider={providers.inlineCommentProvider} />;
    };

    return (
      <WithProviders
        providerFactory={providerFactory}
        providers={['inlineCommentProvider']}
        renderNode={renderNode}
      />
    );
  }
};

export default inlineCommentMarkerPlugin;
