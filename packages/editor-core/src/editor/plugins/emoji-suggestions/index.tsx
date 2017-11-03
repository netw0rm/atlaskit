import * as React from 'react';
import { EditorPlugin } from '../../types';
import { createPlugin, pluginKey, EmojiSuggestionsState } from './plugin';
import {
  pluginKey as highlightPluginKey,
  createPlugin as createHighlightEmojiPlugin,
  HighlightEmojiState
} from './highlight-plugin';
import { getLastSentance, getLastWord } from './utils';
import keymap from './keymap';

import EmojiSuggestions from '../../../ui/EmojiSuggestions';
import WithPluginState from '../../ui/WithPluginState';
import ToolbarHighlightEmoji from '../../../ui/ToolbarHighlightEmoji';

import {
  setEmojis,
  selectCurrent,
  getEmojiSuggestions,
  highlightDocument
} from './actions';

const emojiSuggestionsPlugin: EditorPlugin = {
  pmPlugins() {
    return [
      { rank: 2410, plugin: (schema, props, dispatch, providerFactory) => createPlugin(dispatch, providerFactory) },
      { rank: 2420, plugin: (schema, props, dispatch, providerFactory) => createHighlightEmojiPlugin(dispatch, providerFactory) },
      { rank: 2430, plugin: schema => keymap(schema) }
    ];
  },

  contentComponent(editorView, eventDispatcher, providerFactory, apperance, popupsMountPoint, popupsBoundariesElement) {
    return (
      <WithPluginState
        editorView={editorView}
        eventDispatcher={eventDispatcher}
        plugins={{
          emojiSuggestions: pluginKey,
          highlightEmoji: highlightPluginKey
        }}
        // tslint:disable-next-line:jsx-no-lambda
        render={({
          emojiSuggestions = {} as EmojiSuggestionsState,
          highlightEmoji = {} as HighlightEmojiState
        }) => (
          <span>
            {
              !highlightEmoji.highlighted &&
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
                  getLastSentance={getLastSentance}
                  getLastWord={getLastWord}
                  getEmojiSuggestions={getEmojiSuggestions}
                />
            }
          </span>
        )}
      />
    );
  },

  secondaryToolbarComponent(editorView, eventDispatcher, providerFactory, appearance, popupsMountPoint, popupsBoundariesElement) {
    return (
      <ToolbarHighlightEmoji
        editorView={editorView}
        highlightDocument={highlightDocument}
      />
    );
  },
};

export default emojiSuggestionsPlugin;
