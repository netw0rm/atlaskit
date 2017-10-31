import * as React from 'react';
import { EditorPlugin } from '../../types';
import { createPlugin, pluginKey, EmojiSuggestionsState } from './plugin';
import keymap from './keymap';
import { setEmojis, selectCurrent } from './actions';
import EmojiSuggestions from '../../../ui/EmojiSuggestions';
import WithPluginState from '../../ui/WithPluginState';

const emojiSuggestionsPlugin: EditorPlugin = {
  pmPlugins() {
    return [
      { rank: 2410, plugin: (schema, props, dispatch, providerFactory) => createPlugin(dispatch, providerFactory) },
      { rank: 2420, plugin: schema => keymap(schema) }
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
          <EmojiSuggestions
            editorView={editorView}
            emojiProvider={emojiSuggestions.emojiProvider}
            selectedIndex={emojiSuggestions.selectedIndex}
            query={emojiSuggestions.query}
            anchorElement={emojiSuggestions.anchorElement}
            emojis={emojiSuggestions.emojis}
            pluginKey={pluginKey}
            setEmojis={setEmojis}
            onSelect={selectCurrent}
          />
        )}
      />
    );
  },
};

export default emojiSuggestionsPlugin;
