import { Schema, keymap, Plugin } from '../../prosemirror';
import * as keymaps from '../../keymaps';
import { clearFormatting } from './commands';
import { trackAndInvoke } from '../../analytics';

export function keymapPlugin(schema: Schema<any, any>): Plugin {
  const list = {};
  keymaps.bindKeymapWithCommand(
    keymaps.clearFormatting.common!,
    trackAndInvoke('atlassian.editor.format.clear.keyboard',
    clearFormatting()
  ), list);

  return keymap(list);
}

export default keymapPlugin;

