import { Schema, keymap, Plugin } from '../../prosemirror';
import * as keymaps from '../../keymaps';
import { MentionsState, stateKey } from './';

let plugin: Plugin | undefined;

export function keymapPlugin(schema: Schema<any, any>): Plugin | undefined {
  const list = {};

  if (plugin) {
    return plugin;
  }

  keymaps.bindKeymapWithCommand(keymaps.moveUp.common!, (state: any, dispatch) => {
    const mentionsPlugin = stateKey.getState(state) as MentionsState;
    if (!mentionsPlugin.queryActive) {
      return false;
    }

    return mentionsPlugin.onSelectPrevious();
  }, list);

  keymaps.bindKeymapWithCommand(keymaps.moveDown.common!, (state: any, dispatch) => {
    const mentionsPlugin = stateKey.getState(state) as MentionsState;
    if (!mentionsPlugin.queryActive) {
      return false;
    }

    return mentionsPlugin.onSelectNext();
  }, list);

  keymaps.bindKeymapWithCommand(keymaps.enter.common!, (state: any, dispatch) => {
    const mentionsPlugin = stateKey.getState(state) as MentionsState;
    if (!mentionsPlugin.queryActive) {
      return false;
    }

    return mentionsPlugin.onSelectCurrent();
  }, list);

  keymaps.bindKeymapWithCommand(keymaps.tab.common!, (state: any, dispatch) => {
    const mentionsPlugin = stateKey.getState(state) as MentionsState;
    if (!mentionsPlugin.queryActive) {
      return false;
    }

    return mentionsPlugin.onSelectCurrent();
  }, list);

  keymaps.bindKeymapWithCommand(keymaps.escape.common!, (state: any, dispatch) => {
    const mentionsPlugin = stateKey.getState(state) as MentionsState;
    if (!mentionsPlugin.queryActive) {
      return false;
    }

    return mentionsPlugin.dismiss();
  }, list);

  keymaps.bindKeymapWithCommand(keymaps.space.common!, (state: any, dispatch) => {
    const mentionsPlugin = stateKey.getState(state) as MentionsState;
    if (!mentionsPlugin.queryActive) {
      return false;
    }

    return mentionsPlugin.onTrySelectCurrent();
  }, list);

  plugin = keymap(list);
  return plugin;
}

export default keymapPlugin;

