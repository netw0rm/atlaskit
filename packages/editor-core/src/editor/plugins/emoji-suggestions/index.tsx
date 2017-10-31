import * as React from 'react';
import { EditorPlugin } from '../../types';
import { createPlugin, pluginKey, EmojiSuggestionsState } from './plugin';
import { insertEmoji } from './actions';
import EmojiSuggestions from '../../../ui/EmojiSuggestions';
import WithPluginState from '../../ui/WithPluginState';

const emojiSuggestionsPlugin: EditorPlugin = {
  pmPlugins() {
    return [
      { rank: 2410, plugin: (schema, props, dispatch, providerFactory) => createPlugin(dispatch, providerFactory) }
    ];
  },

  contentComponent(editorView, eventDispatcher, providerFactory, apperance, popupsMountPoint, popupsBoundariesElement) {
    return (
      <WithPluginState
        editorView={editorView}
        eventDispatcher={eventDispatcher}
        plugins={{
          emojiSuggestions: pluginKey
        }}
        // tslint:disable-next-line:jsx-no-lambda
        render={({ emojiSuggestions = {} as EmojiSuggestionsState }) => (
          <span>{emojiSuggestions.emojiProvider &&
            <EmojiSuggestions
              editorView={editorView}
              emojiProvider={emojiSuggestions.emojiProvider}
              query={emojiSuggestions.query}
              anchorElement={emojiSuggestions.anchorElement}
              insertEmoji={insertEmoji}
            />
          }</span>
        )}
      />
    );
  },
};

export default emojiSuggestionsPlugin;
