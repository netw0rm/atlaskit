import { toggleMark } from '../../prosemirror/future/prosemirror-commands';
import { toggleBold, toggleItalic, toggleMonospace, toggleStrikethrough, toggleUnderline } from './';

// const {undo, redo} = require("../../prosemirror/future/prosemirror-history")

export function buildKeymap(schema) {
  const keymap = {};

  function bind(shortcut, cmd) {
    keymap[shortcut] = cmd;
  }

  if (schema.marks.strong) {
    bind(toggleBold.common, toggleMark(schema.marks.strong));
  }

  if (schema.marks.em) {
    bind(toggleItalic.common, toggleMark(schema.marks.em));
  }

  if (schema.marks.mono) {
    bind(toggleMonospace.common, toggleMark(schema.marks.mono));
  }

  if (schema.marks.strike) {
    bind(toggleStrikethrough.common, toggleMark(schema.marks.strike));
  }

  if (schema.marks.underline) {
    bind(toggleUnderline.common, toggleMark(schema.marks.underline));
  }

  return keymap;
}
