import { setNormalText, toggleBlockquote, toggleHeading, toggleMark, toggleCodeBlock } from '../../commands';
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

  if (schema.nodes.codeBlock) {
    bind(keymapShortcuts.findShortcutByKeymap(keymapShortcuts.toggleCodeBlock), toggleCodeBlock());
  }

  if (schema.nodes.blockquote) {
    bind(keymapShortcuts.findShortcutByKeymap(keymapShortcuts.toggleBlockQuote), toggleBlockquote());
  }

  if (schema.nodes.heading) {
    bind(keymapShortcuts.findShortcutByKeymap(keymapShortcuts.toggleHeading1), toggleHeading(1));
    bind(keymapShortcuts.findShortcutByKeymap(keymapShortcuts.toggleHeading2), toggleHeading(2));
    bind(keymapShortcuts.findShortcutByKeymap(keymapShortcuts.toggleHeading3), toggleHeading(3));
    bind(keymapShortcuts.findShortcutByKeymap(keymapShortcuts.toggleHeading4), toggleHeading(4));
    bind(keymapShortcuts.findShortcutByKeymap(keymapShortcuts.toggleHeading5), toggleHeading(5));
  }

  if (schema.nodes.paragraph) {
    bind(keymapShortcuts.findShortcutByKeymap(keymapShortcuts.setNormalText), setNormalText());
  }

  bind(keymapShortcuts.redo.common, redo);
  bind(keymapShortcuts.undo.common, undo);

  return keymap;
}
