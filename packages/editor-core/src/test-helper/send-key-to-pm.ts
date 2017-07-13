import { EditorView, browser } from '../prosemirror';
import { keyCodes } from '../keymaps';
import { TestingEditorView } from './types/prosemirror';

/**
 * Sends a key to ProseMirror content area, simulating user key press.
 * Accepts key descriptions similar to Keymap, i.e. 'Shift-Ctrl-L'
 */
export default function sendKeyToPm(editorView: EditorView, keys: string, keyCode?: number) {
  const parts = keys.split(/-(?!'?$)/);
  const modKey = parts.indexOf('Mod') !== -1;
  const cmdKey = parts.indexOf('Cmd') !== -1;
  const ctrlKey = parts.indexOf('Ctrl') !== -1;
  const shiftKey = parts.indexOf('Shift') !== -1;
  const altKey = parts.indexOf('Alt') !== -1;
  const key = parts[parts.length - 1];

  // all of the browsers are using the same keyCode for alphabetical keys
  // and it's the uppercased character code in real world
  const code = keyCode || (keyCodes[key] ? keyCodes[key] : (key.toUpperCase()).charCodeAt(0));

  const event = new CustomEvent('keydown', {
    bubbles: true,
    cancelable: true,
  }) as any;

  event.shiftKey = shiftKey;
  event.altKey = altKey;
  event.ctrlKey = ctrlKey || (!browser.mac && modKey);
  event.metaKey = cmdKey || (browser.mac && modKey);
  event.keyCode = code;
  event.charCode = 0;
  event.which = code;
  event.view = window;

  (editorView as TestingEditorView).dispatchEvent(event);
}
