import { EditorView, MarkType, keydownHandler } from '../../prosemirror';
import * as keymaps from '../../keymaps';
import { trackAndInvoke } from '../../analytics';

export function keymapHandler(view: EditorView, pluginState: any): Function {
  const list = {};
  const { schema } = view.state;

  if (schema.marks.strong) {
    const eventName = analyticsEventName(schema.marks.strong);
    keymaps.bindKeymapWithCommand(keymaps.toggleBold.common!, trackAndInvoke(eventName, () => pluginState.toggleMark(view, schema.marks.strong)), list);
  }

  if (schema.marks.em) {
    const eventName = analyticsEventName(schema.marks.strong);
    keymaps.bindKeymapWithCommand(keymaps.toggleItalic.common!, trackAndInvoke(eventName, () => pluginState.toggleMark(view, schema.marks.em)), list);
  }

  if (schema.marks.code) {
    const eventName = analyticsEventName(schema.marks.strong);
    keymaps.bindKeymapWithCommand(keymaps.toggleCode.common!, trackAndInvoke(eventName, () => pluginState.toggleMark(view, schema.marks.code)), list);
  }

  if (schema.marks.strike) {
    const eventName = analyticsEventName(schema.marks.strong);
    keymaps.bindKeymapWithCommand(keymaps.toggleStrikethrough.common!, trackAndInvoke(eventName, () => pluginState.toggleMark(view, schema.marks.strike)), list);
  }

  if (schema.marks.u) {
    const eventName = analyticsEventName(schema.marks.strong);
    keymaps.bindKeymapWithCommand(keymaps.toggleUnderline.common!, trackAndInvoke(eventName, () => pluginState.toggleMark(view, schema.marks.u)), list);
  }

  return keydownHandler(list);
}

function analyticsEventName(markType: MarkType): string {
  return `atlassian.editor.format.${markType.name}.keyboard`;
}

export default keymapHandler;

