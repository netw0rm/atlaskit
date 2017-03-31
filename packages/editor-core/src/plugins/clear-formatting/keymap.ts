import { Schema, keymap, Plugin } from '../../prosemirror';
import * as keymaps from '../../keymaps';
import { clearFormatting } from './commands';
import { trackAndInvoke } from '../../analytics';

let plugin: Plugin | undefined;
const markTypes = ['em', 'code', 'strike', 'strong', 'underline', 'link'];

export function keymapPlugin(schema: Schema<any, any>): Plugin | undefined {
  const list = {};

  if (plugin) {
    return plugin;
  }

  keymaps.bindKeymapWithCommand(keymaps.clearFormatting.common!, trackAndInvoke('atlassian.editor.format.clear.keyboard', clearFormatting(markTypes)), list);

  plugin = keymap(list);
  return plugin;
}

export default keymapPlugin;

