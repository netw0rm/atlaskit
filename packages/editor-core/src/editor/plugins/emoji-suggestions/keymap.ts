import { keymap } from 'prosemirror-keymap';
import { Schema } from 'prosemirror-model';
import { Plugin, EditorState } from 'prosemirror-state';
import * as keymaps from '../../../keymaps';
import { EmojiSuggestionsState, pluginKey } from './plugin';

const onSelectNext = (state: EditorState, dispatch) => {
  const pluginState = pluginKey.getState(state) as EmojiSuggestionsState;
  if (!pluginState.query) {
    return false;
  }
  return pluginState.onSelectNext();
};

const onSelectPrevious = (state: EditorState, dispatch) => {
  const pluginState = pluginKey.getState(state) as EmojiSuggestionsState;
  if (!pluginState.query || pluginState.selectedIndex < 0) {
    return false;
  }
  return pluginState.onSelectPrevious();
};

const onDismiss = (state: EditorState, dispatch) => {
  const pluginState = pluginKey.getState(state) as EmojiSuggestionsState;
  if (!pluginState.query) {
    return false;
  }
  return pluginState.dismiss();
};

export function keymapPlugin(schema: Schema): Plugin {
  const list = {};

  keymaps.bindKeymapWithCommand(keymaps.escape.common!, onDismiss, list);
  keymaps.bindKeymapWithCommand(keymaps.moveLeft.common!, onSelectPrevious, list);
  keymaps.bindKeymapWithCommand(keymaps.moveUp.common!, onSelectNext, list);
  keymaps.bindKeymapWithCommand(keymaps.moveDown.common!, onSelectPrevious, list);

  keymaps.bindKeymapWithCommand(keymaps.moveRight.common!, (state: EditorState, dispatch) => {
    const pluginState = pluginKey.getState(state) as EmojiSuggestionsState;
    if (pluginState.selectedIndex < 0) {
      return false;
    }
    return onSelectNext(state, dispatch);
  }, list);

  keymaps.bindKeymapWithCommand(keymaps.enter.common!, (state: EditorState, dispatch) => {
    const pluginState = pluginKey.getState(state) as EmojiSuggestionsState;
    if (!pluginState.query || pluginState.selectedIndex < 0) {
      return false;
    }
    return pluginState.onSelectCurrent();
  }, list);

  return keymap(list);
}

export default keymapPlugin;
