import { keydownHandler } from '../../prosemirror';
import * as keymaps from '../../keymaps';
import tableCommands from './commands';
import { TableState } from './';

export function keymapHandler(pluginState: TableState): Function {
  const list = {};

  keymaps.bindKeymapWithCommand(keymaps.nextCell.common!, tableCommands.goToNextCell(1), list);
  keymaps.bindKeymapWithCommand(keymaps.previousCell.common!, tableCommands.goToNextCell(-1), list);
  keymaps.bindKeymapWithCommand(keymaps.toggleTable.common!, tableCommands.createTable(), list);
  keymaps.bindKeymapWithCommand(keymaps.backspace.common!, tableCommands.backspace(), list);

  return keydownHandler(list);
}

export default keymapHandler;
