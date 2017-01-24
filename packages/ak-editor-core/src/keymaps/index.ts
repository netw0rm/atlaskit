import { browser } from '../../src/prosemirror';

export const toggleOrderedList = makeKeyMapWithCommon('Toggle ordered list', 'Mod-Shift-L');
export const toggleBulletList = makeKeyMapWithCommon('Toggle bullet list', 'Mod-Shift-B');
export const toggleBold = makeKeyMapWithCommon('Toggle bold', 'Mod-B');
export const toggleItalic = makeKeyMapWithCommon('Toggle italic', 'Mod-I');
export const toggleUnderline = makeKeyMapWithCommon('Toggle underline', 'Mod-U');
export const toggleStrikethrough = makeKeyMapWithCommon('Toggle strikethrough', 'Mod-Shift-S');
export const toggleMonospace = makeKeyMapWithCommon('Toggle monospace', 'Mod-Shift-M');


// function makeKeyMap(description: string, windows: string, mac: string, common?: string): Keymap {
//   return {
//     description: description,
//     windows: windows,
//     mac: mac,
//     common: common
//   };
// }

export function tooltip(keymap: Keymap) {
  let shortcut;
  if (browser.mac) {
    shortcut = keymap.mac
      .replace(/Cmd/i, '⌘')
      .replace(/Shift/i, '⇧')
      .replace(/Alt/i, '⌥')
      .toUpperCase();
  } else {
    shortcut = keymap.windows
      .replace(/Ctrl/i, '^')
      .replace(/Shift/i, '⇧')
      .replace(/Alt/i, '⌥')
      .toUpperCase();
  }
  return `${keymap.description} (${shortcut})`;
}

function makeKeyMapWithCommon(description: string, common: string): Keymap {
  const windows = common.replace(/Mod/i, 'Ctrl');
  const mac = common.replace(/Mod/i, 'Cmd');
  return {
    description: description,
    windows: windows,
    mac: mac,
    common: common
  };
}

interface Keymap {
  description: string;
  windows: string;
  mac: string;
  common?: string;
}
