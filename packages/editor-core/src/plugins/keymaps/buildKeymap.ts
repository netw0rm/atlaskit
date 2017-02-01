import { toggleMark, toggleCodeBlock } from '../../commands';
import * as keymapShortcuts from './utils-future';

import {redo, undo} from '../../prosemirror/future/prosemirror-history';

export function buildKeymap(schema) {
  const keymap = {};

  function bind(shortcut, cmd) {
    keymap[shortcut] = cmd;
  }

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

  if (schema.nodes.codeBlock) {
    bind(keymapShortcuts.findShortcutByKeymap(keymapShortcuts.toggleCodeBlock), toggleCodeBlock());
  }

  bind(keymapShortcuts.redo.common, redo);
  bind(keymapShortcuts.undo.common, undo);

  return keymap;
}
