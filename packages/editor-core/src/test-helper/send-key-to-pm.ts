import { EditorView, browser } from '../prosemirror';

/**
 * Sends a key to ProseMirror content area, simulating user key press.
 * Accepts key descriptions similar to Keymap, i.e. 'Shift-Ctrl-L'
 */
export default function sendKeyToPm(editorView: EditorView, keys: string) {
  const parts = keys.split(/-(?!'?$)/);
  const modKey = parts.indexOf('Mod') !== -1;
  const cmdKey = parts.indexOf('Cmd') !== -1;
  const ctrlKey = parts.indexOf('Ctrl') !== -1;
  const shiftKey = parts.indexOf('Shift') !== -1;
  const altKey = parts.indexOf('Alt') !== -1;
  const key = parts[parts.length - 1];

  // all of the browsers are using the same keyCode for alphabetical keys
  // and it's the uppercased character code in real world
  const code = dictionary[key] ? dictionary[key] : (key.toUpperCase()).charCodeAt(0);

  const event = new CustomEvent('keydown', {
    bubbles: true,
    cancelable: true,
  });

  (event as any).key = key.replace(/Space/g, ' ');
  (event as any).shiftKey = shiftKey;
  (event as any).altKey = altKey;
  (event as any).ctrlKey = ctrlKey || (!browser.mac && modKey);
  (event as any).metaKey = cmdKey || (browser.mac && modKey);
  (event as any).keyCode = code;
  (event as any).which = code;
  (event as any).view = window;

  editorView.dispatchEvent(event);
}

const dictionary: { [key: string]: number } = {
  'Enter': 13, 'Backspace': 8, 'Tab': 9, 'Shift': 16, 'Ctrl': 17, 'Alt': 18, 'Pause': 19, 'CapsLock': 20, 'Esc': 27, 'Space': 32,
  'PageUp': 63276, 'PageDown': 63277, 'End': 63275, 'Home': 63273, 'Left': 63234, 'Up': 63232, 'Right': 63235, 'Down': 63233,
  'PrintScrn': 44, 'Insert': 63302, 'Delete': 63272, ';': 186, '=': 187, 'Mod': 93, '*': 106, '-': 189, '.': 190, '/': 191, ',': 188,
  '`': 192, '[': 219, '\\': 220, ']': 221, '\'': 222
};
