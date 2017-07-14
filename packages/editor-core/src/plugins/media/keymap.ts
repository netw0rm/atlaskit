import {
  Schema, keymap, Plugin,
  EditorState, Transaction
} from '../../prosemirror';
import * as keymaps from '../../keymaps';
import { MediaPluginState, stateKey } from './';

export function keymapPlugin(schema: Schema<any, any>): Plugin {
  const list = {};

  keymaps.bindKeymapWithCommand(keymaps.backspace.common!, removeMediaNode, list);
  keymaps.bindKeymapWithCommand(keymaps.undo.common!, ignoreLinksInSteps, list);

  return keymap(list);
}

function removeMediaNode(state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean {
  const mediaPluginState = stateKey.getState(state) as MediaPluginState;
  return mediaPluginState.removeSelectedMediaNode();
}

function ignoreLinksInSteps(state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean {
  const mediaPluginState = stateKey.getState(state) as MediaPluginState;
  mediaPluginState.ignoreLinks = true;
  return false;
}

export default keymapPlugin;

