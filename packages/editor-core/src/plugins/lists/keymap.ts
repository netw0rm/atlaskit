import { Schema, keymap, Plugin } from '../../prosemirror';
import * as keymaps from '../../keymaps';
import * as commands from '../../commands';

let plugin: Plugin | undefined;

export function keymapPlugin(schema: Schema<any, any>): Plugin | undefined {
  const list = {};

  if (plugin) {
    return plugin;
  }

  keymaps.bindKeymapWithCommand(keymaps.splitListItem.common!, commands.splitListItem(), list);
  keymaps.bindKeymapWithCommand(keymaps.findShortcutByKeymap(keymaps.toggleOrderedList)!, commands.toggleOrderedList(), list);
  keymaps.bindKeymapWithCommand(keymaps.findShortcutByKeymap(keymaps.toggleBulletList)!, commands.toggleBulletList(), list);


  plugin = keymap(list);
  return plugin;
}

export default keymapPlugin;

