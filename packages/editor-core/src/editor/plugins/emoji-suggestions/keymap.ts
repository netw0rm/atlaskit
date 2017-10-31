import { keymap } from 'prosemirror-keymap';
import { Schema } from 'prosemirror-model';
import { Plugin, EditorState } from 'prosemirror-state';
import * as keymaps from '../../../keymaps';
import { EmojiSuggestionsState, pluginKey } from './plugin';
import { selectCurrent, selectNext, selectPrevious, dismiss } from './actions';

const onSelectNext = (state: EditorState, dispatch) => {
  const { query } = pluginKey.getState(state) as EmojiSuggestionsState;
  if (!query) {
    return false;
  }
  selectNext(state, dispatch);

  return true;
};

const onSelectPrevious = (state: EditorState, dispatch) => {
  const { query, selectedIndex } = pluginKey.getState(state) as EmojiSuggestionsState;
  if (!query || selectedIndex < 0) {
    return false;
  }
  selectPrevious(state, dispatch);

  return true;
};

const onDismiss = (state: EditorState, dispatch) => {
  const { query } = pluginKey.getState(state) as EmojiSuggestionsState;
  if (!query) {
    return false;
  }
  dismiss(state, dispatch);

  return true;
};

export function keymapPlugin(schema: Schema): Plugin {
  const list = {};

  keymaps.bindKeymapWithCommand(keymaps.escape.common!, onDismiss, list);
  keymaps.bindKeymapWithCommand(keymaps.moveLeft.common!, onSelectPrevious, list);
  keymaps.bindKeymapWithCommand(keymaps.moveUp.common!, onSelectNext, list);
  keymaps.bindKeymapWithCommand(keymaps.moveDown.common!, onSelectPrevious, list);

  keymaps.bindKeymapWithCommand(keymaps.moveRight.common!, (state: EditorState, dispatch) => {
    const { selectedIndex } = pluginKey.getState(state) as EmojiSuggestionsState;
    if (selectedIndex < 0) {
      return false;
    }
    selectNext(state, dispatch);

    return true;
  }, list);

  keymaps.bindKeymapWithCommand(keymaps.enter.common!, (state: EditorState, dispatch) => {
    const { query, selectedIndex }  = pluginKey.getState(state) as EmojiSuggestionsState;
    if (!query || selectedIndex < 0) {
      return false;
    }
    selectCurrent(state, dispatch);

    return true;
  }, list);

  return keymap(list);
}

export default keymapPlugin;
