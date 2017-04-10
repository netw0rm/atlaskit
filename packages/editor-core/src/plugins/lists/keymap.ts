import { Schema, keymap, Plugin } from '../../prosemirror';
import * as keymaps from '../../keymaps';
import * as commands from '../../commands';
import { trackAndInvoke } from '../../analytics';

let plugin: Plugin | undefined;

export function keymapPlugin(schema: Schema<any, any>): Plugin | undefined {
  const list = {};

  if (plugin) {
    return plugin;
  }

  keymaps.bindKeymapWithCommand(keymaps.splitListItem.common!, commands.splitListItem(), list);
  keymaps.bindKeymapWithCommand(keymaps.toggleOrderedList.common!, trackAndInvoke('atlassian.editor.format.list.numbered.keyboard', commands.toggleOrderedList()), list);
  keymaps.bindKeymapWithCommand(keymaps.toggleBulletList.common!, trackAndInvoke('atlassian.editor.format.list.bullet.keyboard', commands.toggleBulletList()), list);
  keymaps.bindKeymapWithCommand(keymaps.indentList.common!!, trackAndInvoke('atlassian.editor.format.list.indent.keyboard', commands.indentList()), list);
  keymaps.bindKeymapWithCommand(keymaps.outdentList.common!!, trackAndInvoke('atlassian.editor.format.list.outdent.keyboard', commands.outdentList()), list);

  plugin = keymap(list);
  return plugin;
}

export default keymapPlugin;

