import { keydownHandler } from '../../prosemirror';
import * as keymaps from '../../keymaps';
import { TableState } from './';
import * as tableCommands from './commands';

export function keymapHandler(pluginState: TableState): Function {
  const list = {};

  keymaps.bindKeymapWithCommand(keymaps.nextCell.common!, tableCommands.goToNextCell(1), list);
  keymaps.bindKeymapWithCommand(keymaps.previousCell.common!, tableCommands.goToNextCell(-1), list);
  keymaps.bindKeymapWithCommand(keymaps.toggleTable.common!, tableCommands.createTable(), list);
  keymaps.bindKeymapWithCommand(keymaps.addRowAfter.common!, tableCommands.addRowAfter(), list);
  keymaps.bindKeymapWithCommand(keymaps.addRowBefore.common!, tableCommands.addRowBefore(), list);

  return keydownHandler(list);
}

export default keymapHandler;
