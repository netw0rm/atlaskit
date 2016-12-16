import { ProseMirror } from 'ak-editor-prosemirror';
import createEvent from './create-event';

export const isMac = /Mac/.test(window.navigator.platform);

const dictionary : { [key:string] : number } = {
  'Enter' : 13
};

/**
 * Sends a key to ProseMirror content area, simulating user key press.
 * Accepts key descriptions similar to Keymap, i.e. "Shift-Ctrl-L"
 */
export default function sendKeyToPm(pm: ProseMirror, keys: string) {  
  let parts = keys.split(/-/);
  let modKey = parts.indexOf('Mod') !== -1;
  let cmdKey = parts.indexOf('Cmd') !== -1;
  let ctrlKey = parts.indexOf('Ctrl') !== -1;
  let shiftKey = parts.indexOf('Shift') !== -1;
  let altKey = parts.indexOf('Alt') !== -1;
  let key = parts[parts.length - 1];
  let code = dictionary[key] ? dictionary[key] : key.charCodeAt(0);

  const event = new CustomEvent('keydown', {
    bubbles: true,
    cancelable: true,
  });
  
  Object.assign(event, {
    key,
    shiftKey,
    altKey,
    ctrlKey: ctrlKey || (!isMac && modKey),
    metaKey: cmdKey || (isMac && modKey),
    keyCode: code,
    which: code,
    view: window,
  });

  // The PM content area must be selected and focused in order for key events to be recognized
  const range = document.createRange();
  const selection = window.getSelection();
  range.selectNodeContents(pm.content);
  selection.removeAllRanges();
  selection.addRange(range);
  pm.content.focus();
  pm.content.dispatchEvent(event);
}
