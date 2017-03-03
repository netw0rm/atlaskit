import { toggleMark } from '../../commands';
import * as keymapShortcuts from './utils-future';

import { redo, undo } from '../../prosemirror/prosemirror-history';

const keymap = {};

export function bind(shortcut, cmd) {
  keymap[shortcut] = cmd;
}

export function buildKeymap(schema) {

  // TODO keymaps related to text formatting need to move to text formatting plugin
  if (schema.marks.strong) {
    bind(keymapShortcuts.toggleBold.common, toggleMark(schema.marks.strong));
  }

  if (schema.marks.em) {
    bind(keymapShortcuts.toggleItalic.common, toggleMark(schema.marks.em));
  }

  if (schema.marks.mono) {
    bind(keymapShortcuts.toggleMonospace.common, toggleMark(schema.marks.mono));
  }

  if (schema.marks.strike) {
    bind(keymapShortcuts.toggleStrikethrough.common, toggleMark(schema.marks.strike));
  }

  if (schema.marks.underline) {
    bind(keymapShortcuts.toggleUnderline.common, toggleMark(schema.marks.underline));
  }

  bind(keymapShortcuts.redo.common, redo);
  bind(keymapShortcuts.undo.common, undo);

  return keymap;
}
