import {
  EditorState, Transaction,
  EditorView, keydownHandler,
} from '../../prosemirror';
import * as keymaps from '../../keymaps';
import * as commands from '../../commands';
import { MediaPluginState, stateKey } from './';

export function keymapHandler(view: EditorView, pluginState: MediaPluginState): Function {
  const list = {};

  keymaps.bindKeymapWithCommand(keymaps.undo.common!, ignoreLinksInSteps(pluginState), list);
  keymaps.bindKeymapWithCommand(keymaps.enter.common!, splitMediaGroup(view), list);
  return keydownHandler(list);
}

function ignoreLinksInSteps(pluginState: MediaPluginState) {
  return (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean => {
    const mediaPluginState = stateKey.getState(state) as MediaPluginState;
    mediaPluginState.ignoreLinks = true;
    return false;
  };
}

function splitMediaGroup(view: EditorView) {
  return (state: EditorState<any>, dispatch: (tr: Transaction) => void): boolean => {
    commands.deleteSelection(view.state, view.dispatch);
    commands.splitBlock(view.state, view.dispatch);
    commands.createParagraphNear(view, false);
    return true;
  };
}

export default keymapHandler;
