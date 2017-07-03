import {
  Schema, keymap, Plugin,
  EditorState, Transaction
} from '../../prosemirror';
import * as keymaps from '../../keymaps';
import { MediaPluginState, stateKey } from './';

export function keymapPlugin(schema: Schema<any, any>): Plugin {
  const list = {};

  keymaps.bindKeymapWithCommand(keymaps.backspace.common!, selectPreviousMedia, list);

  return keymap(list);
}

function selectPreviousMedia(state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean {
  const mediaPluginState = stateKey.getState(state) as MediaPluginState;
  return mediaPluginState.removeMediaNode();
}

export default keymapPlugin;

