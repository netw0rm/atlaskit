import * as React from 'react';
import { EditorPlugin } from '../../types';
import { createPlugin, pluginKey, EmojiSuggestionsState } from './plugin';
import { insertEmoji } from './actions';
import EmojiSuggestions from '../../../ui/EmojiSuggestions';
import WithPluginState from '../../ui/WithPluginState';
import { WithProviders } from '../../../providerFactory/withProviders';

const emojiSuggestionsPlugin: EditorPlugin = {
  pmPlugins() {
    return [
      { rank: 2410, plugin: (schema, props, dispatch, providerFactory) => createPlugin(dispatch, providerFactory) }
    ];
  },

  contentComponent(editorView, eventDispatcher, providerFactory, apperance, popupsMountPoint, popupsBoundariesElement) {
    const renderNode = (providers) =>{
      return (
        <WithPluginState
          editorView={editorView}
          eventDispatcher={eventDispatcher}
          plugins={{
            emojiSuggestions: pluginKey
          }}
          // tslint:disable-next-line:jsx-no-lambda
          render={({
            emojiSuggestions = {} as EmojiSuggestionsState
          }) => (
            <EmojiSuggestions
              editorView={editorView}
              emojiProvider={providers.emojiProvider}
              query={emojiSuggestions.query}
              anchorElement={emojiSuggestions.anchorElement}
              insertEmoji={insertEmoji}
            />
          )}
        />
      );
    };

    return (
      <WithProviders
        providerFactory={providerFactory}
        providers={['emojiProvider']}
        renderNode={renderNode}
      />
    );
  },
};

export default emojiSuggestionsPlugin;
