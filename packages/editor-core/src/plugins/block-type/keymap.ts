import { EditorView, keydownHandler } from '../../prosemirror';
import * as keymaps from '../../keymaps';
import * as commands from '../../commands';
import { trackAndInvoke } from '../../analytics';
import { ALL_BLOCK_TYPES } from './types';
import { redo, undo } from '../../prosemirror/prosemirror-history';

export function keymapHandler(view: EditorView, pluginState: any): Function {
  const list = {};

  keymaps.bindKeymapWithCommand(keymaps.insertNewLine.common!, trackAndInvoke('atlassian.editor.newline.keyboard', commands.insertNewLine()), list);
  keymaps.bindKeymapWithCommand(keymaps.moveUp.common!, trackAndInvoke('atlassian.editor.moveup.keyboard', commands.createNewParagraphAbove()), list);
  keymaps.bindKeymapWithCommand(keymaps.moveDown.common!, trackAndInvoke('atlassian.editor.movedown.keyboard', commands.createNewParagraphBelow()), list);
  keymaps.bindKeymapWithCommand(keymaps.createCodeBlock.common!, trackAndInvoke(analyticsEventName('codeblock', 'autoformatting'), commands.createCodeBlockFromFenceFormat()), list);
  keymaps.bindKeymapWithCommand(keymaps.findKeyMapForBrowser(keymaps.redo)!, trackAndInvoke('atlassian.editor.undo.keyboard', redo), list);
  keymaps.bindKeymapWithCommand(keymaps.undo.common!, trackAndInvoke('atlassian.editor.undo.keyboard', undo), list);
  keymaps.bindKeymapWithCommand(keymaps.findKeyMapForBrowser(keymaps.redoBarred)!, commands.preventDefault(), list);

  ALL_BLOCK_TYPES.forEach((blockType) => {
    const shortcut = keymaps.findShortcutByDescription(blockType.title);
    if (shortcut) {
      const eventName = analyticsEventName(blockType.name, 'keyboard');
      keymaps.bindKeymapWithCommand(shortcut, trackAndInvoke(eventName, () => pluginState.toggleBlockType(blockType.name, view)), list);
    }
  });

  return keydownHandler(list);
}

function analyticsEventName(blockTypeName: string, eventSource: string): string {
  return `atlassian.editor.format.${blockTypeName}.${eventSource}`;
}

export default keymapHandler;
