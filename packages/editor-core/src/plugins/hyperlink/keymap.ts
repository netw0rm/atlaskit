import { Schema, keymap, Plugin } from '../../prosemirror';
import * as keymaps from '../../keymaps';
import * as commands from '../../commands';
import { trackAndInvoke } from '../../analytics';

export function keymapPlugin(schema: Schema<any, any>): Plugin | undefined {
  const list = {};

  keymaps.bindKeymapWithCommand(
    keymaps.addLink.common!,
    trackAndInvoke(
      'atlassian.editor.format.hyperlink.keyboard',
      commands.showLinkPanel()
    ),
    list
  );

  keymaps.bindKeymapWithCommand(
    keymaps.enter.common!,
    trackAndInvoke(
      'atlassian.editor.format.hyperlink.autoformatting',
      commands.convertToHyperlink()
    ),
    list
  );

  keymaps.bindKeymapWithCommand(
    keymaps.insertNewLine.common!,
    trackAndInvoke(
      'atlassian.editor.format.hyperlink.autoformatting',
      commands.convertToHyperlink()
    ),
    list
  );

  return keymap(list);
}

export default keymapPlugin;

