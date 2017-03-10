import { Schema, keymap, Plugin, MarkType } from '../../prosemirror';
import * as keymaps from '../../keymaps';
import * as commands from '../../commands';
import { trackAndInvoke } from '../../analytics';

let plugin: Plugin | undefined;

export function keymapPlugin(schema: Schema<any, any>): Plugin | undefined {
  const list = {};

  if (plugin) {
    return plugin;
  }

  if (schema.marks.strong) {
    const eventName = analyticsEventName(schema.marks.strong);
    keymaps.bindKeymapWithCommand(keymaps.toggleBold.common!, trackAndInvoke(eventName, commands.toggleMark(schema.marks.strong)), list);
  }

  if (schema.marks.em) {
    const eventName = analyticsEventName(schema.marks.strong);
    keymaps.bindKeymapWithCommand(keymaps.toggleItalic.common!, trackAndInvoke(eventName, commands.toggleMark(schema.marks.em)), list);
  }

  if (schema.marks.mono) {
    const eventName = analyticsEventName(schema.marks.strong);
    keymaps.bindKeymapWithCommand(keymaps.toggleMonospace.common!, trackAndInvoke(eventName, commands.toggleMark(schema.marks.mono)), list);
  }

  if (schema.marks.strike) {
    const eventName = analyticsEventName(schema.marks.strong);
    keymaps.bindKeymapWithCommand(keymaps.toggleStrikethrough.common!, trackAndInvoke(eventName, commands.toggleMark(schema.marks.strike)), list);
  }

  if (schema.marks.underline) {
    const eventName = analyticsEventName(schema.marks.strong);
    keymaps.bindKeymapWithCommand(keymaps.toggleUnderline.common!, trackAndInvoke(eventName, commands.toggleMark(schema.marks.underline)), list);
  }

  plugin = keymap(list);
  return plugin;
}

function analyticsEventName(markType: MarkType): string {
  return `atlassian.editor.format.${markType.name}.keyboard`;
}

export default keymapPlugin;

