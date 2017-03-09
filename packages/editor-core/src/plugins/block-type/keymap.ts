import { Schema, keymap, Plugin } from '../../prosemirror';
import * as keymaps from '../../keymaps';
import * as commands from '../../commands';
import { trackAndInvoke } from '../../analytics';
import { ALL_BLOCK_TYPES } from './types';
import { redo, undo } from '../../prosemirror/prosemirror-history';

let plugin: Plugin | undefined;

export function keymapPlugin(schema: Schema<any, any>): Plugin | undefined {
  const list = {};

  if (plugin) {
    return plugin;
  }

  keymaps.bindKeymapWithCommand(keymaps.insertNewLine.common!, trackAndInvoke('atlassian.editor.newline.keyboard', commands.insertNewLine()), list);
  keymaps.bindKeymapWithCommand(keymaps.moveUp.common!, trackAndInvoke('atlassian.editor.moveup.keyboard', commands.createNewParagraphAbove()), list);
  keymaps.bindKeymapWithCommand(keymaps.moveDown.common!, trackAndInvoke('atlassian.editor.movedown.keyboard', commands.createNewParagraphBelow()), list);
  keymaps.bindKeymapWithCommand(keymaps.shiftBackspace.common!, commands.baseKeymap['Backspace'], list);
  keymaps.bindKeymapWithCommand(keymaps.createCodeBlock.common!, trackAndInvoke(analyticsEventName('autoformatting', 'codeblock'), commands.createCodeBlockFromFenceFormat()), list);
  keymaps.bindKeymapWithCommand(keymaps.redo.common!, redo, list);
  keymaps.bindKeymapWithCommand(keymaps!.undo.common!, undo, list);

  ALL_BLOCK_TYPES.forEach((blockType) => {
    const shortcut = keymaps.findShortcutByDescription(blockType.title);
    if (shortcut) {
      const eventName = analyticsEventName('keyboard', blockType.name);
      keymaps.bindKeymapWithCommand(shortcut, trackAndInvoke(eventName, commands.toggleBlockType(blockType.name)), list);
    }
  });

  // TODO keymaps related to text formatting need to move to text formatting plugin
  if (schema.marks.strong) {
    keymaps.bindKeymapWithCommand(keymaps.toggleBold.common!, commands.toggleMark(schema.marks.strong), list);
  }

  if (schema.marks.em) {
    keymaps.bindKeymapWithCommand(keymaps.toggleItalic.common!, commands.toggleMark(schema.marks.em), list);
  }

  if (schema.marks.mono) {
    keymaps.bindKeymapWithCommand(keymaps.toggleMonospace.common!, commands.toggleMark(schema.marks.mono), list);
  }

  if (schema.marks.strike) {
    keymaps.bindKeymapWithCommand(keymaps.toggleStrikethrough.common!, commands.toggleMark(schema.marks.strike), list);
  }

  if (schema.marks.underline) {
    keymaps.bindKeymapWithCommand(keymaps.toggleUnderline.common!, commands.toggleMark(schema.marks.underline), list);
  }


  plugin = keymap(list);
  return plugin;
}

function analyticsEventName(eventSource: string, blockTypeName: string): string {
  return `atlassian.editor.format.${blockTypeName}.${eventSource}`;
}

export default keymapPlugin;

