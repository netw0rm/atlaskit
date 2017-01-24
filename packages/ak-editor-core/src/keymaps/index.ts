import { browser } from '../prosemirror';

export const toggleOrderedList = makeKeyMapWithCommon('Toggle ordered list', 'Mod-Shift-L');
export const toggleBulletList = makeKeyMapWithCommon('Toggle bullet list', 'Mod-Shift-B');
export const toggleBold = makeKeyMapWithCommon('Toggle bold', 'Mod-B');
export const toggleItalic = makeKeyMapWithCommon('Toggle italic', 'Mod-I');
export const toggleUnderline = makeKeyMapWithCommon('Toggle underline', 'Mod-U');
export const toggleStrikethrough = makeKeyMapWithCommon('Toggle strikethrough', 'Mod-Shift-S');
export const toggleMonospace = makeKeyMapWithCommon('Toggle monospace', 'Mod-Shift-M');
export const setNormalText = makeKeyMap('Normal text', 'Ctrl-0', 'Cmd-Alt-0');
export const setHeading1 = makeKeyMap('Heading 1', 'Ctrl-1', 'Cmd-Alt-1');
export const setHeading2 = makeKeyMap('Heading 2', 'Ctrl-2', 'Cmd-Alt-2');
export const setHeading3 = makeKeyMap('Heading 3', 'Ctrl-3', 'Cmd-Alt-3');
export const setHeading4 = makeKeyMap('Heading 4', 'Ctrl-4', 'Cmd-Alt-4');
export const setHeading5 = makeKeyMap('Heading 5', 'Ctrl-5', 'Cmd-Alt-5');
export const setBlockQuote = makeKeyMap('Block quote', 'Ctrl-7', 'Cmd-Alt-7');
export const setCodeBlock = makeKeyMap('Code block', 'Ctrl-8', 'Cmd-Alt-8');
export const insertNewLine = makeKeyMapWithCommon('Insert new line', 'Shift-Enter');
export const splitCodeBlock = makeKeyMapWithCommon('Split code block', 'Enter');
export const splitListItem = makeKeyMapWithCommon('Split list item', 'Enter');
export const insertHorizontalRule = makeKeyMapWithCommon('Insert horizontal rule', 'Mod-Shift--');

export function tooltip(keymap: Keymap | undefined): string | undefined {
  if (keymap) {
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
}

export function findKeymapByDescription(description: string): Keymap | undefined {
  const matches = ALL.filter((keymap) => {
    return keymap.description === description;
  });

  return matches[0];
}

export function findShorcutByDescription(description: string): string | undefined {
  const keymap = findKeymapByDescription(description);
  if (keymap) {
    if (browser.mac) {
      return keymap.mac;
    }

    return keymap.windows;
  }
}

const ALL = [toggleOrderedList, toggleBulletList, toggleBold, toggleItalic,
  toggleUnderline, toggleStrikethrough, toggleMonospace,
  setNormalText, setHeading1, setHeading2, setHeading3, setHeading4, setHeading5,
  setBlockQuote, setCodeBlock, insertNewLine, insertHorizontalRule,
  splitCodeBlock, splitListItem];

function makeKeyMap(description: string, windows: string, mac: string, common?: string): Keymap {
  return {
    description: description,
    windows: windows,
    mac: mac,
    common: common
  };
}

function makeKeyMapWithCommon(description: string, common: string): Keymap {
  const windows = common.replace(/Mod/i, 'Ctrl');
  const mac = common.replace(/Mod/i, 'Cmd');
  return makeKeyMap(description, windows, mac, common);
}

export interface Keymap {
  description: string;
  windows: string;
  mac: string;
  common?: string;
}
