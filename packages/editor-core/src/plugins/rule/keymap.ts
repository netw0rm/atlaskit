import { Schema, keymap, Plugin } from '../../prosemirror';
import * as keymaps from '../../keymaps';
import * as commands from '../../commands';
import { trackAndInvoke } from '../../analytics';
import { stateKey } from '../mentions';

let plugin: Plugin | undefined;

export function keymapPlugin(schema: Schema<any, any>): Plugin | undefined {
  const list = {};

  if (plugin) {
    return plugin;
  }

  keymaps.bindKeymapWithCommand(keymaps.insertRule.common!, trackAndInvoke('atlassian.editor.format.horizontalrule.keyboard', commands.insertRule()), list);

  keymaps.bindKeymapWithCommand(keymaps.escape.common!, (state: any, dispatch) => {
    if (stateKey.getState(state)) {
      return false;
    }
    return true;
  }, list);

  plugin = keymap(list);
  return plugin;
}

export default keymapPlugin;

